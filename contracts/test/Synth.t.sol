// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";

import "../src/Synth.sol";

contract SynthTest is Test {
    Synth public synth;

    function setUp() public {
        synth = new Synth();
        synth.setNumber(0);
    }

    function testIncrement() public {
        synth.increment();
        assertEq(synth.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        synth.setNumber(x);
        assertEq(synth.number(), x);
    }
}
