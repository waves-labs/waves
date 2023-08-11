import { Wave } from "./Wave";
import { Synth } from "./Synth";

import { SynthsView } from "../../hooks/views/useSynths";

// TODO: Polish styles to match designs
// TODO: Update Grid to be a 2 columns on mobile

interface SynthsGalleryProps {
  view: SynthsView;
  items: (Synth | Wave)[];
  onItemClick: (item: Synth | Wave) => void;
  onBackClick?: () => void;
}

export const SynthsGallery: React.FC<SynthsGalleryProps> = ({
  view,
  items,
  onItemClick,
}) => {
  return (
    <ul
      className={"flex flex-col overflow-scroll h-full gap-3 pb-20"}
      // className={`grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-scroll h-full`}
    >
      {items.length ? (
        items.map((item, index) => {
          if (!item) return null;
          if ("event" in item) {
            return <Synth key={index} {...item} view={view} />;
          } else {
            return <Wave key={index} {...item} onItemClick={onItemClick} />;
          }
        })
      ) : (
        <div className="text-white grid place-items-center">
          {view === "synths" ? (
            <p>No synths found go mint some!</p>
          ) : (
            <p>No waves found go catch some!</p>
          )}
        </div>
      )}
    </ul>
  );
};
