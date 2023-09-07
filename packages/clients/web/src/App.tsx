import { WagmiConfig } from "wagmi";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config, chains } from "./modules/wagmi";
import { apolloClient } from "./modules/apollo";

import { About } from "./components/Layout/About";

import Views from "../../../contracts/views";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <About />
            <Views />
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default App;
