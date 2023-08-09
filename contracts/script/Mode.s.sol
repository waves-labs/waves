// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";

import {Ticket} from "../src/mode/Ticket.sol";
import {SynthRegistry} from "../src/mode/SynthRegistry.sol";
import {SynthGenerator} from "../src/mode/SynthGenerator.sol";

import "../src/Types.sol";

/**
 * @title ZoraScript
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
        SynthRegistry synthRegistry = new SynthRegistry();

        // deploy SynthGenerator

        // stop broadcasting transactions
        vm.stopBroadcast();
    }
}
