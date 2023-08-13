import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Synth } from "./Synth";
import { SynthsGallery } from "./Gallery";
import { WaveDialog } from "./WaveDialog";
import { useSynth } from "../../hooks/synth/useSynth";

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
    <div className="relative">
      <Link className="" to="/synths">
        Back to Synths
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
        <h1>Not Found</h1>
      )}
      <WaveDialog {...dialogData} />
    </div>
  );
};
