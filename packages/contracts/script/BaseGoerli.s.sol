// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Script} from "forge-std/Script.sol";

/**
 * @title BaseScript
 * @notice Script for deploying Wave Collector Contracts.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy Ticket, SynthGenerator, and SynthRegistry with forge script
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

        // // Deploy & Mint Tickets
        // Ticket coachellaTicket = new Ticket("Coachella 2025", "COACH", block.timestamp, block.timestamp + 1 days, 100);
        // Ticket lollapaloozaTicket =
        //     new Ticket("Lollapalooza 2024 Chicago 2025", "LOLLA", block.timestamp, block.timestamp + 1 days, 100);

        // coachellaTicket.purchaseTicket();
        // lollapaloozaTicket.purchaseTicket();

        // // Deploy SynthGenerators
        // SynthRegistry synthRegistry = SynthRegistry(0xf838aA60315cBa48CDD9F08aAD2Ff76EcFe7FF3C);

        // address coachGenerator = synthRegistry.registerEvent(address(coachellaTicket));
        // address lollaGenerator = synthRegistry.registerEvent(address(lollapaloozaTicket));

        // // Deploy Waves
        // WavesRegistry wavesRegistry = WavesRegistry(0x71596076242B75dc7A1b28d576a444d69192a640);

        // address coachWavesAddrs = wavesRegistry.createWaves(
        //     address(coachellaTicket), "https://waves.syn.art/events/coachella-2024-waves.json"
        // );
        // address lollaWavesAddrs = wavesRegistry.createWaves(
        //     address(lollapaloozaTicket), "https://waves.syn.art/events/lollapalooza-chicago-2024-waves.json"
        // );

        // Wave[] memory coachWaves = new Wave[](4);

        // coachWaves[0] = Wave(0, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("burna-boy"));
        // coachWaves[1] = Wave(1, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("bad-bunny"));
        // coachWaves[2] = Wave(2, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("taylor-swift"));
        // coachWaves[3] = Wave(3, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("drake"));

        // for (uint256 i = 0; i < coachWaves.length; i++) {
        //     Waves(coachWavesAddrs).addWave(coachWaves[i]);
        // }

        // Wave[] memory lollaWaves = new Wave[](4);

        // lollaWaves[0] = Wave(0, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("#E871DF"));
        // lollaWaves[1] = Wave(1, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("#E77476"));
        // lollaWaves[2] = Wave(2, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("#7671DE"));
        // lollaWaves[3] = Wave(3, 100, 0, block.timestamp, block.timestamp + 60 minutes, bytes("#6AE2E1"));

        // for (uint256 i = 0; i < lollaWaves.length; i++) {
        //     Waves(lollaWavesAddrs).addWave(lollaWaves[i]);
        // }

        // // Mint Attendee Synth
        // SynthGenerator coachSynthGenerator = SynthGenerator(coachGenerator);

        // coachSynthGenerator.connectWaves(coachWavesAddrs);
        // coachSynthGenerator.generateSynth();

        // Stop Broadcasting Transactions
        vm.stopBroadcast();
    }
}
