// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {SynthAccount} from "../accounts/Synth.sol";

contract WaveToken is ERC721, Pausable, AccessControl {
    event WaveMinted(address indexed owner, address indexed wave, uint256 indexed waveId);

    uint16 private _maxAmount; // max amount of waves to be minted
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _waveIdCounter;

    constructor(uint16 maxAmount, address world, address artist, address creative, string memory name)
        ERC721(name, "WAVE")
    {
        maxAmount = _maxAmount;

        _setupRole(DEFAULT_ADMIN_ROLE, artist);
        _setupRole(DEFAULT_ADMIN_ROLE, creative);
        _setupRole(MINTER_ROLE, world);
    }

    function mint(address _synthAccount)
        external
        whenNotPaused
        onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        require(_waveIdCounter.current() < _maxAmount, "Wave: max amount minted");
        require(balanceOf(_synthAccount) == 0, "Wave: already claimed");

        uint256 waveId = _waveIdCounter.current();

        _waveIdCounter.increment();
        _mint(_synthAccount, waveId);

        emit WaveMinted(_synthAccount, address(this), waveId);

        return waveId;
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

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        virtual
        override
    {
        require(from == address(0), "Err: token transfer is BLOCKED");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
