import React from "react";
import { css } from "@emotion/react";
import { a, useSpring } from "@react-spring/web";

import { Sketch } from "../Sketch";
import { SynthsView } from "./Gallery";

// TODO: Add metadata to back of card
// TODO: Redo styling for back of card

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
  waveNFTs,
}) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  function handleSynthClick() {
    view === "synth" && setFlipped && setFlipped((state) => !state);
  }

  const colors = waveNFTs?.map((wave) => wave.waveNft.data);
  const date = new Date(Number(blockTimestamp) * 1000).toDateString();

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
        {view === "synth" ? (
          <>
            <Sketch
              // background={waveNfts && waveNfts[0].data}
              colors={colors}
            />
          </>
        ) : (
          <>
            <h4 className="text-2xl font-semibold text-white text-center absolute mix-blend-screen">
              {name}
            </h4>
            <img src="/assets/mocks/synth.png" className="overflow-hidden" />
          </>
        )}
      </a.div>
      <a.div
        className="border-[0.75rem] sm:border-[1rem] md:border-[1.5rem] dark:border-white border-black bg-black absolute w-full h-full flex flex-col text-white p-3"
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
        css={css`
          box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
        `}
      >
        <h4 className="text-2xl">{name}</h4>
        <div className="ml-2">
          <p className="line-clamp-2">
            Created: <span className="max-w-prose">{date}</span>
          </p>
          <p className="line-clamp-2">Address: {id}</p>
          <p className="line-clamp-2">Artist: {artist}</p>
          <p className="line-clamp-2">Organizer: {organizer}</p>
        </div>
      </a.div>
    </div>
  );
};
