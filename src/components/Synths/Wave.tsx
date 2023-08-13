import React from "react";

interface WaveProps extends Wave {
  onItemClick?: (item: Synth | Wave) => void;
}

// TODO: Polish styles to match designs
export const Wave: React.FC<WaveProps> = ({ data }) => {
  return (
    <label
      htmlFor="synths-dialog"
      className={`w-full max-w-full unselectable shadow-xl cursor-pointer flex justify-between items-center rounded-xl`}
    >
      {data.includes("https://") ? (
        <img
          src={data}
          alt="Wave"
          className="w-full aspect-square object-cover rounded-xl"
        />
      ) : (
        <div></div>
      )}
    </label>
  );
};
