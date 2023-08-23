import { detectHandheld } from "./hooks/useApp";
import { usePWA, InstallState } from "./hooks/usePWA";
import { SynthProvider } from "./hooks/synth/useSynth";
import { ScannerProvider } from "./hooks/scanner/useScanner";

import { Appbar } from "./components/Layout/AppBar";
import { PWADialog } from "./components/Layout/PWADialog";
import { OnlyMobile } from "./components/Layout/OnlyMobile";

import Views from "./views";

export function App() {
  const { installState } = usePWA();

  const InstallComp: Record<InstallState, React.ReactNode> = {
    installed: null,
    prompt: <PWADialog state="prompt" />,
    none: <PWADialog state="none" />,
    unsupported: <PWADialog state="unsupported" />,
  };

  return (
    <SynthProvider>
      <ScannerProvider>
        {!detectHandheld() ? (
          <OnlyMobile />
        ) : (
          <>
            {InstallComp[installState]}
            <Views />
            <Appbar />
          </>
        )}
      </ScannerProvider>
    </SynthProvider>
  );
}
