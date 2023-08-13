import { Wave } from "./Wave";
import { Synth } from "./Synth";

import { SynthsView } from "../../hooks/views/useSynths";
import { useNavigate } from "react-router-dom";

// TODO: Polish styles to match designs
// TODO: Update Grid to be a 2 columns on mobile

interface SynthsGalleryProps {
  view: SynthsView;
  items: (Synth | Wave)[];
  onItemClick: (item: Synth | Wave) => void;
}

export const SynthsGallery: React.FC<SynthsGalleryProps> = ({
  view,
  items,
  onItemClick,
}) => {
  const navigate = useNavigate();

  function handleSynthClick(synth: Synth) {
    view === "synths" && navigate(`/synths/${synth.address}`);
  }

  return (
    <ul
      className={"flex flex-col overflow-scroll h-full w-full gap-3 pb-20"}
      // className={`grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-scroll h-full`}
    >
      {items.length ? (
        items.map((item, index) => {
          if (!item) return null;
          if ("eventName" in item) {
            return (
              <Synth
                key={index}
                {...item}
                view={view}
                onClick={() => handleSynthClick(item)}
              />
            );
          } else {
            return <Wave key={index} {...item} onItemClick={onItemClick} />;
          }
        })
      ) : (
        <div className="h-full grid place-items-center">
          {view === "synths" ? (
            <div>
              <p>No synths found, mint one!</p>
            </div>
          ) : (
            <p>No waves found go catch some!</p>
          )}
        </div>
      )}
    </ul>
  );
};
