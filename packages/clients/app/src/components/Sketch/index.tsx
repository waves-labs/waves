import React from "react";
import { ReactP5Wrapper, Sketch as SketchData } from "@p5-wrapper/react";

import { flowSketch, noiseSketch, shapesSketch } from "./scripts";

// TODO: Debug why carousel not working

export interface SketchProps {
  background?: string;
  sketches?: SketchData[];
  colors?: string[];
}

export const Sketch: React.FC<SketchProps> = ({
  sketches = [noiseSketch, flowSketch],
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
      {sketches?.map((sketch) => (
        <div className="carousel-item w-full" key={sketch.name}>
          <ReactP5Wrapper sketch={sketch} colors={colors} />
        </div>
      ))}
    </div>
  );
};
