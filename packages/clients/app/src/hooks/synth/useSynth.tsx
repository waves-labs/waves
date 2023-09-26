import { assign } from "xstate";
import { useAccount } from "wagmi";
import { useMachine } from "@xstate/react";
import { createContext, useContext, useState } from "react";

import {
  useSynthAccountPurchasePrint,
  useSynthMint,
  // synthABI,
} from "../../generated";

import { useWaves } from "../providers/waves";

import { SynthContext as SynthMachineContext, synthMachine } from "./machine";

// TODO: Add the minted synth to the user's collection
// TODO: Set Mint Dialog to closed

export interface SynthDataProps extends SynthMachineContext {
  isIdle: boolean;
  isMinting: boolean;
  isMinted: boolean;
  isGeneratingArt: boolean;
  isGeneratedArt: boolean;
  address?: `0x${string}`;
  synthAddrs: string;
  setSynthAddrs: React.Dispatch<React.SetStateAction<string>>;
  mintSynth: (address: string, ticket?: string) => void;
  generateArt: (synthAddrs: string, artAddrs: string) => void;
}

const SynthContext = createContext<SynthDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SynthProvider = ({ children }: Props) => {
  const currentValue = useContext(SynthContext);

  if (currentValue) throw new Error("SynthProvider can only be used once");

  const { address } = useAccount();
  const { fetchSynths, synthNfts } = useWaves();

  const [synthAddrs, setSynthAddrs] = useState(
    synthNfts ? synthNfts[0]?.id : "",
  );
  const [synthAccountAddrs, setSynthAccountAddrs] = useState("");

  const {
    data: synthMintData,
    writeAsync: synthMint,
    error: synthMintError,
  } = useSynthMint({ address: synthAddrs });

  const { writeAsync: synthAccountGenerateArt } =
    useSynthAccountPurchasePrint(synthAccountAddrs);

  const [state, send] = useMachine(synthMachine, {
    actions: {
      minted: (_context, _event) => {
        const dialog =
          document.querySelector<HTMLDialogElement>("synths-mint-dialog");

        dialog?.close();
      },
      generatedArt: assign((context, _event) => {
        return context;
      }),
    },
    services: {
      mintService: async (
        context,
        event: { synth: string; ticket?: string },
        _meta,
      ) => {
        try {
          context.error = null;

          console.log("Synth start mint!", synthAddrs);

          const ticket =
            event.ticket || "0x6Bd018B28CE7016b65384e15faC102dbC4190E03";

          const req = await synthMint({
            args: [ticket],
          });

          console.log("Synth minted!", synthMintData);

          fetchSynths();

          return {
            hash: req.hash,
          };
        } catch (error) {
          console.log("Synth minting failed!", synthMintError, error);
          throw error;
        }
      },
      genArtService: async (
        _context,
        event: { synthAccount: string; art: string },
      ) => {
        try {
          const req = await synthAccountGenerateArt({
            args: [event.art],
          });

          console.log("Art generated!", req);

          return {
            tokenAddress: event.art,
            tokenId: 0,
          };
        } catch (error) {
          console.log("Art generation failed!", error);
          throw error;
        }
      },
    },
  });

  function mintSynth(synth: string, ticket?: string) {
    send({ type: "MINT", synth, ticket });
  }

  function generateArt(synthAccount: string, art: string) {
    setSynthAccountAddrs(synthAccount);
    send({ type: "GENERATE_ART", synthAccount, art });
  }

  return (
    <SynthContext.Provider
      value={{
        isIdle: state.matches("idle"),
        isMinting: state.matches("minting"),
        isMinted: state.matches("minted"),
        isGeneratingArt: state.matches("generatingArt"),
        isGeneratedArt: state.matches("generatedArt"),
        synthAddrs,
        setSynthAddrs,
        mintSynth,
        generateArt,
        address,
        ...state.context,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
};

export const useSynth = () => {
  const value = useContext(SynthContext);
  if (!value) throw new Error("Must be used within a SynthProvider");
  return value;
};
