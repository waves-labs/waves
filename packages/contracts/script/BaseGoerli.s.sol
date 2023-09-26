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
contract BaseScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");

        // Start Broadcasting Transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Waves with Wave Registry
        WaveRegistry waveRegistry = WaveRegistry(0xDAd97DD8EE3809b06258dd6F86a852118fE41f7d);
        // WaveRegistry waveRegistry = new WaveRegistry();

        address burnaBoyWave =
            waveRegistry.createWave(1000, block.timestamp, 6000 minutes, address(0), address(1), "burna boy", "#7C9D96");
        address drakeWave =
            waveRegistry.createWave(1000, block.timestamp, 6000 minutes, address(0), address(1), "drake", "#FF9EAA");
        address taylorSwiftWave = waveRegistry.createWave(
            2000, block.timestamp, 9000 minutes, address(0), address(1), "taylor swift", "#FFD0D0"
        );
        address badBunnyWave =
            waveRegistry.createWave(2000, block.timestamp, 9000 minutes, address(0), address(1), "bad bunny", "#3AA6B9");
        address toroYMoiWave = waveRegistry.createWave(
            1000, block.timestamp, 6000 minutes, address(0), address(1), "toro y moi", "#E9B384"
        );
        address jungleWave =
            waveRegistry.createWave(1000, block.timestamp, 6000 minutes, address(0), address(1), "jungle", "#F4F2DE");
        address remaWave =
            waveRegistry.createWave(1000, block.timestamp, 6000 minutes, address(0), address(1), "rema", "#A1CCD1");

        // Deploy a Mock ERC721 Ticket
        MockTicket ticket = new MockTicket();

        ticket.mint();

        // Deploy Synths with Synth Registry
        // SynthRegistry synthRegistry = new SynthRegistry();
        SynthRegistry synthRegistry = SynthRegistry(0x3F53a611878999D5BDf2f385A6D5A7e9e9Aa880C);

        address[] memory nftWhitelist = new address[](1);
        address[] memory emptyWhitelist = new address[](0);

        nftWhitelist[0] = address(ticket);

        address coachAddrs = synthRegistry.createSynth(
            true, address(0), "Coachella 2024", "https://app.waves.house/events/coachella.json", nftWhitelist
        );
        address lollaAddrs = synthRegistry.createSynth(
            false,
            address(0),
            "Lollapalooza Chicago 2024",
            "https://app.waves.house/events/lollapalooza.json",
            emptyWhitelist
        );

        // Add Waves To Synths
        Synth(coachAddrs).addWave(drakeWave);
        Synth(coachAddrs).addWave(taylorSwiftWave);
        Synth(coachAddrs).addWave(badBunnyWave);
        Synth(coachAddrs).addWave(jungleWave);

        Synth(lollaAddrs).addWave(burnaBoyWave);
        Synth(lollaAddrs).addWave(remaWave);
        Synth(lollaAddrs).addWave(toroYMoiWave);
        Synth(lollaAddrs).addWave(jungleWave);

        address coachSynthAccount = Synth(coachAddrs).mint(address(ticket));
        // Synth(lollaAddrs).mint(address(0));

        Wave(badBunnyWave).mint(msg.sender, coachSynthAccount);
        Wave(taylorSwiftWave).mint(msg.sender, coachSynthAccount);

        // Stop Broadcasting Transactions
        vm.stopBroadcast();
    }
}
