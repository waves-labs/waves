import React from "react";
import {
  P5WrapperClassName,
  ReactP5Wrapper,
  Sketch as SketchData,
} from "@p5-wrapper/react";
import { css } from "@emotion/react";

import { curvesSketch, flowSketch, noiseSketch, shapesSketch } from "./scripts";

export interface SketchProps {
  background?: string;
  sketches?: SketchData[];
  colors?: string[];
}

export const Sketch: React.FC<SketchProps> = ({
  sketches = [curvesSketch, shapesSketch, noiseSketch, flowSketch],
  background,
  colors,
}) => {
  return (
    <div
      className={`w-64 carousel rounded-box ${
        background ? `bg-[${background}]` : ""
      }`}
    >
      {sketches?.map((sketch) => (
        <div className="carousel-item w-full" key={sketch.name}>
          <ReactP5Wrapper sketch={sketch} colors={colors}>
            <p
              css={css`
                .${P5WrapperClassName} & {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: white;
                  font-size: 2rem;
                  margin: 0;
                  text-align: center;
                }
              `}
            >
              {sketch.name}
            </p>
          </ReactP5Wrapper>
        </div>
      ))}
    </div>
  );
};
