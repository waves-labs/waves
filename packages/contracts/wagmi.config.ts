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
          85431: "0x3F53a611878999D5BDf2f385A6D5A7e9e9Aa880C",
        },
        WaveRegistry: {
          85431: "0xDAd97DD8EE3809b06258dd6F86a852118fE41f7d",
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
      useContractRead: true,
    }),
  ],
});
