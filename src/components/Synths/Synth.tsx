import { css } from "@emotion/react";
import React from "react";
import { a, useSpring } from "@react-spring/web";

import { SynthsView } from "../../hooks/views/useSynths";

export interface SynthProps extends Synth {
  view: SynthsView;
  flipped?: boolean;
  setFlipped?: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: Polish styles to match designs
// TODO: Add details to back of synth such as event, date, gen artist, etc

export const Synth: React.FC<SynthProps> = ({
  view,
  flipped,
  setFlipped,
  // ...synth
}) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  function handleSynthClick() {
    view === "synth" && setFlipped && setFlipped((state) => !state);
  }

  return (
    <div
      className={`relative aspect-square w-full bg-transparent`}
      onClick={handleSynthClick}
    >
      <a.div
        className="border-[0.75rem] sm:border-[1rem] lg:border-[1.5rem] border-black bg-black absolute w-full h-full grid place-items-center"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
        css={css`
          box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
        `}
      ></a.div>
      <a.div
        className="border-[0.75rem] sm:border-[1rem] md:border-[1.5rem] border-black bg-black absolute w-full h-full"
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
        css={css`
          box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
        `}
      >
        <div className="synth-details flex items-center w-full mt-3 border-stone-800 border-2 rounded-sm divide-x divide-stone-800">
          <div className="basis-1/4 px-4 py-2 sm:py-4 sm:px-8 flex flex-col gap-1 h-full">
            <h4 className="font-light text-xs text-stone-400 tracking-wide uppercase">
              Experiences
            </h4>
            <p className="font-medium text-white text-xs xs:text-base"></p>
          </div>
          <div className="basis-3/4 px-4 py-2 sm:py-4 sm:px-8 flex flex-col gap-1 h-full">
            <h4 className="font-light text-xs text-stone-400 tracking-wide uppercase">
              Favorite Artists
            </h4>
            <ul className="flex line-clamp-1 gap-1 flex-nowrap"></ul>
          </div>
        </div>
      </a.div>
    </div>
  );
};
