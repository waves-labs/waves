// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockTicket is ERC721, Pausable, AccessControl, ERC2771Recipient {
    uint256 startTime; // time to start minting
    uint256 duration; // length of set in minutes
    address private organizer;

    using Counters for Counters.Counter;

    Counters.Counter private _waveIdCounter;

    constructor() ERC721("Mock Ticket", "MTK") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint() external {
        uint256 waveId = _waveIdCounter.current();

        _waveIdCounter.increment();
        _mint(msg.sender, waveId);
    }

    function setStartTime(uint256 _startTime) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_startTime > block.timestamp, "Wave: start time must be in the future");

        startTime = _startTime;
    }

    function setDuration(uint256 _duration) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_duration < 1 days, "Wave: duration must be less than 1 day");

        duration = _duration;
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _msgSender() internal view override(Context, ERC2771Recipient) returns (address sender) {
        return super._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Recipient) returns (bytes calldata) {
        return super._msgData();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override whenNotPaused {
        require(from == address(0), "Token is not transferable");
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
