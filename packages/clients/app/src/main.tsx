import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { WagmiConfig } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { AppProvider } from "./hooks/useApp";
import { Web3Provider } from "./hooks/useWeb3";
import { chains, config } from "./modules/wagmi";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <AppProvider>
            <Web3Provider>
              <App />
            </Web3Provider>
          </AppProvider>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
