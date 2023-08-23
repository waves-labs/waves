// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

struct Wave {
    uint16 id;
    uint16 maxAmount; // max amount of waves to be minted
    uint16 claimedAmount; // amount of waves claimed
    uint256 startTime; // time to start minting
    uint256 setTime; // length of set in minutes
    bytes data; // data of wave for gen art Synth
}
