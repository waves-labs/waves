// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Synth} from "../src/Synth.sol";

import {Script} from "forge-std/Script.sol";

/**
 * @title SynthScript
 * @notice Script for deploying Synth.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy Synth with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/Synth.s.sol:Deploy --rpc-url http://localhost:8545 --broadcast -vvv
 * @dev Scripts can be used for any scripting not just deployment
 */
contract SynthScript is Script {
    function setUp() public {}

    function run() public {
        // read DEPLOYER_PRIVATE_KEY from environment variables
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        // start broadcast any transaction after this point will be submitted to chain
        vm.startBroadcast(deployerPrivateKey);

        // deploy Synth
        Synth counter = new Synth();

        // stop broadcasting transactions
        vm.stopBroadcast();
    }
}
