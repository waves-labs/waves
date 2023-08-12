// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";

import {Ticket} from "../src/Ticket.sol";
import {SynthRegistry} from "../src/SynthRegistry.sol";
import {SynthGenerator} from "../src/SynthGenerator.sol";

import "../src/Types.sol";
import "../src/Constants.sol";

/**
 * @title ModeScript
 * @notice Script for deploying Wave Collector Contracts.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy Ticket, SynthGenerator, and SynthRegistry with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/Ticket.s.sol:Deploy --rpc-url http://localhost:8545 --broadcast -vvv
 * @dev Scripts can be used for development and testing, but they are not required for production.
 */
contract ModeScript is Script {
    function setUp() public {}

    function run() public {
        // read DEPLOYER_PRIVATE_KEY from environment variables
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        // start broadcast any transaction after this point will be submitted to chain
        vm.startBroadcast(deployerPrivateKey);

        // deploy Ticket
        Ticket ticket = new Ticket( "Coachella", "COACH", block.timestamp, block.timestamp + 1 days, 100);

        // deploy SynthRegistry
        SynthRegistry synthRegistry = new SynthRegistry(MODE_SEPOLIA_EAS_ADDRESS);

        Wave[] memory waves = new Wave[](2);

        waves[0] = Wave(0, 100, 0, block.timestamp, block.timestamp + 1 days, bytes32("red"));
        waves[1] = Wave(1, 100, 0, block.timestamp, block.timestamp + 1 days, bytes32("blue"));

        // deploy SynthGenerator
        (, address generator) = synthRegistry.registerEvent(
            1 days, address(ticket), "https://github.com/SynesthesiaLabs/superhack/tree/main/contracts/src", waves
        );

        // deploy Synth
        SynthGenerator synthGenerator = SynthGenerator(generator);

        // mint Synth
        // synthGenerator.generateSynth(attendee

        // stop broadcasting transactions
        vm.stopBroadcast();
    }
}
