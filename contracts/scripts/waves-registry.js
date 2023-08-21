const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const WavesRegistry = await ethers.getContractFactory("WavesRegistry");
  // await ethers.provider.getSigner(0);

  const instance = await upgrades.deployProxy(WavesRegistry, []);
  await instance.waitForDeployment();
  const address = await instance.getAddress();

  console.log("WavesRegistry deployed to:", address);

  // Upgrading
  // const WavesRegistryV2 = await ethers.getContractFactory("WavesRegistryV2");
  // const upgraded = await upgrades.upgradeProxy(await instance.getAddress(), WavesRegistryV2);
}

main();
