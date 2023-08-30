// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

// import "highlight/erc721/ERC721SingleEdition.sol";
import "@opengsn/contracts/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {WAVE_RESOLVER_ADDRESS} from "./Constants.sol";

contract Wave is ERC721, Pausable, AccessControl {
    event WaveMinted(address indexed owner, address indexed wave, uint256 indexed waveId);

    uint16 maxAmount; // max amount of waves to be minted
    uint256 startTime; // time to start minting
    uint256 duration; // length of set in minutes
    address private artist;
    address private creative;
    bytes public data;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _waveIdCounter;

    constructor(address _artist, address _creative, address _admin, string memory _name, bytes memory _data)
        ERC721(_name, "WAVE")
    {
        artist = _artist;
        creative = _creative;
        data = _data;

        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        _setupRole(MINTER_ROLE, _admin);
        _setupRole(MINTER_ROLE, WAVE_RESOLVER_ADDRESS);
    }

    function mint(address to) external onlyRole(MINTER_ROLE) {
        // require(block.timestamp > startTime && block.timestamp < endTime, "Waves: event not active");

        uint256 waveId = _waveIdCounter.current();

        _waveIdCounter.increment();
        _mint(to, waveId);

        emit WaveMinted(to, address(this), waveId);
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

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
