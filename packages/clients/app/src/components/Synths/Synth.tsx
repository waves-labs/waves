import React from "react";
import { css } from "@emotion/react";
import { a, useSpring } from "@react-spring/web";

import { Sketch } from "../Sketch";
import { SynthsView } from "./Gallery";

export interface SynthProps extends SynthUI {
  view: SynthsView;
  flipped?: boolean;
  setFlipped?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}

export const Synth: React.FC<SynthProps> = ({
  view,
  flipped,
  setFlipped,
  onClick,
  id,
  artist,
  name,
  organizer,
  blockTimestamp,
  waveNfts,
}) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  function handleSynthClick() {
    view === "synth" && setFlipped && setFlipped((state) => !state);
  }

  const colors = waveNfts?.map((wave) => wave.data);
  const date = new Date(Number(blockTimestamp)).toDateString();

  return (
    <div
      className={`relative aspect-square bg-transparent`}
      onClick={onClick ?? handleSynthClick}
    >
      <a.div
        className="border-[0.75rem] sm:border-[1rem] lg:border-[1.5rem] dark:border-white border-black bg-black absolute w-full h-full grid place-items-center"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
        css={css`
          box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
        `}
      >
        <Sketch background={waveNfts && waveNfts[0].data} colors={colors} />
      </a.div>
      <a.div
        className="border-[0.75rem] sm:border-[1rem] md:border-[1.5rem] dark:border-white border-black bg-black absolute w-full h-full flex flex-col"
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
        css={css`
          box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
        `}
      >
        <h3>{name}</h3>
        <p>Created At: {date}</p>
        <p>Address: {id}</p>
        <p>Artist: {artist}</p>
        <p>Organizer: {organizer}</p>
      </a.div>
    </div>
  );
};
