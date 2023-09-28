import React from "react";
import { ReactP5Wrapper, Sketch as SketchData } from "@p5-wrapper/react";

import { curvesSketch, noiseSketch } from "./scripts";

export type { SketchData };

export type SketchType = "curves" | "noise";

export interface SketchProps {
  background?: string;
  sketch: SketchType;
  colors?: string[];
}

const sketches: Record<SketchType, SketchData> = {
  curves: curvesSketch,
  noise: noiseSketch,
};

export const Sketch: React.FC<SketchProps> = ({
  sketch,
  background,
  colors,
}) => {
  return (
    <div
      className={`w-full h-full carousel`}
      style={{
        background,
      }}
    >
      <div className="carousel-item w-full" key={sketch}>
        <ReactP5Wrapper sketch={sketches[sketch]} colors={colors} />
      </div>
    </div>
  );
};
