import React, { useState } from "react";
import { a, config, useSpring } from "@react-spring/web";
import { Link, useParams } from "react-router-dom";

import { RC as ArrowLeft } from "../../assets/icons/arrow-left.svg";

import { WavesDataProps } from "../../hooks/providers/waves";

import { WaveDialog, WaveDialogData } from "../Wave/Dialog";
import { SynthsGallery } from "./Gallery";
import { SynthCard } from "./Card";

export interface SynthsViewerProps extends WavesDataProps {}

export const SynthsViewer: React.FC<SynthsViewerProps> = ({ synths }) => {
  const { address } = useParams();
  const [flipped, setFlipped] = useState(false);
  const [dialogData, setDialogData] = useState<WaveDialogData>({
    id: "",
    data: "",
    name: "",
    artist: "",
    creative: "",
  });

  // const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const synth = synths.find((synth) => synth.id === address);

  const firstWave = false ? "#171d1d" : "#e9e3dd";
  const secondWave = false ? "#191c1c" : "#b2a79e";
  const thirdWave = false ? "#101414" : "#d6d0cb";

  const neutralWave =
    synth?.waves && synth?.waves.length > 0 ? "#e9e3dd" : undefined;

  const firstSynthWave =
    synth?.waves && synth?.waves[0] && synth?.waves[0].data;
  const secondSynthWave =
    synth?.waves && synth?.waves[1] && synth?.waves[1].data;
  const thirdSynthWave =
    synth?.waves && synth?.waves[2] && synth?.waves[2].data;

  const backgroundSpring = useSpring({
    // from: {
    //   background: `linear-gradient(
    //   151deg,
    //   ${firstWave}
    //     10.39%,
    //   ${secondWave}
    //     56.43%,
    //   ${thirdWave}
    //     100%
    // )`,
    // },
    to: {
      background: `linear-gradient(
        151deg,
        ${firstSynthWave ?? neutralWave ?? firstWave}
          10.39%,
        ${secondSynthWave ?? neutralWave ?? secondWave}
          56.43%,
        ${thirdSynthWave ?? neutralWave ?? thirdWave}
          100%
      )`,
    },
    config: {
      ...config.slow,
    },
  });

  function handleItemClick(item: SynthUI | WaveUI) {
    if ("creative" in item) {
      setDialogData({
        id: item.id,
        data: item.data,
        name: item.name,
        artist: item.artist,
        creative: item.creative,
      });
    }
  }

  return (
    <a.div
      style={backgroundSpring}
      className="flex flex-col pt-16 w-full h-full overflow-scroll gap-6 px-6"
    >
      <Link
        className="absolute fill-stone-950 left-4 top-2 grid place-items-center w-12 h-12 unselectable"
        to="/synths"
      >
        <ArrowLeft width={40} height={40} />
      </Link>
      {synth ? (
        <>
          <div className="h-fit">
            <SynthCard
              sketch={synth.name === "Coachella 2024" ? "noise" : "curves"}
              view={"synth"}
              flipped={flipped}
              setFlipped={setFlipped}
              {...synth}
            />
          </div>
          <h4 className="text-3xl">Waves</h4>
          <SynthsGallery
            view={"synth"}
            items={synth.waves ?? []}
            onItemClick={handleItemClick}
          />
        </>
      ) : (
        <h4 className="w-full h-full grid place-items-center text-center">
          Synth Not Found
        </h4>
      )}
      <WaveDialog {...dialogData} />
    </a.div>
  );
};
