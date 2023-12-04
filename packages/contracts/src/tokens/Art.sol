// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ArtToken is ERC721, Pausable, AccessControl {
    event ArtMinted(address indexed owner, address indexed art, uint256 artId);

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _artIdCounter;

    constructor(address world, address artist, string memory name) ERC721(name, "ART") {
        _setupRole(DEFAULT_ADMIN_ROLE, artist);
        _setupRole(MINTER_ROLE, world);
    }

    function mint(address to) external whenNotPaused onlyRole(MINTER_ROLE) returns (uint256) {
        require(balanceOf(to) == 0, "Art: already claimed");

        uint256 artId = _artIdCounter.current();

        _safeMint(to, artId);
        _artIdCounter.increment();

        emit ArtMinted(to, address(this), artId);

        return artId;
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
}
