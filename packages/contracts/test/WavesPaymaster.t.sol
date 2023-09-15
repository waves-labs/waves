// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";

import "../src/WavesPaymaster.sol";

contract WavesPaymasterTest is Test {
    WavesPaymaster public wavesPaymaster;

    function setUp() public {
        wavesPaymaster = new WavesPaymaster();
    }

    function testAddWhitelistSender(address x) public {
        wavesPaymaster.whitelistSender(x, true);

        assertEq(wavesPaymaster.senderWhitelist(x), true);
    }

    function testRemoveWhitelistSender(address x) public {
        wavesPaymaster.whitelistSender(x, false);

        assertEq(wavesPaymaster.senderWhitelist(x), false);
    }

    function testAddWhitelistTarget(address x) public {
        wavesPaymaster.whitelistTarget(x, true);

        assertEq(wavesPaymaster.targetWhitelist(x), true);
    }

    function testRemoveWhitelistTarget(address x) public {
        wavesPaymaster.whitelistTarget(x, false);

        assertEq(wavesPaymaster.targetWhitelist(x), false);
    }

    function testAddWhitelistMethod(address x, bytes4 method) public {
        wavesPaymaster.whitelistMethod(x, method, true);

        assertEq(wavesPaymaster.methodWhitelist(x, method), true);
    }

    function testRemoveWhitelistMethod(address x, bytes4 method) public {
        wavesPaymaster.whitelistMethod(x, method, false);

        assertEq(wavesPaymaster.methodWhitelist(x, method), false);
    }
}
