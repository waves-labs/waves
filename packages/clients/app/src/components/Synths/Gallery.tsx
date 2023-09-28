import { useNavigate } from "react-router-dom";

import { Synth } from "./Synth";
import { Wave } from "../Wave/Wave";

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

  function handleSynthClick(synth: SynthUI) {
    view === "synths" && navigate(`/synths/${synth.id}`);
  }

  if (!items.length) {
    return view === "synths" ? (
      <h4 className="h-full w-full grid place-items-center text-center">
        No Synths Found, Mint One!
      </h4>
    ) : (
      <h4 className="h-full w-full">No Waves Found Go Catch Some!</h4>
    );
  }

  return (
    <ul
      className={`${
        view === "synth" ? "" : "pt-4 overflow-scroll"
      } grid grid-cols-2 auto-rows-auto h-full w-full gap-3 pb-20`}
    >
      {items.map((item, index) => {
        if (!item) return null;
        if ("organizer" in item) {
          return (
            <li key={index}>
              <Synth
                {...item}
                sketch={index === 0 ? "curves" : "noise"}
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
