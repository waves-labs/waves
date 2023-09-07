import { css } from "@emotion/react";
import { a, useSpring, config } from "@react-spring/web";

import { genreColorMap } from "../../clients/web/src/constants";

import { useSynthesize } from "../../clients/web/src/hooks/synthesize/useSynthesize";

import { Synth } from "../../clients/web/src/components/Synth";
import { Actions } from "../../clients/web/src/components/Actions";
import { Header } from "../../clients/web/src/components/Layout/Header";
import { Footer } from "../../clients/web/src/components/Layout/Footer";
import { BackgroundBurst } from "../../clients/web/src/components/Layout/BackgroundBurst";

const Views = () => {
  const {
    error,
    stats,
    transactionHash,
    connect,
    disconnect,
    synthesize,
    share,
    artFlipped,
    setFlippedArt,
    ...state
  } = useSynthesize();

  const style = useSpring({
    to: {
      background: `linear-gradient(
        151deg,
        ${stats?.genres?.[0] ? genreColorMap[stats.genres[0].id] : "#e9e3dd"}
          10.39%,
        ${stats?.genres?.[1] ? genreColorMap[stats.genres[1].id] : "#b2a79e"}
          56.43%,
        ${stats?.genres?.[2] ? genreColorMap[stats.genres[2].id] : "#d6d0cb"}
          100%
      )`,
    },
    config: {
      ...config.slow,
    },
  });

  const isStarted =
    (state.isConnected ||
      state.isSynthesizing ||
      state.isSynthesized ||
      state.isRefreshing) &&
    !!stats?.experiences?.length;

  return (
    <>
      <Header isStarted={isStarted} />
      <a.main
        className={`relative h-[calc(100svh+4rem)] py-4 sm:py-16 md:py-24  ${
          isStarted ? "text-white" : ""
        }`}
        css={css`
          background: linear-gradient(
            151deg,
            #e9e3dd 10.39%,
            #b2a79e 56.43%,
            #d6d0cb 100%
          );
        `}
        style={style}
      >
        <BackgroundBurst
          color={
            stats?.genres?.[3] ? genreColorMap[stats.genres[3].id] : "#EFE9E4"
          }
        />
        <div className="relative h-full z-10 py-8 px-6 md:px-12 sm:px-8 max-w-screen-xl sm:mx-auto flex flex-col sm:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-24">
          <Synth
            hash={transactionHash}
            stats={stats}
            flipped={artFlipped}
            setFlipped={state.isSynthesized ? setFlippedArt : undefined}
          />
          <Actions
            address={state.address}
            error={error}
            data={stats}
            action={
              state.isIdle || state.isConnecting
                ? connect
                : state.isConnected || state.isSynthesizing
                ? synthesize
                : state.isSynthesized
                ? share
                : undefined
            }
            {...state}
          />
        </div>
        <Footer isStarted={isStarted} disconnect={disconnect} />
      </a.main>
    </>
  );
};

export default Views;
