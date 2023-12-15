import React from "react";
import { css } from "@emotion/react";
import { a, useSpring } from "@react-spring/web";

import { Button } from "../Button";
import { Sketch } from "../Sketch";
import { SynthsView } from "./Gallery";
import { TextAddress } from "../Text/Address";

export interface SynthCardProps extends SynthUI {
  sketch: "curves" | "noise";
  view: SynthsView;
  flipped?: boolean;
  setFlipped?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}

export const SynthCard: React.FC<SynthCardProps> = ({
  view,
  flipped,
  setFlipped,
  onClick,
  id,
  // artist,
  name,
  organizer,
  // blockTimestamp,
  waveNFTs,
  sketch,
  image,
}) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  function handleSynthClick() {
    setFlipped && setFlipped((state) => !state);
  }

  const colors = waveNFTs?.map((wave) => wave.waveNft.data);
  // const date = new Date(Number(blockTimestamp) * 1000).toDateString();

  if (view === "synths") {
    return (
      <div
        className="card card-compact w-full shadow-xl border-2 bg-white"
        onClick={onClick}
      >
        <figure className={`w-full aspect-square`}>
          <img src={image} alt={`${name} Synth`} />
        </figure>
        <div className="card-body">
          <h4 className="card-title line-clamp-2">{name}</h4>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-square bg-transparent`}
      onClick={handleSynthClick}
    >
      <a.div
        className="border-8 bg-stone-700 absolute w-full h-full rounded-sm"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
        css={css`
          box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
        `}
      >
        <Sketch sketch={sketch} colors={colors} />
      </a.div>
      <a.div
        className="border-8 border-stone-200 bg-stone-200 absolute w-full h-full rounded-sm flex flex-col py-4 p-3 justify-between"
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
        css={css`
          box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
        `}
      >
        <div className="text-xl flex flex-col gap-3 ml-2">
          <h4 className="text-4xl capitalize -ml-2 mb-2 font-light">{name}</h4>
          <p className="font-medium">
            Synth Address <TextAddress address={id} />
          </p>
          <p className="font-medium">
            Gen Artist <TextAddress address={id} />
          </p>
          <p className="font-medium">
            Creator <TextAddress address={organizer} />
          </p>
          {/* <p className="line-clamp-2">
            Created: <span className="max-w-prose">{date}</span>
          </p> */}
        </div>
        <div className="card-actions justify-self-end justify-end">
          <Button
            title="House"
            // className="btn bg-stone-950 text-white"
            onClick={(e) => {
              e.stopPropagation();
              // setFlipped && setFlipped((state) => !state);
            }}
          />
        </div>
      </a.div>
    </div>
  );
};
