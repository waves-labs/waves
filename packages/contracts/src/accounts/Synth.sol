// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {AccountV3Upgradable} from "tokenbound/AccountV3Upgradable.sol";
import {Initializable} from "openzeppelin-contracts/proxy/utils/Initializable.sol";

// import {SynthToken} from "../tokens/Synth.sol";

contract SynthAccount is AccountV3Upgradable, Initializable {
    address private _world;

    constructor(
        address world,
        address erc4337EntryPoint,
        address multicallForwarder,
        address erc6551Registry,
        address guardian
    ) AccountV3Upgradable(erc4337EntryPoint, multicallForwarder, erc6551Registry, guardian) {
        _world = world;
    }

    // External functions
    function initialize(uint256 _printAmount, address _organizer) external initializer {
        // purchasesRemaining = _printAmount;
    }
}
