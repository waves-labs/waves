const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const WavesRegistry = await ethers.getContractFactory("WavesRegistry");
  // const EASRegistry = await ethers.getContractFactory("IEAS");

  const instance = await upgrades.deployProxy(WavesRegistry, [
    "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A",
  ]);
  await instance.waitForDeployment();
  // const address = await instance.getAddress();

  // console.log("WavesRegistry deployed to:", address);

  // // Upgrading
  const WavesRegistryV2 = await ethers.getContractFactory("WavesRegistry");
  const upgraded = await upgrades.upgradeProxy(
    await instance.getAddress(),
    WavesRegistryV2,
  );

  console.log("WavesRegistry upgraded to:", await upgraded.getAddress());
}

main();
