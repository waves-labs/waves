const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const WaveRegistry = await ethers.getContractFactory("WaveRegistry");
  await ethers.provider.getSigner(0);

  const instance = await upgrades.deployProxy(WaveRegistry, []);
  await instance.waitForDeployment();
  const address = await instance.getAddress();

  console.log("WaveRegistry deployed to:", address);

  // // Upgrading
  // const WaveRegistryV2 = await ethers.getContractFactory("WaveRegistry");
  // const upgraded = await upgrades.upgradeProxy(
  //   await instance.getAddress(),
  //   WaveRegistryV2,
  // );

  // console.log("WaveRegistry upgraded to:", await upgraded.getAddress());
}

main();
