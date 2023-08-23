// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IEAS, Attestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {ISchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/ISchemaResolver.sol";

import "./Synth.sol";
import "./Waves.sol";
import "./Ticket.sol";

/// @title WavesResolver
/// @notice A schema resolver for the Waves event schema
contract WavesResolver is ISchemaResolver, Initializable, OwnableUpgradeable {
    error InvalidEAS();
    error AccessDenied();

    struct EventSchema {
        string eventName;
        address ticketAddress;
        address wavesAddress;
        uint256 waveId;
    }

    IEAS internal _eas;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    modifier onlyEAS() {
        _onlyEAS();

        _;
    }

    function initialize(IEAS eas) external initializer {
        if (address(eas) == address(0)) {
            revert InvalidEAS();
        }

        __Ownable_init();
        _eas = eas;
    }

    function isPayable() external pure override returns (bool) {
        return true;
    }

    function attest(Attestation calldata attestation) external payable override onlyEAS returns (bool) {
        address recipient = attestation.recipient;
        EventSchema memory schema = abi.decode(attestation.data, (EventSchema));

        // TODO Check that recipient is a Synth
        // TODO Check that ticket associated to waves
        // TODO Call rewardWave on Waves (ERC-1155)

        return true;
    }

    function multiAttest(Attestation[] calldata attestations, uint256[] calldata values)
        external
        payable
        override
        onlyEAS
        returns (bool)
    {
        return false;
    }

    function revoke(Attestation calldata attestation) external payable override onlyEAS returns (bool) {
        // TODO: Burn token if minted for attestation
        // TODO: Call burnWave on Waves (ERC-1155)

        return true;
    }

    function multiRevoke(Attestation[] calldata attestations, uint256[] calldata values)
        external
        payable
        override
        onlyEAS
        returns (bool)
    {
        return false;
    }

    function _onlyEAS() private view {
        if (msg.sender != address(_eas)) {
            revert AccessDenied();
        }
    }
}
