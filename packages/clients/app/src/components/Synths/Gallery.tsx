import { useNavigate } from "react-router-dom";

import { Synth } from "./Synth";
import { Wave } from "./Wave";

export type SynthsView = "synths" | "synth";

interface SynthsGalleryProps {
  view: SynthsView;
  items: (SynthUI | WaveUI)[];
  onItemClick: (item: SynthUI | WaveUI) => void;
}

export const SynthsGallery: React.FC<SynthsGalleryProps> = ({
  view,
  items,
  onItemClick,
}) => {
  const navigate = useNavigate();

  function handleSynthClick(synth: Synth) {
    view === "synths" && navigate(`/synths/${synth.id}`);
  }

  if (!items.length) {
    return (
      <div className="h-full w-full grid place-items-center">
        {view === "synths" ? (
          <h4>No Synths Found, Mint One!</h4>
        ) : (
          <h4>No Waves Found Go Catch Some!</h4>
        )}
      </div>
    );
  }

  return (
    <ul
      className={
        "grid grid-cols-2 auto-rows-auto	 overflow-scroll h-full w-full gap-3 pt-16 pb-20"
      }
    >
      {items.map((item, index) => {
        if (!item) return null;
        if ("organizer" in item) {
          return (
            <li key={index}>
              <Synth
                {...item}
                view={view}
                onClick={() => handleSynthClick(item)}
              />
            </li>
          );
        } else {
          return <Wave key={index} {...item} onItemClick={onItemClick} />;
        }
      })}
    </ul>
  );
};
