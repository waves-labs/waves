// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IEAS, Attestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";

import "./Synth.sol";
import "./Waves.sol";
import "./Ticket.sol";

/// @title WavesResolver
/// @notice A schema resolver for the Waves event schema
contract WavesResolver is SchemaResolver {
    struct EventSchema {
        string eventName;
        address ticketAddress;
        address wavesAddress;
        uint256 waveId;
    }

    address private immutable _targetAttester;

    constructor(IEAS eas, address targetAttester) SchemaResolver(eas) {
        _targetAttester = targetAttester;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        address recipient = attestation.recipient;
        EventSchema memory schema = abi.decode(attestation.data, (EventSchema));

        // TODO Check that recipient is a Synth
        // TODO Check that ticket associated to waves
        // TODO Call rewardWave on Waves (ERC-1155)

        return true;
    }

    function onRevoke(Attestation calldata, /*attestation*/ uint256 /*value*/ ) internal pure override returns (bool) {
        // TODO: Burn token if minted for attestation
        // TODO: Call burnWave on Waves (ERC-1155)

        return true;
    }
}
