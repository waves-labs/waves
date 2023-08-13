import { assign } from "xstate";
import { useMachine } from "@xstate/react";
import { useAccount } from "wagmi";
import { createContext, useContext, useEffect, useState } from "react";

import { SynthContext as SynthMachineContext, synthMachine } from "./machine";
import { mockSynths } from "../../mockData";
import { useSynthGeneratorGenerateSynth } from "../../generated";

export interface SynthDataProps extends SynthMachineContext {
  isIdle: boolean;
  isMinting: boolean;
  isGeneratingArt: boolean;
  address?: `0x${string}`;
  synths: Synth[];
  mintSynth: (eventName: EventName) => void;
  generateArt: (synthAddrs: string) => void;
}

const SynthContext = createContext<SynthDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SynthProvider = ({ children }: Props) => {
  const currentValue = useContext(SynthContext);

  if (currentValue) throw new Error("SynthProvider can only be used once");

  const { address } = useAccount();
  const {} = useSynthGeneratorGenerateSynth({});

  const [synths, setSynths] = useState<Synth[]>(mockSynths);

  function getSynths() {}

  const [state, send] = useMachine(synthMachine, {
    actions: {
      minted: assign((context, event) => {
        // TODO: Add the minted synth to the user's collection

        return context;
      }),
      generatedArt: assign((context, event) => {
        // TODO: Update synth state to generated

        return context;
      }),
    },
    services: {
      mintService: async (
        context,
        event: { generatorAddrs?: string },
        _meta,
      ) => {
        try {
          return {
            tokenAddress: "",
            tokenId: 0,
            address: "",
            waves: [],
            eventName: "",
            image: "",
          };
        } catch (error) {
          console.log("Synth minting failed!", error);
          throw error;
        }
      },
      genArtService: async (context, event: { element?: any }) => {
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

  function mintSynth(eventName: EventName) {
    send({ type: "MINT", eventName });
  }

  function generateArt(synthAddrs: string) {
    send({ type: "GENERATE_ART", synthAddrs });
  }

  useEffect(() => {
    // If connected query blockchain for synths
  }, []);

  return (
    <SynthContext.Provider
      value={{
        isIdle: state.matches("idle"),
        isMinting: state.matches("minting"),
        isGeneratingArt: state.matches("generatingArt"),
        mintSynth,
        generateArt,
        address,
        synths,
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
