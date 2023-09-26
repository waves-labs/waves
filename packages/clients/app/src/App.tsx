import { WaveProvider } from "./hooks/wave/useWave";
import { SynthProvider } from "./hooks/synth/useSynth";
import { WavesProvider } from "./hooks/providers/waves";
import { usePWA, InstallState } from "./hooks/providers/pwa";

import { Appbar } from "./components/Layout/AppBar";
import { PWAPrompt } from "./components/Layout/PWAPrompt";
import { OnlyMobile } from "./components/Layout/OnlyMobile";
import { CircleLoader } from "./components/Loader/Circle";

import Views from "./views";

export function App() {
  const { installState, ...pwaData } = usePWA();

  const Onboard: Record<InstallState, React.ReactNode> = {
    idle: (
      <div className="w-screen h-screen pb-20 bg-stone-100 dark:bg-stone-900 grid place-items-center z-30 fixed top-0 left-0">
        <CircleLoader />
      </div>
    ),
    installed: null,
    prompt:
      installState === "unsupported" ? (
        <PWAPrompt {...pwaData} installState={installState} />
      ) : null,
    unsupported: <OnlyMobile />,
  };

  return (
    <WavesProvider>
      <SynthProvider>
        <WaveProvider>
          {Onboard[installState]}
          {installState !== "unsupported" && (
            <>
              <Appbar />
              <Views />
            </>
          )}
        </WaveProvider>
      </SynthProvider>
    </WavesProvider>
  );
}
