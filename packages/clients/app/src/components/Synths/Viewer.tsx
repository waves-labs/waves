import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Synth } from "./Synth";
import { SynthsGallery } from "./Gallery";
import { WaveDialog } from "./WaveDialog";
import { useSynth } from "../../hooks/synth/useSynth";

import { RC as ArrowLeft } from "../../assets/icons/arrow-left.svg";

export interface SynthsViewerProps {}

// TODO: Polish styles to match designs

export const SynthsViewer: React.FC<SynthsViewerProps> = ({}) => {
  const { address } = useParams();
  const [flipped, setFlipped] = useState(false);
  const [dialogData, setDialogData] = useState<{
    image: string;
    name: string;
    description?: string;
  }>({
    image: "",
    name: "",
    description: "",
  });

  const { synths } = useSynth();

  const synth = synths.find((synth) => synth.address === address);

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

  function handleItemClick(item: Synth | Wave) {
    if ("wavesAddress" in item) {
      setDialogData({
        image: item.data,
        name: item.artist,
        description: item.description,
      });
    }
  }

  return (
    <div className="flex flex-col gap-3 pt-16 w-full h-full">
      <Link
        className="absolute left-6 top-2 grid place-items-center w-12 h-12 unselectable"
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
          <SynthsGallery
            view={"synth"}
            items={synth.waves}
            onItemClick={handleItemClick}
          />
        </>
      ) : (
        <h4>Synth Not Found</h4>
      )}
      <WaveDialog {...dialogData} />
    </div>
  );
};
