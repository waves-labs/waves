// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "../Types.sol";
import "../zora/Waves.sol";

import "./Ticket.sol";
import "./SynthGenerator.sol";

contract SynthRegistry is Pausable, Ownable {
    address public easRegistry;
    address[] synthGenerators;
    mapping(address => bool) synthGeneratorRegistered;
    mapping(address => address) synthGeneratorToTicket;

    // Used by Event Organizer to register a Synth Generator for attendees to mint Synths
    function registerEvent(uint256 _claimTime, address _ticketAddrs, string calldata _baseUri, Wave[] calldata _waves)
        public
        whenNotPaused
        returns (address, address)
    {
        Ticket ticket = Ticket(_ticketAddrs);
        require(ticket.owner() == msg.sender, "SynthRegistry: must be ticket owner");
        require(!synthGeneratorRegistered[_ticketAddrs], "SynthRegistry: already registered");

        Waves waves = new Waves(_claimTime, _ticketAddrs, easRegistry, msg.sender, _waves, _baseUri);
        SynthGenerator synthGenerator = new SynthGenerator(_ticketAddrs, address(waves), msg.sender, ticket.name());

        synthGenerators.push(address(synthGenerator));
        synthGeneratorRegistered[_ticketAddrs] = true;
        synthGeneratorToTicket[address(synthGenerator)] = _ticketAddrs;

        return (address(waves), address(synthGenerator));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
