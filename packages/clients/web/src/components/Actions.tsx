import shuffle from "lodash.shuffle";

import { SynthesizeState } from "../hooks/synthesize/useSynthesize";

import { RC as EtherscanIcon } from "../assets/etherscan.svg";
import { RC as OpenseaIcon } from "../assets/opensea.svg";

import { StatsReel } from "./StatsReel";

import { Button } from "./Button";

interface ActionsProps extends SynthesizeState {
  address?: `0x${string}`;
  error?: string | null;
  data?: StatsQuery;
  action?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  address,
  error,
  data,
  action,
  ...state
}) => {
  // Show 2 random artists
  const randomArtists = shuffle(data?.artists ?? []).slice(0, 2);

  return (
    <section className="flex flex-col justify-around items-start sm:justify-center sm:gap-8 md:gap-12 flex-1 sm:grow-[4] lg:grow-[3] w-full">
      <div className="relative flex flex-col gap-2 sm:gap-4 text-base xs:text-lg lg:text-xl tracking-wider uppercase max-w-lg text-left h-36 xs:h-60 lg:h-56 w-full">
        {state.isConnected || (address && state.isRefreshing) ? (
          <>
            <h2 className="text-2xl lg:text-3xl font-medium uppercase line-clamp-4">
              Synesthesia <br />
              has detected
              <br /> {data?.experiences?.length}{" "}
              {data?.hasMintedExperience ? "Music NFTs" : "Liked Sounds"}
            </h2>
            <span className="line-clamp-3">
              Your collection includes <br />
              {data?.genres?.length} genres and artists{" "}
              {data?.experiences?.length ? (
                <>
                  such as{" "}
                  {randomArtists
                    ? randomArtists.map((artist, i: number, artists) => (
                        <span key={artist.id}>
                          {i === artists.length - 1 ? "and " : ""}
                          {artist.name}
                          {i === artists.length - 1 ? "" : " "}
                        </span>
                      ))
                    : []}
                </>
              ) : (
                <>
                  go{" "}
                  <a
                    href="https://www.sound.xyz/"
                    target="_blank"
                    data-tip="Sound.xyz"
                    className="sm:tooltip sm:tooltip-primary cursor-pointer opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out"
                  >
                    collect
                  </a>
                  now!
                </>
              )}
              .
            </span>
          </>
        ) : state.isSynthesizing ? (
          <StatsReel experiences={data?.experiences ?? []} />
        ) : state.isSynthesized ? (
          <>
            <h2 className="text-2xl lg:text-3xl font-medium uppercase">
              Synth #001
            </h2>
            <span className="text-stone-200 flex gap-2 normal-case line-clamp-3">
              View on{" "}
              <a
                className="sm:tooltip sm:tooltip-primary"
                href="https://etherscan.io/"
                target="_blank"
                data-tip="Etherscan"
              >
                <EtherscanIcon className="fill-stone-200 cursor-pointer opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out" />
              </a>
              <a
                className="sm:tooltip sm:tooltip-primary"
                href="https://opensea.io"
                target="_blank"
                data-tip="Opensea"
              >
                <OpenseaIcon className="fill-stone-200 cursor-pointer opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out" />
              </a>
            </span>
          </>
        ) : (
          <>
            <h2
              className="text-2xl lg:text-3xl
            font-medium uppercase line-clamp-4"
            >
              Synesthesia
              <br />
              Your collection reimagined
            </h2>
            <span className="line-clamp-3">
              Transform your music NFT collection into a unique
              <br /> piece of generative art
            </span>
          </>
        )}
      </div>
      <label
        className="sm:tooltip sm:tooltip-primary"
        data-tip={
          state.isConnected && !data?.hasMintedExperience
            ? "Can't Synthesize Until NFT Collected"
            : undefined
        }
      >
        <Button
          title={
            state.isConnecting
              ? "Starting"
              : state.isConnected || (address && state.isRefreshing)
              ? "Synthesize"
              : state.isSynthesizing
              ? "Synthesizing..."
              : state.isSynthesized
              ? "Share"
              : "Start"
          }
          onClick={action}
          active={state.isConnecting || state.isSynthesizing}
          disabled={
            state.isConnecting || state.isSynthesizing
            // ||
            // (!data?.hasMintedExperience &&
            //   (state.isConnected || state.isRefreshing))
          }
        />
      </label>
      <p className="line-clamp-2 xs:line-clamp-3 font-medium h-6 xs:h-12">
        {error}
      </p>
    </section>
  );
};
