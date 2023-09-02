import { useSynth } from "../synth/useSynth";

export interface SynthsDataProps {
  address?: string;
  synths: Synth[];
}

export type SynthsView = "synths" | "synth";

export const useSynths = (): SynthsDataProps => {
  const { address, synths } = useSynth();

  return {
    address,
    synths,
  };
};
