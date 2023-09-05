import { goerli } from "wagmi/chains";
import { createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [goerli],
  [
    // alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID }), We should use this for mainnet
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "SynArt",
  chains,
  projectId: "synart",
});

const config = createConfig({
  autoConnect: false, // Should we enable auto-connection?
  connectors,
  publicClient,
});

export { chains, config };
