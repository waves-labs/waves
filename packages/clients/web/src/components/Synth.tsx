import { css } from "@emotion/react";
import { useSpring, a } from "@react-spring/web";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import MockSynth from "../assets/media/synth_05.png";
import MockVideo from "../assets/media/synth-mock-video.mp4";
import MockVideoPlaceholder from "../assets/media/synth-mock.png";

import { genres, genreColorMap } from "../constants";

interface SynthProps {
  hash: string | null;
  flipped: boolean;
  setFlipped?: React.Dispatch<React.SetStateAction<boolean>>;
  stats?: StatsQuery;
}

// let x = 50;
// const y = 50;

const Genre: React.FC<Genre> = ({ count, name, id }) => {
  return (
    <li
      style={{ backgroundColor: count ? genreColorMap[id] : undefined }}
      className={`${
        count ? `text-white brightness-105` : "bg-stone-900"
      } brightness-90 flex flex-col sm:gap-1 justify-center items-center rounded-full aspect-square w-full`}
    >
      <h4 className="text-xxxs xs:text-xxs sm:text-xs lg:text-sm line-clamp-1">
        {name}
      </h4>
      {count && (
        <p className="text-xxs xs:text-xs sm:text-sm font-light">{`(${count})`}</p>
      )}
    </li>
  );
};

export const Synth: React.FC<SynthProps> = ({
  hash,
  flipped = false,
  setFlipped,
  stats,
}) => {
  // const setup = (p5: any, canvasParentRef: Element) => {
  //   p5.createCanvas(500, 500).parent(canvasParentRef);
  // };

  // const draw = (p5: any) => {
  //   p5.background(0);
  //   p5.ellipse(x, y, 70, 70);
  //   x++;
  // };

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const artists = stats?.artists?.slice(0, 3);

  return (
    <section className="flex-1 w-full sm:grow-[5] text-stone-400">
      <div
        className={`${
          setFlipped ? "cursor-pointer" : ""
        } relative aspect-square w-full bg-transparent`}
        onClick={() => {
          // Only fire if directly clicked
          // if (e.target === e.currentTarget)
          setFlipped && setFlipped((state) => !state);
        }}
        // onDoubleClick={() => setFlipped && setFlipped((state) => !state)}
      >
        <a.div
          className="border-[0.75rem] sm:border-[1rem] lg:border-[1.5rem] border-black bg-black absolute w-full h-full grid place-items-center"
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
          css={css`
            box-shadow: 20px 20px 100px 0px rgba(0, 0, 0, 0.35);
          `}
        >
          {hash ? (
            <img
              className="w-full h-full"
              src={MockSynth}
              alt="Synth minted by wallet connected"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              className="w-full h-full"
              src={MockVideo}
              placeholder={MockVideoPlaceholder}
            />
          )}
        </a.div>
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
          <TransformWrapper>
            <TransformComponent
              // contentClass="border-[0.75rem] sm:border-[1rem] lg:border-[1.5rem] border-black bg-black absolute w-full h-full grid place-items-center"
              contentClass="synth"
              contentStyle={{ width: "inherit", height: "inherit" }}
              wrapperStyle={{ width: "inherit", height: "inherit" }}
            >
              <ul className="synth-story grid grid-cols-6 grid-rows-5 gap-1">
                {genres.map((genre) => (
                  <Genre
                    key={genre.id}
                    {...genre}
                    count={
                      stats?.genres?.find((data) => data.id === genre.id)?.count
                    }
                  />
                ))}
              </ul>
              <div className="synth-details flex items-center w-full mt-3 border-stone-800 border-2 rounded-sm divide-x divide-stone-800">
                <div className="basis-1/4 px-4 py-2 sm:py-4 sm:px-8 flex flex-col gap-1 h-full">
                  <h4 className="font-light text-xs text-stone-400 tracking-wide uppercase">
                    Experiences
                  </h4>
                  <p className="font-medium text-white text-xs xs:text-base">
                    {stats?.experiences?.length}
                  </p>
                </div>
                <div className="basis-3/4 px-4 py-2 sm:py-4 sm:px-8 flex flex-col gap-1 h-full">
                  <h4 className="font-light text-xs text-stone-400 tracking-wide uppercase">
                    Favorite Artists
                  </h4>
                  <ul className="flex line-clamp-1 gap-1 flex-nowrap">
                    {artists?.map((artist, i) => (
                      <li key={artist.id}>
                        <p className="font-medium text-white text-xs xs:text-base line-clamp-1">
                          {i === artists.length - 1 ? "and " : ""}
                          {artist.name}
                          {i === artists.length - 1 ? "" : ", "}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </a.div>
      </div>
    </section>
  );
};
