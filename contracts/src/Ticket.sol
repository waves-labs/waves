// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ticket is ERC721, Pausable, Ownable {
    event TicketMinted(address indexed to, uint256 indexed tokenId, address indexed ticket);

    uint256 public startTime;
    uint256 public endTime;
    uint256 private maxSupply;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory _eventName,
        string memory _symbol,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _maxSupply
    ) ERC721(_eventName, _symbol) {
        startTime = _startTime;
        endTime = _endTime;
        maxSupply = _maxSupply;
    }

    // Used by Event Organizer to reserve tickets for VIPs
    function reserveTicket(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        emit TicketMinted(to, tokenId, address(this));
    }

    // Used by Attendee to purchase tickets
    function purchaseTicket() public payable whenNotPaused {
        // require(msg.value == 0.0001 ether, "Ticket: must send 1 ether");
        require(block.timestamp < endTime, "Ticket: event has ended");
        require(_tokenIdCounter.current() <= maxSupply, "Ticket: sold out");
        require(balanceOf(msg.sender) == 0, "Ticket: already claimed");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        emit TicketMinted(msg.sender, tokenId, address(this));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
