import React, { useState } from "react";
import { a, config, useSpring } from "@react-spring/web";
import { Link, useParams } from "react-router-dom";

import { RC as ArrowLeft } from "../../assets/icons/arrow-left.svg";

import { WavesDataProps } from "../../hooks/providers/waves";

import { WaveDialog, WaveDialogData } from "./WaveDialog";
import { SynthsGallery } from "./Gallery";
import { Synth } from "./Synth";

export interface SynthsViewerProps extends WavesDataProps {}

export const SynthsViewer: React.FC<SynthsViewerProps> = ({ synths }) => {
  const { address } = useParams();
  const [flipped, setFlipped] = useState(false);
  const [dialogData, setDialogData] = useState<WaveDialogData>({
    data: "",
    name: "",
    artist: "",
    creative: "",
  });

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

  const synth = synths.find((synth) => synth.id === address);

  const firstWave = darkThemeMq ? "#171d1d" : "#e9e3dd";
  const secondWave = darkThemeMq ? "#191c1c" : "#b2a79e";
  const thirdWave = darkThemeMq ? "#101414" : "#d6d0cb";

  const neutralWave =
    synth?.waves && synth?.waves.length > 0 ? "#e9e3dd" : undefined;

  const firstSynthWave =
    synth?.waveNfts && synth?.waveNfts[0] && synth?.waveNfts[0].data;
  const secondSynthWave =
    synth?.waveNfts && synth?.waveNfts[1] && synth?.waveNfts[1].data;
  const thirdSynthWave =
    synth?.waveNfts && synth?.waveNfts[2] && synth?.waveNfts[2].data;

  const backgroundSpring = useSpring({
    from: {
      background: `linear-gradient(
      151deg,
      ${firstWave}
        10.39%,
      ${secondWave}
        56.43%,
      ${thirdWave}
        100%
    )`,
    },
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
    delay: 2000,
    config: {
      ...config.slow,
    },
  });

  function handleItemClick(item: SynthUI | WaveUI) {
    if ("creative" in item) {
      setDialogData({
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
      className="flex flex-col gap-3 pt-16 w-full h-full"
    >
      <Link
        className="absolute dark:fill-white fill-black left-6 top-2 grid place-items-center w-12 h-12 unselectable"
        to="/synths"
      >
        <ArrowLeft />
      </Link>
      {synth ? (
        <>
          <div className="h-fit">
            <Synth
              view={"synth"}
              flipped={flipped}
              setFlipped={setFlipped}
              {...synth}
            />
          </div>
          <div className="h-auto">
            <SynthsGallery
              view={"synth"}
              items={synth.waves ?? []}
              onItemClick={handleItemClick}
            />
          </div>
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
