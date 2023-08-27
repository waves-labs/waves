// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {Synth} from "./Synth.sol";

contract SynthRegistry is Initializable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    event SynthCreated(
        bool nftOwnershipNeeded,
        address indexed synth,
        address indexed artist,
        address indexed organizer,
        string name,
        address[] waves
    );

    mapping(address => bool) public synthExists;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Ownable_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
    }

    function createSynth(
        bool _nftOwnershipToMint,
        address _artist,
        bytes memory _data,
        string memory _name,
        address[] memory _nftWhitelist,
        address[] memory _waves
    ) external whenNotPaused returns (address) {
        Synth synth = new Synth(_nftOwnershipToMint, _artist, msg.sender, _name, _nftWhitelist, _waves);

        synthAddrs = address(synth);
        synthExists[synthAddrs] = true;

        emit SynthCreated(_nftOwnershipToMint, synthAddrs, _artist, msg.sender, _name, _waves);

        return synthAddrs;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
