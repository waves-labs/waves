import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
// import * as chains from "wagmi/chains";

/**
 * Wagmi cli will automatically generate react hooks from your forge contracts
 * @see https://wagmi.sh/cli/getting-started
 * You can also generate hooks from etherscan
 * @see https://wagmi.sh/cli/plugins/etherscan
 * Or for erc20 erc721 tokens
 * @see https://wagmi.sh/cli/plugins/erc
 * Or from hardhat
 * @see https://wagmi.sh/cli/plugins/hardhat
 * Or from an arbitrary fetch request
 * @see https://wagmi.sh/cli/plugins/fetch
 *
 * You can also generate vanilla actions for @wagmi/core
 * @see https://wagmi.sh/cli/plugins/actions
 */
export default defineConfig({
  out: "../clients/app/src/generated.ts",
  plugins: [
    /**
     * Generates react hooks from your forge contracts
     * @see https://wagmi.sh/cli/plugins/foundry
     */
    foundry({
      exclude: [
        "Common.sol/**",
        "Components.sol/**",
        "Script.sol/**",
        "StdAssertions.sol/**",
        "StdError.sol/**",
        "StdCheats.sol/**",
        "StdMath.sol/**",
        "StdJson.sol/**",
        "StdStorage.sol/**",
        "StdUtils.sol/**",
        "Vm.sol/**",
        "console.sol/**",
        "console2.sol/**",
        "test.sol/**",
        "**.s.sol/*.json",
        "**.t.sol/*.json",
      ],
      deployments: {
        SynthRegistry: {
          85431: "0xDBcd0b796aA86544FfaD2f27B13453918A78A51d",
        },
        WaveRegistry: {
          85431: "0x9D641140e6c1F1B3CE7a75092893952d22692f40",
        },
      },
    }),
    /**
     * Generates react hooks from your abis
     * @see https://wagmi.sh/cli/plugins/react
     */
    react({
      useContractEvent: true,
      useContractFunctionRead: false,
      useContractRead: false,
    }),
  ],
});
