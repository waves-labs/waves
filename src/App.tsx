import { AppProvider, detectHandheld } from "./hooks/useApp";
import { SynthProvider } from "./hooks/synth/useSynth";
import { ScannerProvider } from "./hooks/scanner/useScanner";

import { Appbar } from "./components/Layout/AppBar";
import { OnlyMobile } from "./components/Layout/OnlyMobile";

import Views from "./views";

export function App() {
  return (
    <AppProvider>
      <SynthProvider>
        <ScannerProvider>
          {!detectHandheld() ? (
            <OnlyMobile />
          ) : (
            <>
              <Views />
              <Appbar />
            </>
          )}
        </ScannerProvider>
      </SynthProvider>
    </AppProvider>
  );
}
