const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const SynthRegistry = await ethers.getContractFactory("SynthRegistry");
  // await ethers.provider.getSigner(0);

  const instance = await upgrades.deployProxy(SynthRegistry, [
    "0xcd3b766ccdd6ae721141f452c550ca635964ce71",
    "0xcd3b766ccdd6ae721141f452c550ca635964ce71",
  ]);
  await instance.waitForDeployment();
  const address = await instance.getAddress();

  console.log("SynthRegistry deployed to:", address);

  // Upgrading
  // const SynthRegistryV2 = await ethers.getContractFactory("SynthRegistryV2");
  // const upgraded = await upgrades.upgradeProxy(await instance.getAddress(), SynthRegistryV2);
}

main();
