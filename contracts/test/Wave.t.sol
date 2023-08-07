// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";

import "../src/Wave.sol";

contract WaveTest is Test {
    Wave public wave;

    function setUp() public {
        wave = new Wave();
        wave.setNumber(0);
    }

    function testIncrement() public {
        wave.increment();
        assertEq(wave.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        wave.setNumber(x);
        assertEq(wave.number(), x);
    }
}
