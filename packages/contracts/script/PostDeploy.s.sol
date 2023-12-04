// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {Create2} from "openzeppelin-contracts/utils/Create2.sol";
import {AccountGuardian} from "tokenbound/AccountGuardian.sol";

import {IWorld} from "../src/codegen/world/IWorld.sol";
import {OrderToken} from "../src/tokens/Order.sol";
import {SynthAccount} from "../src/accounts/Synth.sol";
import {WaveResolver} from "../src/resolvers/Wave.sol";
import {TOKENBOUND_REGISTRY} from "../src/Constants.sol";

contract PostDeploy is Script {
    function run(address worldAddress) external {
        bytes32 salt = 0x655165516551655165516551655165516551655165516551655165516557;
        address factory = 0x4e59b44847b379578588920cA78FbF26c0B4956C;

        address wefaSafe = 0x3F35aC99149fD564f9a3f5eC78d146aeE1db7387;
        address erc4337EntryPoint = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
        address multicallForwarder = 0xcA1167915584462449EE5b4Ea51c37fE81eCDCCD;

        address guardian = Create2.computeAddress(
            salt, keccak256(abi.encodePacked(type(AccountGuardian).creationCode, abi.encode(wefaSafe))), factory
        );

        address synthImplementation = Create2.computeAddress(
            salt,
            keccak256(
                abi.encodePacked(
                    type(SynthAccount).creationCode,
                    abi.encode(worldAddress, erc4337EntryPoint, multicallForwarder, TOKENBOUND_REGISTRY, guardian)
                )
            ),
            factory
        );

        address synthProxy = Create2.computeAddress(
            salt,
            keccak256(abi.encodePacked(type(AccountProxy).creationCode, abi.encode(guardian, synthImplementation))),
            factory
        );

        address orderToken = Create2.computeAddress(
            salt, keccak256(abi.encodePacked(type(OrderToken).creationCode, abi.encode(worldAddress))), factory
        );

        address waveResolver = Create2.computeAddress(
            salt,
            keccak256(abi.encodePacked(type(WaveResolver).creationCode, abi.encode(EAS_OP, worldAddress))),
            factory
        );

        // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Deploy AccountGuardian
        if (guardian.code.length == 0) {
            vm.startBroadcast(deployerPrivateKey);
            new AccountGuardian{salt: salt}(wefaSafe);
            vm.stopBroadcast();

            console.log("AccountGuardian:", guardian, "(deployed)");
        } else {
            console.log("AccountGuardian:", guardian, "(exists)");
        }

        // Deploy Synth Account Implementation
        if (synthImplementation.code.length == 0) {
            vm.startBroadcast(deployerPrivateKey);
            new SynthAccount{salt: salt}(
                erc4337EntryPoint,
                multicallForwarder,
                TOKENBOUND_REGISTRY,
                guardian
            );
            vm.stopBroadcast();

            console.log("SynthImplementation:", synthImplementation, "(deployed)");
        } else {
            console.log("SynthImplementation:", synthImplementation, "(exists)");
        }

        // Deploy Synth Account Proxy
        if (synthProxy.code.length == 0) {
            vm.stsynthBroadcast(deployerPrivateKey);
            new SynthAccount{salt: salt}(guardian, synthImplementation);
            vm.stopBroadcast();

            console.log("SynthAccount:", synthProxy, "(deployed)");
        } else {
            console.log("SynthAccount:", synthProxy, "(exists)");
        }

        // Deploy Order Token
        if (orderToken.code.length == 0) {
            vm.startBroadcast(deployerPrivateKey);
            new OrderToken{salt: salt}( worldAddress, orderImplementation );
            vm.stopBroadcast();

            console.log("OrderToken:", orderToken, "(deployed)");
        } else {
            console.log("OrderToken:", orderToken, "(exists)");
        }

        // Deploy Wave Resolver
        if (waveResolver.code.length == 0) {
            vm.startBroadcast(deployerPrivateKey);
            new WaveResolver{salt: salt}( worldAddress, orderImplementation );
            vm.stopBroadcast();

            console.log("WaveResolver:", waveResolver, "(deployed)");
        } else {
            console.log("WaveResolver:", waveResolver, "(exists)");
        }

        vm.startBroadcast(deployerPrivateKey);

        IWorld(worldAddress).init(orderToken, waveResolver, synthImplementation);
        uint32 newValue = IWorld(worldAddress).increment();
        console.log("Increment via IWorld:", newValue);

        vm.stopBroadcast();
    }
}
