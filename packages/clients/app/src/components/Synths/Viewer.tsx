import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { RC as ArrowLeft } from "../../assets/icons/arrow-left.svg";

import { WavesDataProps } from "../../hooks/providers/waves";

import { WaveDialog, WaveDialogData } from "./WaveDialog";
// import { SynthsGallery } from "./Gallery";
import { Synth } from "./Synth";

export interface SynthsViewerProps extends WavesDataProps {}

// TODO: Polish styles to match designs

export const SynthsViewer: React.FC<SynthsViewerProps> = ({ synths }) => {
  const { address } = useParams();
  const [flipped, setFlipped] = useState(false);
  const [dialogData, setDialogData] = useState<WaveDialogData>({
    data: "",
    name: "",
    artist: "",
    creative: "",
  });

  // const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

  const synth = synths.find((synth) => synth.id === address);

  // const backgroundSpring = useSpring({
  //   from: {
  //     background: `linear-gradient(
  //     151deg,
  //     ${"#e9e3dd"}
  //       10.39%,
  //     ${"#b2a79e"}
  //       56.43%,
  //     ${"#d6d0cb"}
  //       100%
  //   )`,
  //   },
  //   to: {
  //     background: `linear-gradient(
  //       151deg,
  //       ${musicColorWavesMap[threeRandomWaves[0].id]}
  //         10.39%,
  //       ${musicColorWavesMap[threeRandomWaves[1].id]}
  //         56.43%,
  //       ${musicColorWavesMap[threeRandomWaves[2].id]}
  //         100%
  //     )`,
  //   },
  //   delay: 2000,
  //   config: {
  //     ...config.slow,
  //   },
  // });

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
    <div className="flex flex-col gap-3 pt-16 w-full h-full">
      <Link
        className="absolute dark:fill-white fill-black left-6 top-2 grid place-items-center w-12 h-12 unselectable"
        to="/synths"
      >
        <ArrowLeft />
      </Link>
      {synth ? (
        <>
          <Synth
            view={"synth"}
            flipped={flipped}
            setFlipped={setFlipped}
            {...synth}
          />
          {/* <SynthsGallery
            view={"synth"}
            items={synth.waves}
            onItemClick={handleItemClick}
          /> */}
        </>
      ) : (
        <h4 className="w-full h-full grid place-items-center text-center">
          Synth Not Found
        </h4>
      )}
      <WaveDialog {...dialogData} />
    </div>
  );
};
