import { Navigate, Route, Routes } from "react-router-dom";

import { useSynths } from "../hooks/views/useSynths";
import { useExplore } from "../hooks/views/useExplore";
import { useProfile } from "../hooks/views/useProfile";

import Synths from "./Synths";
import Explore from "./Explore";
import Profile from "./Profile";
import { SynthsViewer } from "../components/Synth/Viewer";

export default function Views() {
  const synths = useSynths();
  const explore = useExplore();
  const profile = useProfile();

  return (
    <main
      className={`flex h-[calc(100dvh-3.5rem)] overflow-hidden max-h-[calc(100dvh-3.5rem)] overflow-y-contain`}
    >
      <Routes>
        <Route path="synths" element={<Synths {...synths} />}>
          <Route
            path=":address"
            element={
              <SynthsViewer
                synths={synths.synths}
                synthNfts={synths.synthNfts}
                synthWavesMap={synths.synthWavesMap}
                // waveNftMap={synths.waveNftMap}
                waveTokenMap={synths.waveTokenMap}
                fetchSynths={synths.fetchSynths}
                fetchSynthNfts={synths.fetchSynthNfts}
                // fetchWaveNfts={synths.fetchWaveNfts}
              />
            }
          />
        </Route>
        <Route path="explore" element={<Explore {...explore} />} />
        <Route path="profile" element={<Profile {...profile} />} />
        <Route path="*" element={<Navigate to="profile" />} />
      </Routes>
    </main>
  );
}
