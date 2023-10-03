import { goerli } from "wagmi/chains";
import { createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

const chainConfig = configureChains(
  [goerli],
  [
    // alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID }), We should use this for mainnet
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "waves house",
  chains: chainConfig.chains,
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
});

const config = createConfig({
  autoConnect: false, // Should we enable auto-connection?
  connectors,
  publicClient: chainConfig.publicClient,
});

export { chainConfig, config };
