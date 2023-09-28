// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Script} from "forge-std/Script.sol";

import {Wave} from "../src/Wave.sol";
import {Synth} from "../src/Synth.sol";
import {SynthAccount} from "../src/SynthAccount.sol";
import {WaveRegistry} from "../src/WaveRegistry.sol";
import {SynthRegistry} from "../src/SynthRegistry.sol";
import {MockTicket} from "../src/mocks/MockTicket.sol";

/**
 * @title BaseScript
 * @notice Script for deploying Wave Collector Contracts.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script s used to create Waves and Synths from their repsective registry with forge script
 * example start anvil with `anvil` command and then run
 * @dev Scripts can be used for development and testing, but they are not required for production.
 */
contract BaseScriptUpdates is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");

        // Start Broadcasting Transactions
        vm.startBroadcast(deployerPrivateKey);

        Wave wave = Wave(0xf27872B487638C1cD338bCBDAF27137E664Bb1D0);

        wave.setStartTime(block.timestamp + 1 minutes);
        wave.setDuration(1 days - 1 minutes);

        // Stop Broadcasting Transactions
        vm.stopBroadcast();
    }
}
