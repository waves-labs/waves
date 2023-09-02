const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const WaveResolver = await ethers.getContractFactory("WaveResolver");
  await ethers.provider.getSigner(0);

  const instance = await upgrades.deployProxy(WaveResolver, [], {
    unsafeAllow: ["state-variable-immutable", "constructor"],
    constructorArgs: ["0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A"],
  });
  await instance.waitForDeployment();
  const address = await instance.getAddress();

  console.log("WaveResolver deployed to:", address);

  // Upgrading
  // const WaveResolverV2 = await ethers.getContractFactory("WaveResolver");
  // const upgraded = await upgrades.upgradeProxy(
  //   await instance.getAddress(),
  //   WaveResolverV2,
  // );

  // console.log("WaveResolver upgraded to:", await upgraded.getAddress());
}

main();
