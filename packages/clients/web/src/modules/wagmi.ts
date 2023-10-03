import { baseGoerli, foundry } from "wagmi/chains";
import { createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const chainConfig = configureChains(
  [baseGoerli, foundry],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY! }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true, // Should we enable auto-connection?
  // connectors,
  publicClient: chainConfig.publicClient,
  webSocketPublicClient: chainConfig.webSocketPublicClient,
});

export { chainConfig, config };
