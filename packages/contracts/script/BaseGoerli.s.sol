// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Script} from "forge-std/Script.sol";

import {Synth} from "../src/Synth.sol";
import {SynthRegistry} from "../src/SynthRegistry.sol";
import {WaveRegistry} from "../src/WaveRegistry.sol";
import {MockTicket} from "../src/mocks/MockTicket.sol";

/**
 * @title BaseScript
 * @notice Script for deploying Wave Collector Contracts.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script s used to deploy Ticket, SynthGenerator, and SynthRegistry with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/Ticket.s.sol:Deploy --rpc-url http://localhost:8545 --broadcast -vvv
 * @dev Scripts can be used for development and testing, but they are not required for production.
 */
contract BaseScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");

        // Start Broadcasting Transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Waves with Wave Registry
        WaveRegistry waveRegistry = WaveRegistry(0x61d4F4D4a1fab9f1ba3e5e193bfDa9C89B8c3D0E);

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
        SynthRegistry synthRegistry = SynthRegistry(0xCd571Fd48ea82bc8F4CFeF7bc1EB325464B4abA6);

        address[] memory nftWhitelist = new address[](1);
        address[] memory emptyWhitelist = new address[](0);

        nftWhitelist[0] = address(ticket);

        address coachAddrs = synthRegistry.createSynth(true, address(0), "Coachella", nftWhitelist);
        address lollaAddrs = synthRegistry.createSynth(false, address(0), "Lollapalooza", emptyWhitelist);

        // Add Waves To Synths
        Synth(coachAddrs).addWave(drakeWave);
        Synth(coachAddrs).addWave(taylorSwiftWave);
        Synth(coachAddrs).addWave(badBunnyWave);
        Synth(coachAddrs).addWave(jungleWave);

        Synth(lollaAddrs).addWave(burnaBoyWave);
        Synth(lollaAddrs).addWave(remaWave);
        Synth(lollaAddrs).addWave(toroYMoiWave);
        Synth(lollaAddrs).addWave(jungleWave);

        // Stop Broadcasting Transactions
        vm.stopBroadcast();
    }
}
