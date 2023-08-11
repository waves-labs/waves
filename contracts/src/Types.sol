// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

struct Wave {
    uint256 id;
    uint256 maxAmount; // max amount of waves to be minted
    uint256 claimedAmount; // amount of waves claimed
    uint256 startTime; // time to start minting
    uint256 setTime; // length of set in minutes
    bytes32 color; // color of wave for gen art Synth
}

struct WaveUI {
    uint256 id; // ID correlating to JSON metadata
    bytes32 color; // color of wave for gen art Synth
}
