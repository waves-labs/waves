const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const Synth = await ethers.getContractFactory("Synth");
  const instance = await upgrades.deployProxy(Synth, [42]);
  await instance.waitForDeployment();

  // Upgrading
  // const SynthV2 = await ethers.getContractFactory("SynthV2");
  // const upgraded = await upgrades.upgradeProxy(await instance.getAddress(), SynthV2);
}

main();
