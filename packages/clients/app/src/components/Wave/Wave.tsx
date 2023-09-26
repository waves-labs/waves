import React from "react";

interface WaveProps extends WaveUI {
  onItemClick?: (item: SynthUI | WaveUI) => void;
}

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
      className={`aspect-square unselectable shadow-lg cursor-pointer grid place-items-center rounded-md border-8 dark:border-white border-stone-400`}
      onClick={handleWaveClick}
    >
      {isImage ? (
        <img src={data} alt="Wave" className="w-full object-cover" />
      ) : (
        <div
          className={`w-full h-full grid place-items-center`}
          style={{
            background: data,
          }}
        >
          <h4 className="capitalize font-medium dark:text-stone-400 text-3xl text-center px-2">
            {wave.name}
          </h4>
        </div>
      )}
    </label>
  );
};
