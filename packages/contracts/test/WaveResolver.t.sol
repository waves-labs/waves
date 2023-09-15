// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";

import "../src/WaveResolver.sol";

contract WaveResolverTest is Test {
    WaveResolver public waveResolver;

    function setUp() public {
        waveResolver = new WaveResolver(address(0));
    }

    function testAddAttester(address x) public {
        waveResolver.addAttester(x);

        assertEq(waveResolver.attesters(x), true);
    }

    function testRemoveAttester(address x) public {
        waveResolver.removeAttester(x);

        assertEq(waveResolver.attesters(x), false);
    }
}
