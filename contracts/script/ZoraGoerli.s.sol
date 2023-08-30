// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Script} from "forge-std/Script.sol";

import {Ticket} from "../src/Ticket.sol";
import {SynthRegistry} from "../src/SynthRegistry.sol";
import {SynthGenerator} from "../src/SynthGenerator.sol";

import "../src/Types.sol";
import "../src/Constants.sol";

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
contract ZoraScript is Script {
    function setUp() public {}

    function run() public {
        // read FORGE_PRIVATE_KEY from environment variables
        uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");

        // start broadcast any transaction after this point will be submitted to chain
        vm.startBroadcast(deployerPrivateKey);

        // deploy Tickets
        // Ticket coachellaTicket = new Ticket("Coachella 2024", "COACH", block.timestamp, block.timestamp + 1 days, 100);
        // Ticket lollapaloozaTicket =
        //     new Ticket("Lollapalooza 2024 Chicago 2024", "LOLLA", block.timestamp, block.timestamp + 1 days, 100);

        // coachellaTicket.purchaseTicket();
        // lollapaloozaTicket.purchaseTicket();

        // // console.log("Coachella Ticket deployed at address: %s", address(coachellaTicket));
        // // console.log("Lollapalooza Ticket deployed at address: %s", address(lollapaloozaTicket));

        // // deploy SynthRegistry
        // SynthRegistry synthRegistry = new SynthRegistry();

        // synthRegistry.initialize(ZORA_GOERLI_EAS_ADDRESS);

        // // console.log("SynthRegistry deployed at address: %s", address(synthRegistry));

        // Wave[] memory coachWaves = new Wave[](4);

        // coachWaves[0] = Wave(
        //     0,
        //     100,
        //     0,
        //     block.timestamp,
        //     block.timestamp + 1 days,
        //     bytes("https://waves.syn.art/assets/mocks/burna-boy-wave.png")
        // );
        // coachWaves[1] = Wave(
        //     1,
        //     100,
        //     0,
        //     block.timestamp,
        //     block.timestamp + 1 days,
        //     bytes("https://waves.syn.art/assets/mocks/bad-bunny-wave.png")
        // );
        // coachWaves[2] = Wave(
        //     2,
        //     100,
        //     0,
        //     block.timestamp,
        //     block.timestamp + 1 days,
        //     bytes("https://waves.syn.art/assets/mocks/taylor-swift-wave.png")
        // );
        // coachWaves[3] = Wave(
        //     3,
        //     100,
        //     0,
        //     block.timestamp,
        //     block.timestamp + 1 days,
        //     bytes("https://waves.syn.art/assets/mocks/drake-wave.png")
        // );

        // Wave[] memory lollaWaves = new Wave[](4);

        // lollaWaves[0] = Wave(0, 100, 0, block.timestamp, block.timestamp + 1 days, bytes("#E871DF"));
        // lollaWaves[1] = Wave(1, 100, 0, block.timestamp, block.timestamp + 1 days, bytes("#E77476"));
        // lollaWaves[2] = Wave(2, 100, 0, block.timestamp, block.timestamp + 1 days, bytes("#7671DE"));
        // lollaWaves[3] = Wave(3, 100, 0, block.timestamp, block.timestamp + 1 days, bytes("#6AE2E1"));

        // // deploy SynthGenerators
        // (address coachWavesAddrs, address coachGenerator) = synthRegistry.registerEvent(
        //     1 days, address(coachellaTicket), "https://waves.syn.art/events/coachella-2024-waves.json", coachWaves
        // );
        // (address lollaWavesAddrs, address lollaGenerator) = synthRegistry.registerEvent(
        //     1 days,
        //     address(lollapaloozaTicket),
        //     "https://waves.syn.art/events/lollapalooza-chicago-2024-waves.json",
        //     lollaWaves
        // );

        // // console.log("Coachella SynthGenerator deployed at address: %s", coachGenerator);
        // // console.log("Coachella Waves deployed at address: %s", address(coachWaves));

        // // console.log("Lollapalooza SynthGenerator deployed at address: %s", lollaGenerator);
        // // console.log("Lollapalooza Waves deployed at address: %s", address(lollaWaves));

        // // mint Synth
        // SynthGenerator coachSynthGenerator = SynthGenerator(coachGenerator);

        // address synth = coachSynthGenerator.generateSynth();

        // console.log("Synth minted at address: %s", address(synth));

        // stop broadcasting transactions
        vm.stopBroadcast();
    }
}
