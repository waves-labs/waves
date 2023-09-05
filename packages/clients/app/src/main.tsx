import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Provider } from "urql";
import { WagmiConfig } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { AppProvider } from "./hooks/providers/app";
import { Web3Provider } from "./hooks/providers/web3";

import { chains, config } from "./modules/wagmi";
import { graphClient } from "./modules/urql";

import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <Provider value={graphClient}>
          <BrowserRouter>
            <AppProvider>
              <Web3Provider>
                <App />
              </Web3Provider>
            </AppProvider>
          </BrowserRouter>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
