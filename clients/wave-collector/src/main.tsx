import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { AppProvider } from "./hooks/app/useApp";
import { WefaProvider } from "./hooks/wefa/useWefa";
import { SeedProvider } from "./hooks/wefa/useSeed";

import { App } from "./App";
import { chains, config } from "./modules/wagmi";

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
