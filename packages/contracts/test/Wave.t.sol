// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";

import "../src/tokens/Wave.sol";

contract WaveTest is Test {
    WaveToken public wave;

    function setUp() public {
        wave =
        new Wave(100, block.timestamp, 100 minutes, address(0), address(1), address(2), address(3), "Burna Boy", "#154206");
    }

    function testMint(address attendee, address account) public {
        wave.mint(attendee, account);
    }

    function testSetStartTime(uint256 x) public {
        wave.setStartTime(x);
        assertEq(wave.startTime(), x);
    }

    function testSetDuration(uint256 x) public {
        wave.setDuration(x);
        assertEq(wave.duration(), x);
    }
}
