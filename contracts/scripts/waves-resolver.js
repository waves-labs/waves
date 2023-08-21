const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const WavesResolver = await ethers.getContractFactory("WavesResolver");
  const instance = await upgrades.deployProxy(WavesResolver, [42]);
  await instance.waitForDeployment();

  // Upgrading
  // const WavesResolverV2 = await ethers.getContractFactory("WavesResolverV2");
  // const upgraded = await upgrades.upgradeProxy(
  //   await instance.getAddress(),
  //   WavesResolverV2,
  // );
}

main();
