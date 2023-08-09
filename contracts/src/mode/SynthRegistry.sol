// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./Ticket.sol";
import "./SynthGenerator.sol";
import "../zora/Waves.sol";

// TODO: SynthRegistry should be a singleton and upgradable
contract SynthRegistry is Pausable, Ownable {
    address[] synthGenerators;
    mapping(address => bool) synthGeneratorRegistered;
    mapping(address => address) synthGeneratorToTicket;

    // Used by Event Organizer to register a Synth Generator for attendees to mint Synths
    function registerEvent(address ticketAddrs) public {
        Ticket ticket = Ticket(ticketAddrs);
        require(ticket.owner() == msg.sender, "SynthRegistry: must be ticket owner");
        require(!synthGeneratorRegistered[ticketAddrs], "SynthRegistry: already registered");

        // TODO: deploy SynthGenerator

        // TODO: deploy Waves contract
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
