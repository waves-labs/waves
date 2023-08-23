const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const Synth = await ethers.getContractFactory("Synth");
  const instance = await upgrades.deployProxy(Synth, [
    "0x9600ec6c0442BE0Ec5f8B5B15888dC3F82bfef87",
    "0x9600ec6c0442BE0Ec5f8B5B15888dC3F82bfef87",
  ]);
  await instance.waitForDeployment();
  const address = await instance.getAddress();

  console.log("Synth deployed to:", address);

  // Upgrading
  const SynthV2 = await ethers.getContractFactory("Synth");
  const upgraded = await upgrades.upgradeProxy(
    await instance.getAddress(),
    SynthV2,
  );

  console.log("Synth upgraded to:", await upgraded.getAddress());
}

main();
