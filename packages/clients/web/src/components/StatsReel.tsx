// import { css } from "@emotion/react";
import React, { useState } from "react";
import { a, config, useTransition } from "@react-spring/web";

export interface StatsReelProps {
  experiences: Experience[];
}

// const TextReveal: React.FC<{ text: string }> = ({ text }) => {
//   return <h1 css={css``}>{text}</h1>;
{
  /* <div class="text-effect">
    <!-- Select the text in the preview and type in your own -->
    <h1 class="neon" data-text="Neon" contenteditable>Neon</h1>
    <div class="gradient"></div>
    <div class="spotlight"></div>
  </div> */
}
// };

export const StatsReel: React.FC<StatsReelProps> = ({ experiences }) => {
  const [index, setIndex] = useState(0);

  const transitions = useTransition(experiences[index], {
    key: experiences[index]?.id,
    from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    config: { ...config.gentle },
    trail: 270,
    exitBeforeEnter: false,
    onRest: () =>
      setIndex((prevIndex) =>
        prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
      ),
  });

  return (
    <div className="relative w-full h-full">
      {transitions((style, song) => (
        <a.div
          style={style}
          className="absolute flex flex-col gap-1 tracking-tight"
        >
          <h3>"sound": "{song?.name}"</h3>
          <h3 className="pl-4">"artist": "{song?.artist?.name}"</h3>
          <h3 className="pl-4">"genre": "{song?.genre?.name}"</h3>
        </a.div>
      ))}
    </div>
  );
};
