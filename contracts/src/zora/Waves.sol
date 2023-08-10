// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import "../mode/Ticket.sol";
import "../Types.sol";
import "./Synth.sol";

contract Waves is ERC1155, Ownable, Pausable, ERC1155Burnable, ERC1155Supply {
    uint256 public postEventClaimTime;
    address public ticket;
    address public easRegistry;
    mapping(uint256 => Wave) public waves;

    constructor(
        uint256 claimTime,
        address _ticket,
        address _eas,
        address _owner,
        Wave[] memory _waves,
        string memory _baseUri
    ) ERC1155(_baseUri) {
        postEventClaimTime = claimTime;
        ticket = _ticket;
        easRegistry = _eas;

        for (uint256 i = 0; i < _waves.length; i++) {
            waves[_waves[i].id] = _waves[i];
        }

        transferOwnership(_owner);
    }

    // Used by Event Organizer to update the event JSON metadata
    function updateEventJSON(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    // Used by Event Organizer to update Waves
    function updateWaves(Wave[] memory _waves) public onlyOwner {
        for (uint256 i = 0; i < _waves.length; i++) {
            waves[_waves[i].id] = _waves[i];
        }
    }

    // Used by Event Organizer to remove Waves
    function removeWaves(uint256[] memory _ids) public onlyOwner {
        for (uint256 i = 0; i < _ids.length; i++) {
            delete waves[_ids[i]];
        }
    }

    // Used by Event Organizer Relayer to mint waves for attendees Synth(ERC-6551)
    function rewardWave(uint256 id, address synth) public onlyOwner whenNotPaused {
        _verifyWaveMint(synth, id);

        _mint(synth, id, 1, "");
    }

    // Used by Attendee's Synth(ERC-6551) to claim waves
    function claimWave(uint256 id) public whenNotPaused {
        _verifyWaveMint(msg.sender, id);

        //TODO: Check Attestation Registry for valid attestation

        _mint(msg.sender, id, 1, "");
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _verifyWaveMint(address to, uint256 id) internal view {
        require(waves[id].id == id, "Waves: wave does not exist");
        require(waves[id].claimedAmount > waves[id].maxAmount, "Waves: waves all claimed");

        require(balanceOf(to, id) == 0, "Waves: user has already claimed");

        Ticket TicketData = Ticket(ticket);

        require(TicketData.balanceOf(to) > 0, "Waves: user has no ticket");

        uint256 startTime = TicketData.startTime();
        require(block.timestamp > startTime, "Waves: event not started");

        uint256 endTime = TicketData.endTime();
        require(block.timestamp < endTime + postEventClaimTime, "Waves: event has ended");
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) onlyOwner whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
