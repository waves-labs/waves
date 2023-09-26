import React from "react";
import { a, useSpring } from "@react-spring/web";
// import { RC as TwitterIcon } from "../../assets/twitter.svg";

// import { musicColorWavesMap, musicColorWaves } from "../../constants";

// TODO: Add Subscribe button

export const OnlyMobile: React.FC = () => {
  const contentSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1200,
    config: { friction: 120, tension: 240 },
  });

  return (
    <a.div
      // style={backgroundSpring}
      className="grid place-items-center w-screen h-screen text-center z-10"
    >
      <a.div style={contentSpring} className="flex flex-col gap-12">
        {/* <video
              className="w-full h-full object-cover"
              src="/videos/waves.mp4"
              autoPlay
              muted
              loop
            /> */}
        <div className="justify-self-start flex flex-col gap-2">
          <h1 className="text-9xl font-bold leading-[6rem]">WAVES</h1>
          <p className="text-4xl tracking-wider">
            Connecting Generative Art & Culture
          </p>
        </div>
        <p className="text-2xl font-normal tracking-wide">
          More info coming soon
          {/* 📲 Visit <span className="font-bold">app.waves.house</span> on phone
          to install app */}
        </p>
        {/* <div>
          <a
            className="w-10 h-10 flex justify-end items-center"
            href="https://twitter.com/syndotart"
            target="_blank"
          >
            <TwitterIcon
              className={`fill-black dark:fill-white cursor-pointer opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out`}
            />
          </a>
        </div> */}
      </a.div>
    </a.div>
  );
};
