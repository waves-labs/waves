import { WagmiConfig } from "wagmi";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";

import { config, chainConfig } from "./modules/wagmi";
import { apolloClient } from "./modules/apollo";

import { OnlyMobile } from "./components/Layout/OnlyMobile";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={config}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID ?? ""}
          // onSuccess={handleLogin}
          config={{
            loginMethods: ["email", "wallet"],
            appearance: {
              theme: "light",
              accentColor: "#d6d0cb",
              // logo: "https://your-logo-url",
            },
          }}
        >
          <PrivyWagmiConnector wagmiChainsConfig={chainConfig}>
            <BrowserRouter>
              <OnlyMobile />
            </BrowserRouter>
          </PrivyWagmiConnector>
        </PrivyProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default App;
