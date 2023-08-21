// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

import {Ticket} from "./Ticket.sol";
import {SynthGenerator} from "./SynthGenerator.sol";

contract SynthRegistry is Initializable, PausableUpgradeable, OwnableUpgradeable {
    event SynthGeneratorRegistered(address indexed synthGenerator, address indexed ticket, address indexed owner);

    mapping(address => bool) public synthGeneratorRegistered;
    mapping(address => address) public synthGeneratorToTicket;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Pausable_init();
        __Ownable_init();
    }

    function registerEvent(address _ticketAddrs) external whenNotPaused returns (address) {
        Ticket ticket = Ticket(_ticketAddrs);
        require(ticket.owner() == msg.sender, "must be ticket owner");
        require(!synthGeneratorRegistered[_ticketAddrs], "already registered");

        SynthGenerator synthGenerator = new SynthGenerator(_ticketAddrs, msg.sender, ticket.name());
        address synthGenAddrs = address(synthGenerator);

        synthGeneratorRegistered[_ticketAddrs] = true;
        synthGeneratorToTicket[synthGenAddrs] = _ticketAddrs;

        emit SynthGeneratorRegistered(synthGenAddrs, _ticketAddrs, msg.sender);

        return (synthGenAddrs);
    }

    // Used by WAVES app to get Synth Generators - TODO add events and use The Graph
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
