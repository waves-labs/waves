// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

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
        string metadata
    );

    address public synthAccountImplementation;
    mapping(address => bool) public synthExists;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _synthAccountImplementationt) external initializer {
        __Ownable_init();
        __Pausable_init();
        __UUPSUpgradeable_init();

        synthAccountImplementation = _synthAccountImplementationt;
    }

    function createSynth(
        bool _nftOwnershipToMint,
        address _art,
        string memory _name,
        string memory _metadata,
        address[] memory _nftWhitelist
    ) external whenNotPaused returns (address) {
        Synth synth =
        new Synth(_nftOwnershipToMint, synthAccountImplementation, _art, msg.sender, _name, _metadata, _nftWhitelist);

        address synthAddrs = address(synth);
        synthExists[synthAddrs] = true;

        emit SynthCreated(_nftOwnershipToMint, synthAddrs, _art, msg.sender, _name, _metadata);

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
