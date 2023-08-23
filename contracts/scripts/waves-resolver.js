const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const WavesResolver = await ethers.getContractFactory("WavesResolver");
  const instance = await upgrades.deployProxy(WavesResolver, [
    "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A",
  ]);
  await instance.waitForDeployment();
  const address = await instance.getAddress();

  console.log("WavesResolver deployed to:", address);

  // Upgrading
  const WavesResolverV2 = await ethers.getContractFactory("WavesResolver");
  const upgraded = await upgrades.upgradeProxy(
    await instance.getAddress(),
    WavesResolverV2,
  );

  console.log("WavesResolver upgraded to:", await upgraded.getAddress());
}

main();
