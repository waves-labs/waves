// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

function addressToEntityKey(address addr) pure returns (bytes32) {
    return bytes32(uint256(uint160(addr)));
}

function concatTokenID(address addr, uint256 tokenId) pure returns (bytes32) {
    return keccak256(abi.encodePacked(addressToEntityKey(addr), tokenId));
}
