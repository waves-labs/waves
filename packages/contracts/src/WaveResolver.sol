// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {IEAS, Attestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";

import {Wave} from "./Wave.sol";
import {Synth} from "./Synth.sol";
import {SynthAccount} from "./SynthAccount.sol";

import {TEST_DEPLOYER_ADDRESS} from "./Constants.sol";

/// @title WavesResolver
/// @notice A schema resolver for the Waves event schema
contract WaveResolver is SchemaResolver, Initializable, OwnableUpgradeable, UUPSUpgradeable {
    struct WaveSchema {
        address synth;
        address synthAccount;
        address wave;
    }

    mapping(address => bool) attesters;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(address easAddrs) SchemaResolver(IEAS(easAddrs)) {
        _disableInitializers();
        attesters[TEST_DEPLOYER_ADDRESS] = true;
    }

    function initialize() external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function addAttester(address _attester) external {
        attesters[_attester] = true;
    }

    function removeAttester(address _attester) external {
        delete attesters[_attester];
    }

    function isPayable() public pure override returns (bool) {
        return true;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        require(attesters[attestation.attester], "WaveResolver: not valid attester");

        WaveSchema memory schema = abi.decode(attestation.data, (WaveSchema));

        Synth synth = Synth(schema.synth);
        SynthAccount synthAccount = SynthAccount(payable(schema.synthAccount));
        Wave wave = Wave(schema.wave);

        require(synth.balanceOf(attestation.recipient) > 0, "WaveResolver: attendee doesn't own synth");
        require(synthAccount.owner() == attestation.recipient, "WaveResolver: attendee doesn't own synth account");
        require(synth.waveExists(schema.wave), "WaveResolver: synth not associated to wave");
        require(wave.balanceOf(schema.synthAccount) == 0, "WaveResolver: synth account already has wave");

        wave.mint(attestation.recipient, schema.synthAccount);

        return true;
    }

    function onRevoke(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        // TODO: Burn token if minted for attestation
        // TODO: Call burnWave on Wave (ERC-721)

        return true;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
