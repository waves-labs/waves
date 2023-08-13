import {
  foundry,
  optimismGoerli,
  baseGoerli,
  zoraTestnet,
  optimism,
  base,
  zora,
} from "wagmi/chains";
import { Chain, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const modeTestnet = {
  id: 919,
  name: "Mode Testnet",
  network: "mode-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.mode.network"],
    },
    public: {
      http: ["https://sepolia.mode.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia.explorer.mode.network",
    },
  },
  testnet: true,
} as const satisfies Chain;

const { chains, publicClient } = configureChains(
  [
    base,
    baseGoerli,
    optimism,
    optimismGoerli,
    zora,
    zoraTestnet,
    modeTestnet,
    foundry,
  ],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY! }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === foundry.id) {
          return { http: "http://localhost:8545" };
        }
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ],
);

export { chains };

const { connectors } = getDefaultWallets({
  appName: "WAVES",
  chains,
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
});

export const config = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
  webSocketPublicClient: publicClient,
});
