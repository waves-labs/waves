// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";

import "../src/zora/Synth.sol";
import "../src/zora/Waves.sol";
import "../src/zora/WavesResolver.sol";

contract ZoraTest is Test {
    Waves public waves;

    function setUp() public {
        waves = new Wave();
        waves.setNumber(0);
    }

    function testIncrement() public {
        waves.increment();
        assertEq(waves.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        waves.setNumber(x);
        assertEq(waves.number(), x);
    }
}
