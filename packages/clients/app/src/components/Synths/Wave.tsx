import React from "react";

interface WaveProps extends WaveUI {
  onItemClick?: (item: SynthUI | WaveUI) => void;
}

// TODO: Polish styles to match designs
export const Wave: React.FC<WaveProps> = ({ data }) => {
  const isImage =
    data.startsWith("data:image") ||
    data.endsWith(".png") ||
    data.endsWith(".jpg") ||
    data.endsWith(".jpeg") ||
    data.endsWith(".gif");

  // console.log(String.fromCharCode(data.));

  return (
    <label
      htmlFor="wave-dialog"
      className={`aspect-square unselectable shadow-xl cursor-pointer grid place-items-center rounded-xl border-1 dark:border-white`}
    >
      {isImage ? (
        <img src={data} alt="Wave" className="w-full object-cover" />
      ) : (
        <div className={` bg-[${data}]`}></div>
      )}
    </label>
  );
};
