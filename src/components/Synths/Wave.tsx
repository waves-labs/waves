import React from "react";

interface WaveProps extends Wave {
  onItemClick?: (item: Synth | Wave) => void;
}

// TODO: Polish styles to match designs
export const Wave: React.FC<WaveProps> = ({}) => {
  return (
    <div className="flex items-center py-2 rounded-xl w-full h-full"></div>
  );
};
