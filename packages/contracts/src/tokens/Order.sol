// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract OrderToken is ERC721, Pausable, AccessControl {
    event OrderMinted(address indexed owner, address indexed order, uint256 orderId);
    event OrderBurned(address indexed owner, address indexed order, uint256 orderId);

    using Counters for Counters.Counter;

    Counters.Counter private _orderIdCounter;

    constructor(address world) ERC721("Waves Order", "ORDER") {
        _setupRole(DEFAULT_ADMIN_ROLE, world);
    }

    function mint(address to) external whenNotPaused onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        require(balanceOf(to) == 0, "Order: already claimed");

        uint256 orderId = _orderIdCounter.current();

        _safeMint(to, orderId);
        _orderIdCounter.increment();

        emit OrderMinted(to, address(this), orderId);

        return orderId;
    }

    function burn(uint256 _orderId) external whenNotPaused onlyRole(DEFAULT_ADMIN_ROLE) {
        require(ownerOf(_orderId) != address(0), "Order: not valid order");

        _burn(_orderId);

        emit OrderBurned(msg.sender, address(this), _orderId);
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
