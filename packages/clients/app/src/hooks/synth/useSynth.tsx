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

export interface SynthDataProps extends SynthMachineContext {
  isIdle: boolean;
  isMinting: boolean;
  isGeneratingArt: boolean;
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

  console.log("Synth mint data", synthMintData, synthMintError);

  const { writeAsync: synthAccountGenerateArt } =
    useSynthAccountPurchasePrint(synthAccountAddrs);

  const [state, send] = useMachine(synthMachine, {
    actions: {
      minted: assign((context, _event) => {
        // TODO: Add the minted synth to the user's collection
        // TODO: Set Mint Dialog to closed

        return context;
      }),
      generatedArt: assign((context, _event) => {
        // TODO: Update synth state to generated

        return context;
      }),
    },
    services: {
      mintService: async (
        _context,
        event: { address: string; ticket?: string },
        _meta,
      ) => {
        try {
          console.log("Synth start mint!", synthAddrs);

          const req = await synthMint({
            args: ["0x6Bd018B28CE7016b65384e15faC102dbC4190E03"],
          });

          console.log("Synth minted!", req);

          fetchSynths();

          return {
            hash: req.hash,
          };
        } catch (error) {
          console.log("Synth minting failed!", error);
          throw error;
        }
      },
      genArtService: async (
        _context,
        event: { synthAccount: string; artAddrs: string },
      ) => {
        try {
          const req = await synthAccountGenerateArt({
            args: [event.artAddrs],
          });

          console.log("Art generated!", req);

          return {
            tokenAddress: event.artAddrs,
            tokenId: 0,
          };
        } catch (error) {
          console.log("Art generation failed!", error);
          throw error;
        }
      },
    },
  });

  function mintSynth(address: string, ticket?: string) {
    send({ type: "MINT", address, ticket });
  }

  function generateArt(synthAddrs: string, artAddrs: string) {
    setSynthAccountAddrs(synthAddrs);
    send({ type: "GENERATE_ART", synthAddrs, artAddrs });
  }

  return (
    <SynthContext.Provider
      value={{
        isIdle: state.matches("idle"),
        isMinting: state.matches("minting"),
        isGeneratingArt: state.matches("generatingArt"),
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
