import React from "react";
import { a, useSpring } from "@react-spring/web";

// import { musicColorWavesMap, musicColorWaves } from "../../constants";

// TODO: Update copy and add social links

export const OnlyMobile: React.FC = () => {
  // const threeRandomWaves = musicColorWaves
  //   .sort(() => 0.5 - Math.random())
  //   .slice(0, 3);

  // const backgroundSpring = useSpring({
  //   from: {
  //     background: `linear-gradient(
  //     151deg,
  //     ${"#e9e3dd"}
  //       10.39%,
  //     ${"#b2a79e"}
  //       56.43%,
  //     ${"#d6d0cb"}
  //       100%
  //   )`,
  //   },
  //   to: {
  //     background: `linear-gradient(
  //       151deg,
  //       ${musicColorWavesMap[threeRandomWaves[0].id]}
  //         10.39%,
  //       ${musicColorWavesMap[threeRandomWaves[1].id]}
  //         56.43%,
  //       ${musicColorWavesMap[threeRandomWaves[2].id]}
  //         100%
  //     )`,
  //   },
  //   delay: 2000,
  //   config: {
  //     ...config.slow,
  //   },
  // });

  const contentSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1200,
    config: { friction: 120, tension: 240 },
  });

  return (
    <a.div
      // style={backgroundSpring}
      className="grid place-items-center w-screen h-screen text-center"
    >
      <a.div style={contentSpring} className="flex flex-col gap-12">
        <div className="justify-self-start flex flex-col gap-2">
          <h1 className="text-9xl font-bold leading-[6rem]">WAVES</h1>
          <p className="text-4xl tracking-wider">
            Connecting Generative Art & Culture
          </p>
        </div>
        <p className="text-2xl font-normal tracking-wide">
          📲 Visit <span className="font-bold">app.waves.house</span> on phone
          to install app
        </p>
      </a.div>
    </a.div>
  );
};
