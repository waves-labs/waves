import { WaveProvider } from "./hooks/wave/useWave";
import { SynthProvider } from "./hooks/synth/useSynth";
import { WavesProvider } from "./hooks/providers/waves";
import { usePWA, InstallState } from "./hooks/providers/pwa";

import { Appbar } from "./components/Layout/AppBar";
import { PWADialog } from "./components/Layout/PWADialog";
import { OnlyMobile } from "./components/Layout/OnlyMobile";

import Views from "./views";
// import { Loader } from "./components/Loader";

export function App() {
  const { installState } = usePWA();

  const Onboard: Record<InstallState, React.ReactNode> = {
    // idle: (
    //   <div className="w-screen h-screen pb-20 bg-stone-100 dark:bg-stone-900 grid place-items-center">
    //     <Loader />
    //   </div>
    // ),
    idle: null,
    installed: null,
    prompt: <PWADialog state="prompt" />, // Ask nicely to install
    dismissed: <PWADialog state="dismissed" />, // Ask again more forcefully
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
