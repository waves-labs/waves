import React from "react";

import { ExploreDataProps } from "../../hooks/views/useExplore";

interface ExploreProps extends ExploreDataProps {}

// TODO: Add Explore Canvas from Petra
const Explore: React.FC<ExploreProps> = (
  {
    // isIdle,
    // isScanning,
    // error,
    // scan,
  },
) => {
  return (
    <section className="explore-view flex-col px-6 sm:px-12 pt-6 overflow-scroll"></section>
  );
};

export default Explore;
