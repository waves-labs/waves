import React, { useState } from "react";
import { a } from "@react-spring/web";

import { SynthsDataProps } from "../../hooks/views/useSynths";

import { SynthsDialog } from "../../components/Synths/Dialog";
import { SynthsViewer } from "../../components/Synths/Viewer";
import { SynthsGallery } from "../../components/Synths/Gallery";

interface SynthsProps extends SynthsDataProps {}

const Synths: React.FC<SynthsProps> = ({
  view,
  changeView,
  synths,
  activeSynth,
  statsSpring,
  viewsSpring,
}) => {
  const [dialogData, setDialogData] = useState<{
    image: string;
    name: string;
    description?: string;
  }>({
    image: "",
    name: "",
    description: "",
  });

  function handleItemClick(item: Synth | Wave) {
    if ("eventName" in item) {
      changeView("synth", item);
    } else {
      setDialogData({
        image: "",
        name: item.name,
        description: item.description,
      });
    }
  }

  function handleBackClick() {
    changeView("synths");
  }

  return (
    <section
      className={`overflow-hidden bg-primary deck-view flex-col justify-center`}
    >
      <a.div
        className="deck-stats sm:px-6 px-3 w-full"
        style={statsSpring}
      ></a.div>
      <a.div
        style={viewsSpring}
        className="deck-views relative flex flex-col rounded-t-3xl w-full px-6 bg-base-100 shadow-xl"
      >
        {view === "synths" && (
          <SynthsGallery
            view={view}
            items={synths}
            onItemClick={handleItemClick}
          />
        )}
        {view === "synth" && activeSynth && (
          <SynthsViewer
            view={view}
            onItemClick={handleItemClick}
            onBackClick={handleBackClick}
            {...activeSynth}
          />
        )}
      </a.div>
      <SynthsDialog {...dialogData} />
    </section>
  );
};

export default Synths;
