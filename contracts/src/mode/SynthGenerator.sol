// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./Ticket.sol";
import "../zora/Synth.sol";

contract SynthGenerator is ERC721, Pausable, Ownable {
    address public ticket;
    address public waves;
    address[] public synths;
    mapping(address => bool) attendeeClaimedSynth;

    constructor(string memory _eventName, string memory _symbol, address _ticket, address _waves)
        ERC721(_eventName, _symbol)
    {
        ticket = _ticket;
        waves = _waves;
    }

    // Used by Attendee to generate Synth (ERC-6551 & Gen Art token)
    function generateSynth(address attendee) public whenNotPaused {
        _safeMint(attendee, 1);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
