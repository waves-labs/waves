// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {IEAS, Attestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";

import "./Synth.sol";
import "./Wave.sol";

/// @title WavesResolver
/// @notice A schema resolver for the Waves event schema
contract WaveResolver is SchemaResolver, Initializable, OwnableUpgradeable, UUPSUpgradeable {
    struct WaveSchema {
        address synthAddrs;
        address synthAccountAddrs;
        address waveAddrs;
        bool canMint;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(IEAS eas) SchemaResolver(eas) {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function isPayable() public pure override returns (bool) {
        return true;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        address recipient = attestation.recipient;
        WaveSchema memory schema = abi.decode(attestation.data, (WaveSchema));

        // TODO Check if valid attester
        // TODO Check that recipient is synth owner
        // TODO Check that synthAccountAddrs is a Synth
        // TODO Check that waveAddrs is a Wave
        // TODO Check that synth associated to wave
        // TODO Call mint on Wave (ERC-721)

        return true;
    }

    function onRevoke(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        // TODO: Burn token if minted for attestation
        // TODO: Call burnWave on Wave (ERC-721)

        return true;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
