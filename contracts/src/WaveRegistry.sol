// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {Wave} from "./Wave.sol";

contract WaveRegistry is Initializable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    event WaveCreated(address indexed wave, address indexed artist, address indexed creative, string name, bytes data);

    mapping(address => bool) public waveExists;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function createWave(address _artist, address _creative, string calldata _name, bytes calldata _data)
        external
        returns (address)
    {
        Wave wave = new Wave(_artist, _creative, msg.sender, _name, _data);
        address waveAddrs = address(wave);
        waveExists[waveAddrs] = true;

        emit WaveCreated(waveAddrs, _artist, _creative, _name, _data);

        return waveAddrs;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
