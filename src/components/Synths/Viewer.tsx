import React from "react";

import { SynthsView } from "../../hooks/views/useSynths";

import { Synth } from "./Synth";
import { SynthsGallery } from "./Gallery";

export interface SynthsViewerProps extends Synth {
  view: SynthsView;
  paddingTop?: boolean;
  onItemClick: (item: Synth | Wave) => void;
  onBackClick?: () => void;
}

// TODO: Polish styles to match designs

export const SynthsViewer: React.FC<SynthsViewerProps> = ({
  view,
  paddingTop,
  onBackClick,
  onItemClick,
  ...synth
}) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black"
        onClick={onBackClick}
      >
        Back Button
      </div>
      <Synth view={view} flipped={flipped} setFlipped={setFlipped} {...synth} />
      <SynthsGallery
        view={view}
        items={synth.waves}
        onItemClick={onItemClick}
      />
    </div>
  );
};
