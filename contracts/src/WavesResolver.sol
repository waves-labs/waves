// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IEAS, Attestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";

import "./Synth.sol";
import "./Waves.sol";
import "./Ticket.sol";

/// @title WavesResolver
/// @notice A schema resolver for the Waves event schema
contract WavesResolver is SchemaResolver, Initializable, OwnableUpgradeable {
    struct EventSchema {
        string eventName;
        address ticketAddress;
        address wavesAddress;
        uint256 waveId;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(IEAS eas) SchemaResolver(eas) {
        _disableInitializers();
    }

    function initialize(IEAS eas) external initializer {
        __Ownable_init();
    }

    function isPayable() public pure override returns (bool) {
        return true;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        address recipient = attestation.recipient;
        EventSchema memory schema = abi.decode(attestation.data, (EventSchema));

        // TODO Check that recipient is a Synth
        // TODO Check that ticket associated to waves
        // TODO Call rewardWave on Waves (ERC-1155)

        return true;
    }

    function onRevoke(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        // TODO: Burn token if minted for attestation
        // TODO: Call burnWave on Waves (ERC-1155)

        return true;
    }
}
