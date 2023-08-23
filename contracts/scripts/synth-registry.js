const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const SynthRegistry = await ethers.getContractFactory("SynthRegistry");
  // // await ethers.provider.getSigner(0);

  const instance = await upgrades.deployProxy(SynthRegistry, []);
  // await instance.waitForDeployment();
  // const address = await instance.getAddress();

  // console.log("SynthRegistry deployed to:", address);

  // // Upgrading
  const SynthRegistryV2 = await ethers.getContractFactory("SynthRegistry");
  const upgraded = await upgrades.upgradeProxy(
    await instance.getAddress(),
    SynthRegistryV2,
  );

  console.log("SynthRegistry upgraded to:", await upgraded.getAddress());
}

main();
