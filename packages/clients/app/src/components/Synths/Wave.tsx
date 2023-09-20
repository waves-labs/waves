import React from "react";

interface WaveProps extends WaveUI {
  onItemClick?: (item: SynthUI | WaveUI) => void;
}

// TODO: Update styling for wave
// TODO: Add metadata for dialog usage
// TODO: Set Ddefault Gradient and name for wave

export const Wave: React.FC<WaveProps> = ({ data, onItemClick, ...wave }) => {
  const isImage =
    data.startsWith("data:image") ||
    data.endsWith(".png") ||
    data.endsWith(".jpg") ||
    data.endsWith(".jpeg") ||
    data.endsWith(".gif");

  function handleWaveClick() {
    onItemClick && onItemClick({ ...wave, data });
  }

  return (
    <label
      htmlFor="wave-dialog"
      className={`aspect-square unselectable shadow-xl cursor-pointer grid place-items-center rounded-xl border-1 dark:border-white`}
      onClick={handleWaveClick}
    >
      {isImage ? (
        <img src={data} alt="Wave" className="w-full object-cover" />
      ) : (
        <div className={` bg-[${data}]`}></div>
      )}
    </label>
  );
};
