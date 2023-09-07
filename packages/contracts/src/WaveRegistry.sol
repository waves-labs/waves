// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {Wave} from "./Wave.sol";

contract WaveRegistry is Initializable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    event WaveCreated(
        uint256 startTime,
        uint256 duration,
        address indexed wave,
        address indexed artist,
        address indexed creative,
        string name,
        bytes data
    );

    address public waveResolver;
    mapping(address => bool) public waveExists;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _resolverAddress) external initializer {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        waveResolver = _resolverAddress;
    }

    function createWave(
        uint16 _maxAmount,
        uint256 _startTime,
        uint256 _duration,
        address _artist,
        address _creative,
        string calldata _name,
        bytes calldata _data
    ) external returns (address) {
        Wave wave =
            new Wave(_maxAmount, _startTime, _duration, _artist, _creative, msg.sender, waveResolver, _name, _data);
        address waveAddrs = address(wave);
        waveExists[waveAddrs] = true;

        emit WaveCreated(_startTime, _duration, waveAddrs, _artist, _creative, _name, _data);

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
