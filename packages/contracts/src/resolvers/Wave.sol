// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {IEAS, Attestation} from "eas-contracts/IEAS.sol";
import {SchemaResolver} from "eas-contracts/resolver/SchemaResolver.sol";
import "openzeppelin-contracts/proxy/utils/UUPSUpgradeable.sol";
import "openzeppelin-contracts-upgradeable/access/OwnableUpgradeable.sol";

import {IWorld} from "../codegen/world/IWorld.sol";

import {WaveToken} from "../tokens/Wave.sol";
import {SynthToken} from "../tokens/Synth.sol";
import {SynthAccount} from "../accounts/Synth.sol";

/// @title WaveResolver
/// @notice A schema resolver for the Waves event schema
contract WaveResolver is SchemaResolver, Initializable, OwnableUpgradeable, UUPSUpgradeable {
    struct WaveSchema {
        address wave;
        address synth;
        address synthAccount;
        string claimPoint;
    }

    address private _world;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(address easAddrs, address world) SchemaResolver(IEAS(easAddrs)) {
        _disableInitializers();

        _world = world;
    }

    function initialize() external initializer {
        __Ownable_init();
    }

    function isPayable() public pure override returns (bool) {
        return true;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/ )
        internal
        override
        onlyOwner
        returns (bool)
    {
        require(attestation.attester == owner(), "WaveResolver: only owner can revoke");

        WaveSchema memory schema = abi.decode(attestation.data, (WaveSchema));

        WaveToken wave = WaveToken(schema.wave);
        SynthToken synth = SynthToken(schema.synth);
        SynthAccount synthAccount = SynthAccount(payable(schema.synthAccount));

        require(synth.balanceOf(attestation.recipient) > 0, "WaveResolver: attendee doesn't own synth");
        require(synthAccount.owner() == attestation.recipient, "WaveResolver: attendee doesn't own synth account");
        require(wave.balanceOf(schema.synthAccount) == 0, "WaveResolver: synth account already has wave");

        IWorld(_world).mintWaveToken(schema.wave, schema.synth, schema.synthAccount);

        return true;
    }

    function onRevoke(Attestation calldata attestation, uint256 /*value*/ )
        internal
        view
        override
        onlyOwner
        returns (bool)
    {
        require(attestation.attester == owner(), "WaveResolver: only owner can revoke");

        return true;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
