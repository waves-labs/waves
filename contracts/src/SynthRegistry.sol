// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./Waves.sol";
import "./Types.sol";
import "./Ticket.sol";
import "./SynthGenerator.sol";

contract SynthRegistry is Pausable, Ownable {
    address public easRegistry;
    address[] synthGenerators;
    mapping(address => bool) synthGeneratorRegistered;
    mapping(address => address) synthGeneratorToTicket;

    struct Generator {
        uint256 startTime;
        uint256 endTime;
        address ticket;
        address synthGenerator;
        string eventName;
    }

    constructor(address _easRegistry) {
        easRegistry = _easRegistry;
    }

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

    // Used by WAVES app to get Synth Generators
    function getSynthGenerators() public view returns (Generator[] memory) {
        Generator[] memory generators = new Generator[](synthGenerators.length);

        for (uint256 i = 0; i < synthGenerators.length; i++) {
            Ticket ticket = Ticket(synthGeneratorToTicket[synthGenerators[i]]);

            generators[i] = Generator(
                ticket.startTime(),
                ticket.endTime(),
                synthGeneratorToTicket[synthGenerators[i]],
                synthGenerators[i],
                ticket.name()
            );
        }

        return generators;
    }

    function getAttendeeSynths() public view returns (Generator[] memory) {
        // SynthGenerator synthGenerator = SynthGenerator(_synthGenerator);
        // Ticket ticket = Ticket(synthGenerator.ticket());

        // WaveUI[] memory waves = new WaveUI[](ticket.attendees());

        // for (uint256 i = 0; i < ticket.attendees(); i++) {
        //     waves[i] = WaveUI(ticket.attendeeWaves(i), ticket.attendeeColors(i));
        // }

        // return waves;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
