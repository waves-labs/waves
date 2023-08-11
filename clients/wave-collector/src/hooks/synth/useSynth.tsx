import { assign } from "xstate";
import { useMachine } from "@xstate/react";
import { createContext, useContext, useEffect, useState } from "react";

import { SynthContext as SynthMachineContext, synthMachine } from "./machine";

export interface SynthDataProps extends SynthMachineContext {
  isIdle: boolean;
  isMinting: boolean;
  isGenerating: boolean;
  synths: Synth[];
  mintSynth: (address: string) => void;
  generateArt: (synthAddrs: string) => void;
}

const SynthContext = createContext<SynthDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

const SYNTH_REGISTRY = import.meta.env.VITE_VERCEL_SYNTH_REGISTRY as string;

export const SynthProvider = ({ children }: Props) => {
  const currentValue = useContext(SynthContext);

  if (currentValue) throw new Error("SynthProvider can only be used once");

  const [synths, setSynths] = useState<Synth[]>([]);

  function getSynths() {}

  const [state, send] = useMachine(synthMachine, {
    actions: {
      minted: assign((context, event) => {
        // TODO: Add the minted synth to the user's collection

        return context;
      }),
      generated: assign((context, event) => {
        // TODO: Update synth state to generated

        return context;
      }),
    },
  });

  function mintSynth(generatorAddrs: string) {
    send({ type: "MINT", generatorAddrs });
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
        isGenerating: state.matches("generating"),
        mintSynth,
        generateArt,
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
