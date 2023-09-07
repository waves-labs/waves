require("dotenv/config");
require("hardhat-deploy");
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

const base = (address) => ({
  8453: address,
});

const optimism = (address) => ({
  10: address,
});

const zora = (address) => ({
  7777777: address,
});

const baseGoerli = (address) => ({
  84531: address,
});

const optimismGoerli = (address) => ({
  420: address,
});

const zoraGoerli = (address) => ({
  999: address,
});

const modeSepolia = (address) => ({
  919: address,
});

const NamedAccounts = {
  deployer: {
    ...base(deployer),
    ...optimism(deployer),
    ...zora(deployer),
    ...baseGoerli(deployer),
    ...optimismGoerli(deployer),
    ...zoraGoerli(deployer),
    ...modeSepolia(deployer),
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  paths: {
    deploy: ["deploy"],
  },
  typechain: {
    target: "ethers-v6",
  },
  namedAccounts: NamedAccounts,
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
      // gasMultiplier: 2,
      gasPrice: 1000000000,
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
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: isProfiling,
  },
};
