// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {SynthAccount} from "./SynthAccount.sol";

contract Wave is ERC721, Pausable, AccessControl, ERC2771Recipient {
    event WaveMinted(address indexed owner, address indexed wave, uint256 indexed waveId);
    event StartTimeUpdated(uint256 indexed startTime);
    event DurationUpdated(uint256 indexed duration);

    uint16 private maxAmount; // max amount of waves to be minted
    uint256 public startTime; // time to start minting
    uint256 public duration; // length of set in minutes
    address public artist;
    address public creative;
    string public data;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _waveIdCounter;

    constructor(
        uint16 _maxAmount,
        uint256 _startTime,
        uint256 _duration,
        address _artist,
        address _creative,
        address _admin,
        address _resolver,
        string memory _name,
        string memory _data
    ) ERC721(_name, "WAVE") {
        maxAmount = _maxAmount;
        startTime = _startTime;
        duration = _duration;
        artist = _artist;
        creative = _creative;
        data = _data;

        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        _setupRole(MINTER_ROLE, _admin);
        _setupRole(MINTER_ROLE, _resolver);
    }

    function mint(address _attendee, address _synthAccount) external onlyRole(MINTER_ROLE) {
        require(block.timestamp >= startTime, "Wave: minting hasn't started yet");
        require(block.timestamp <= startTime + duration, "Wave: minting has ended");
        require(_waveIdCounter.current() < maxAmount, "Wave: max amount minted");
        require(balanceOf(_synthAccount) == 0, "Wave: already claimed");
        require(SynthAccount(payable(_synthAccount)).owner() == _attendee, "Wave: attendee doesn't own synth account");

        uint256 waveId = _waveIdCounter.current();

        _waveIdCounter.increment();
        _mint(_synthAccount, waveId);

        emit WaveMinted(_synthAccount, address(this), waveId);
    }

    function setStartTime(uint256 _startTime) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_startTime > block.timestamp, "Wave: start time must be in the future");

        startTime = _startTime;

        emit StartTimeUpdated(_startTime);
    }

    function setDuration(uint256 _duration) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_duration < 1 days, "Wave: duration must be less than 1 day");

        duration = _duration;

        emit DurationUpdated(_duration);
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
