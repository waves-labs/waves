import { useState } from "react";
import { config, SpringValue, useSpring } from "@react-spring/web";

import { useSynth } from "../synth/useSynth";

export interface SynthsDataProps {
  activeSynth: Synth | null;
  synths: Synth[];
  statsSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  viewsSpring: {
    transform: SpringValue<string>;
  };
  view: SynthsView;
  changeView: (view: SynthsView, synth?: Synth) => void;
}

export type SynthsView = "synths" | "synth";

export const useSynths = (): SynthsDataProps => {
  const [view, setTab] = useState<SynthsView>("synths");
  const [activeSynth, setActiveSynth] = useState<Synth | null>(null);

  const { synths } = useSynth();

  const statsSpring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    config: {
      tension: 270,
      friction: 12,
      clamp: true,
    },
  });

  const viewsSpring = useSpring({
    from: { transform: "translate3d(0, 100%, 0)" },
    to: { transform: "translate3d(0, 0%, 0)" },
    config: {
      ...config.slow,
    },
  });

  function changeView(view: SynthsView, synth?: Synth) {
    if (synth) {
      setActiveSynth(synth);
    }

    setTab(view);
  }

  return {
    activeSynth,
    synths,
    statsSpring,
    viewsSpring,
    view,
    changeView,
  };
};
