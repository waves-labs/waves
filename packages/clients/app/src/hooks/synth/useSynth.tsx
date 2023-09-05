import { assign } from "xstate";
import { useAccount } from "wagmi";
import { useMachine } from "@xstate/react";
import { createContext, useContext } from "react";

import { SynthContext as SynthMachineContext, synthMachine } from "./machine";

export interface SynthDataProps extends SynthMachineContext {
  isIdle: boolean;
  isMinting: boolean;
  isGeneratingArt: boolean;
  address?: `0x${string}`;
  mintSynth: (address: string) => void;
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

  const [state, send] = useMachine(synthMachine, {
    actions: {
      minted: assign((context, _event) => {
        // TODO: Add the minted synth to the user's collection

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
        _event: { generatorAddrs?: string },
        _meta,
      ) => {
        try {
          return {
            id: "",
            owner: "",
            account: "",
            contract: "",
            tokenId: 0,
            waves: [],
          };
        } catch (error) {
          console.log("Synth minting failed!", error);
          throw error;
        }
      },
      genArtService: async (_context, _event: { element?: any }) => {
        try {
          return {
            tokenAddress: "",
            tokenId: 0,
          };
        } catch (error) {
          console.log("Art generation failed!", error);
          throw error;
        }
      },
    },
  });

  function mintSynth(address: string) {
    send({ type: "MINT", address });
  }

  function generateArt(synthAddrs: string, artAddrs: string) {
    send({ type: "GENERATE_ART", synthAddrs, artAddrs });
  }

  return (
    <SynthContext.Provider
      value={{
        isIdle: state.matches("idle"),
        isMinting: state.matches("minting"),
        isGeneratingArt: state.matches("generatingArt"),
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
