// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";

import "../src/Synth.sol";

contract SynthTest is Test {
    Synth public synth;

    function setUp() public {
        address[] memory nfts = new address[](0);
        synth =
            new Synth(false, 0x02101dfB77FDE026414827Fdc604ddAF224F0921, address(0), address(1), "Coachella", "", nfts);
    }

    function testMint(address nft) public {
        synth.mint(nft);
    }

    function testSetNFTOwnershipToMint(bool x) public {
        synth.setNFTOwnershipToMint(x);
        // assertEq(synth.nftOwnershipToMint(), x);
    }

    function testAddNFTToWhitelist(address nft) public {
        synth.addToNFTWhitelist(nft);
        // assertEq(synth.nftWhitelist(nft), true);
    }

    function testRemoveNFTFromWhitelist(address nft) public {
        synth.removeFromNFTWhitelist(nft);
        // assertEq(synth.nftWhitelist(nft), false);
    }

    function tessAddWave(address wave) public {
        synth.addWave(wave);
        // assertEq(synth.waveExists(wave), true);
    }

    function testRemoveWave(address wave) public {
        synth.removeWave(wave);
        // assertEq(synth.waveExists(wave), false);
    }
}
