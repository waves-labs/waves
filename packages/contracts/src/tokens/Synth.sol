// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SynthToken is ERC721, Pausable, AccessControl {
    event SynthMinted(address indexed owner, address indexed synth, uint256 synthId);

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address private _synthAccountImplementation;

    using Counters for Counters.Counter;

    Counters.Counter private _synthIdCounter;

    constructor(address world, address owner, address synthAccountImplementation, string memory name)
        ERC721(name, "SYNTH")
    {
        _synthAccountImplementation = synthAccountImplementation;

        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(MINTER_ROLE, world);
    }

    function mint(address to) external whenNotPaused onlyRole(MINTER_ROLE) returns (uint256) {
        require(balanceOf(to) == 0, "Synth: already claimed");

        uint256 synthId = _synthIdCounter.current();

        _safeMint(to, synthId);
        _synthIdCounter.increment();

        emit SynthMinted(to, address(this), synthId);

        return synthId;
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
