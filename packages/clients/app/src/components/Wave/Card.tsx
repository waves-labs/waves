import React from "react";

interface WaveCardProps extends WaveUI {
  onItemClick?: (item: SynthUI | WaveUI) => void;
}

export const WaveCard: React.FC<WaveCardProps> = ({
  data,
  onItemClick,
  ...wave
}) => {
  // const waveContract = useWave
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
      className={`card card-compact aspect-square unselectable shadow-xl rounded-md border-2 bg-white`}
      onClick={handleWaveClick}
    >
      <figure className={`w-full h-full`}>
        {isImage ? (
          <img src={data} alt="Wave" className="w-full object-cover" />
        ) : (
          <div
            className={`w-full h-full`}
            style={{
              background: data,
            }}
          />
        )}
      </figure>
      <div className="card-body">
        {/* <div className="indicator">
          <span className="indicator-item badge badge-secondary"></span>
          <div className="grid w-32 h-32 bg-base-300 place-items-center">
            content
          </div>
        </div> */}
        <h4 className="card-title capitalize font-medium line-clamp-2">
          {wave.name}
        </h4>
        <div className="card-actions justify-end">
          {wave.owner && (
            <div className="badge badge-xs badge-info badge-outline">
              Caught
            </div>
          )}

          {wave.name === "bad bunny" ? (
            <div className="badge badge-xs badge-success badge-outline">
              Live
            </div>
          ) : null}
        </div>
      </div>
    </label>
  );
};
