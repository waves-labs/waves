// import Views from "./views";
import { Header } from "./components/Layout/Header";
import { OnlyMobile } from "./components/Layout/OnlyMobile";

import { WavesProvider } from "./hooks/providers/waves";

function App() {
  return (
    <WavesProvider>
      <Header />
      <OnlyMobile />
      {/* <Views /> */}
    </WavesProvider>
  );
}

export default App;
