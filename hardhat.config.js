require("dotenv/config");
require("hardhat-contract-sizer");
require("@nomicfoundation/hardhat-foundry");
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

const {
  ETHEREUM_OPTIMISM_PROVIDER_URL = "https://mainnet.optimism.io",
  ETHEREUM_BASE_PROVIDER_URL = "https://mainnet.base.org",
  ETHEREUM_ZORA_PROVIDER_URL = "https://rpc.zora.energy",
  ETHEREUM_OPTIMISM_GOERLI_PROVIDER_URL = "https://goerli.optimism.io",
  ETHEREUM_BASE_GOERLI_PROVIDER_URL = "https://goerli.base.org",
  ETHEREUM_ZORA_GOERLI_PROVIDER_URL = "https://testnet.rpc.zora.energy",
  ETHEREUM_MODE_SEPOLIA_PROVIDER_URL = "https://sepolia.mode.network",
  ETHERSCAN_API_KEY,
  FORGE_PRIVATE_KEY:
    deployer = "ledger://0x0000000000000000000000000000000000000000",

  PROFILE: isProfiling,
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    metadata: {
      bytecodeHash: "none",
    },
    contractSizer: {
      alphaSort: true,
      runOnCompile: true,
      disambiguatePaths: false,
    },
    allowUnlimitedContractSize: true,
    gasReporter: {
      currency: "USD",
      enabled: isProfiling,
    },
  },
  networks: {
    hardhat: {
      accounts: {
        count: 20,
        accountsBalance: "10000000000000000000000000000000000000000000000",
      },
      allowUnlimitedContractSize: true,
      saveDeployments: false,
      live: false,
    },
    optimism: {
      chainId: 10,
      url: ETHEREUM_OPTIMISM_PROVIDER_URL,
      saveDeployments: true,
      live: true,
      accounts: [deployer],
    },
    base: {
      chainId: 8453,
      url: ETHEREUM_BASE_PROVIDER_URL,
      saveDeployments: true,
      live: true,
      accounts: [deployer],
    },
    zora: {
      chainId: 7777777,
      url: ETHEREUM_ZORA_PROVIDER_URL,
      saveDeployments: true,
      live: true,
      accounts: [deployer],
    },
    "optimism-goerli": {
      chainId: 420,
      url: ETHEREUM_OPTIMISM_GOERLI_PROVIDER_URL,
      saveDeployments: true,
      live: true,
      accounts: [deployer],
    },
    "base-goerli": {
      chainId: 84531,
      url: ETHEREUM_BASE_GOERLI_PROVIDER_URL,
      saveDeployments: true,
      live: true,
      // gasPrice: 1000000000,
      accounts: [deployer],
    },
    "zora-goerli": {
      chainId: 999,
      url: ETHEREUM_ZORA_GOERLI_PROVIDER_URL,
      saveDeployments: true,
      live: true,
      accounts: [deployer],
    },
    "mode-sepolia": {
      chainId: 919,
      url: ETHEREUM_MODE_SEPOLIA_PROVIDER_URL,
      saveDeployments: true,
      live: true,
      accounts: [deployer],
    },
  },
  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
  },
};
