// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

import {Ticket} from "./Ticket.sol";
import {Waves, Wave} from "./Waves.sol";

contract WavesRegistry is Initializable, PausableUpgradeable, OwnableUpgradeable {
    event WavesMinted(address indexed waves, address indexed ticket, address indexed owner);

    mapping(address => bool) public wavesRegistered;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Pausable_init();
        __Ownable_init();
    }

    function createWaves(address _ticketAddrs, string calldata _baseUri) external onlyOwner returns (address) {
        Ticket ticket = Ticket(_ticketAddrs);
        require(ticket.owner() == msg.sender, "must be ticket owner");
        require(!wavesRegistered[_ticketAddrs], "already registered");

        Waves waves = new Waves(_ticketAddrs, _baseUri);
        address wavesAddrs = address(waves);

        wavesRegistered[_ticketAddrs] = true;

        emit WavesMinted(wavesAddrs, _ticketAddrs, msg.sender);

        return (wavesAddrs);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
