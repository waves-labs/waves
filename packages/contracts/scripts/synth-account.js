const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const SynthAccount = await ethers.getContractFactory("SynthAccount");
  await ethers.provider.getSigner(0);

  const instance = await upgrades.deployProxy(SynthAccount, []);
  await instance.waitForDeployment();
  const address = await instance.getAddress();

  console.log("SynthAccount deployed to:", address);

  // Upgrading
  // const SynthAccountV2 = await ethers.getContractFactory("SynthAccount");
  // const upgraded = await upgrades.upgradeProxy(
  //   await instance.getAddress(),
  //   SynthAccountV2,
  // );

  // console.log("SynthAccount upgraded to:", await upgraded.getAddress());
}

main();
