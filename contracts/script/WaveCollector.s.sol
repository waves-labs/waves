// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Synth} from "../src/Synth.sol";
import {Waves} from "../src/Waves.sol";
import {Ticket} from "../src/Ticket.sol";

import {Script} from "forge-std/Script.sol";

/**
 * @title WaveCollectorScript
 * @notice Script for deploying Wave Collector Contracts.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy Ticket, Waves, and Synth with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/Ticket.s.sol:Deploy --rpc-url http://localhost:8545 --broadcast -vvv
 * @dev Scripts can be used for development and testing, but they are not required for production.
 */
contract WaveCollectorScript is Script {
    function setUp() public {}

    function run() public {
        // read DEPLOYER_PRIVATE_KEY from environment variables
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        // start broadcast any transaction after this point will be submitted to chain
        vm.startBroadcast(deployerPrivateKey);

        // deploy Ticket
        Ticket ticket = new Ticket( "Coachella", "COACH", block.timestamp, block.timestamp + 1 days, 100);

        // deploy Waves
        Waves.Wave[] memory initialWaves = new Waves.Wave[](4);

        initialWaves[0] = Waves.Wave(1, 100, 0, bytes("blue"));
        initialWaves[1] = Waves.Wave(2, 100, 0, bytes("green"));
        initialWaves[2] = Waves.Wave(0, 100, 0, bytes("red"));
        initialWaves[3] = Waves.Wave(3, 100, 0, bytes("yellow"));

        Waves waves = new Waves(address(ticket), initialWaves, "https://ipfs", block.timestamp + 1 days);

        // deploy Synth

        // stop broadcasting transactions
        vm.stopBroadcast();
    }
}
