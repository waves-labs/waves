import { css } from "@emotion/react";
import { a, config, useSpring, useTransition } from "@react-spring/web";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useSynths } from "../hooks/views/useSynths";
import { useExplore } from "../hooks/views/useExplore";
import { useProfile } from "../hooks/views/useProfile";

import Synths from "./Synths";
import Explore from "./Explore";
import Profile from "./Profile";

export default function Views() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  const synths = useSynths();
  const explore = useExplore();
  const profile = useProfile();

  const lastSynth = synths.synths ? synths.synths.length - 1 : 0;

  const bgStyle = useSpring({
    to: {
      background: `linear-gradient(
        151deg,
        ${
          synths.synths[lastSynth]?.waves?.[0]
            ? synths.synths[lastSynth].waves[0].color
            : "#e9e3dd"
        }
          10.39%,
        ${
          synths.synths[lastSynth]?.waves?.[1]
            ? synths.synths[lastSynth].waves[1].color
            : "#b2a79e"
        }
          56.43%,
        ${
          synths.synths[lastSynth]?.waves?.[2]
            ? synths.synths[lastSynth].waves[2].color
            : "#d6d0cb"
        }
          100%
      )`,
    },
    config: {
      ...config.slow,
    },
  });

  // const isStarted =
  //   (state.isConnected ||
  //     state.isSynthesizing ||
  //     state.isSynthesized ||
  //     state.isRefreshing) &&
  //   !!stats?.experiences?.length;

  return transitions((style, location) => (
    <a.main
      className={`flex h-[calc(100dvh-4rem)] overflow-hidden max-h-[calc(100dvh-4rem)] overflow-y-contain`}
      style={{ ...style, ...bgStyle }}
      // isStarted ?s"text-white" : ""
      css={css`
        background: linear-gradient(
          151deg,
          #e9e3dd 10.39%,
          #b2a79e 56.43%,
          #d6d0cb 100%
        );
      `}
    >
      <Routes location={location}>
        <Route path="/synths" element={<Synths {...synths} />} />
        <Route path="/explore" element={<Explore {...explore} />} />
        <Route path="/profile" element={<Profile {...profile} />} />
        <Route path="*" element={<Navigate to="/explore" />} />
      </Routes>
    </a.main>
  ));
}
