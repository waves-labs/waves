// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {System} from "@latticexyz/world/src/System.sol";

import {TokenTypeEnum} from "../codegen/common.sol";

import {ArtToken} from "../tokens/Art.sol";
import {WaveToken} from "../tokens/Wave.sol";
import {SynthToken} from "../tokens/Synth.sol";
import {OrderToken} from "../tokens/Order.sol";

contract TokenSystem is System {
    function mint(TokenTypeEnum tokenType, address token, address to) public returns (uint256) {
        uint256 tokenId;

        if (tokenType == TokenTypeEnum.ART) {
            tokenId = ArtToken(token).mint(to);
        } else if (tokenType == TokenTypeEnum.WAVE) {
            tokenId = WaveToken(token).mint(to);
        } else if (tokenType == TokenTypeEnum.SYNTH) {
            tokenId = SynthToken(token).mint(to);
        } else if (tokenType == TokenTypeEnum.ORDER) {
            tokenId = OrderToken(token).mint(to);
        }

        return tokenId;
    }

    function burn(TokenTypeEnum tokenType, address token, uint256 tokenId) public {
        if (tokenType == TokenTypeEnum.ART) {
            // ArtToken(token).burn(tokenId);
        } else if (tokenType == TokenTypeEnum.WAVE) {
            // WaveToken(token).burn(tokenId);
        } else if (tokenType == TokenTypeEnum.SYNTH) {
            // SynthToken(token).burn(tokenId);
        } else if (tokenType == TokenTypeEnum.ORDER) {
            OrderToken(token).burn(tokenId);
        }
    }
}
