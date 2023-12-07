// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {getUniqueEntity} from "@latticexyz/world-modules/src/modules/uniqueentity/getUniqueEntity.sol";

import {WaveTypeEnum, TokenTypeEnum, TransferStatusEnum} from "../codegen/common.sol";

import {Owner} from "../codegen/tables/Owner.sol";
import {Artist} from "../codegen/tables/Artist.sol";
import {Creative} from "../codegen/tables/Creative.sol";
import {TransferStatus} from "../codegen/tables/TransferStatus.sol";
import {WaveAttributes, WaveAttributesData} from "../codegen/tables/WaveAttributes.sol";
import {Identity, IdentityData} from "../codegen/tables/Identity.sol";
import {WaveResolverAddrs} from "../codegen/tables/WaveResolverAddrs.sol";
import {WaveContract, WaveContractData} from "../codegen/tables/WaveContract.sol";
import {SynthContract, SynthContractData} from "../codegen/tables/SynthContract.sol";

import "../addressToEntityKey.sol";
import {WaveToken} from "../tokens/Wave.sol";
import {SynthToken} from "../tokens/Synth.sol";
import {SynthAccount} from "../accounts/Synth.sol";
import {NotOwner, NotValidMint, NotValidOwner, MintAlreadyClaimed} from "../Constants.sol";

import {TokenSystem} from "./TokenSystem.sol";

contract WaveSystem is TokenSystem {
    function createWave(
        WaveTypeEnum waveType,
        uint16 max,
        uint256 startTime,
        uint256 duration,
        address artist,
        address creative,
        string calldata name,
        string calldata color
    ) public {
        address owner = _msgSender();

        if (owner != artist || owner != creative) {
            revert NotValidOwner();
        }

        WaveToken wave = new WaveToken(max, address(this), artist, creative, name);

        bytes32 waveId = addressToEntityKey(address(wave));

        Owner.set(waveId, owner);
        Artist.set(waveId, artist);
        Creative.set(waveId, creative);
        Identity.set(waveId, block.timestamp, "");
        TransferStatus.set(waveId, TransferStatusEnum.IDLE);
        WaveContract.set(waveId, waveType, startTime, duration);
        WaveAttributes.set(waveId, 0, 0, color);
    }

    function modifyWave(address wave, uint256 startTime, uint256 duration, string calldata color) public {
        address owner = _msgSender();
        bytes32 waveId = addressToEntityKey(wave);

        if (owner != Owner.get(waveId)) {
            revert NotOwner();
        }

        WaveToken(wave);
        WaveContractData memory waveData = WaveContract.get(waveId);

        // if (maxAmount != 0) {
        //     waveData.maxAmount = maxAmount;
        // }

        if (startTime != 0) {
            waveData.startTime = startTime;
        }

        if (duration != 0) {
            waveData.duration = duration;
        }

        if (bytes(color).length > 0) {
            WaveAttributes.setColor(waveId, color);
        }

        WaveContract.set(waveId, waveData);
    }

    function mintWaveToken(address wave, address synth, address account) public {
        WaveToken waveToken = WaveToken(wave);

        if (waveToken.balanceOf(account) != 0) revert MintAlreadyClaimed();

        SynthAccount synthAccount = SynthAccount(payable(account));

        (, address tokenContract,) = synthAccount.token();

        if (synth != tokenContract) revert NotValidMint();

        WaveContractData memory waveData = WaveContract.get(addressToEntityKey(wave));

        if (waveData.startTime > block.timestamp) revert NotValidMint();
        if (waveData.startTime + waveData.duration < block.timestamp) revert NotValidMint();

        SynthToken(synth);
        SynthContractData memory synthData = SynthContract.get(addressToEntityKey(synth));

        bool hasWave = false;

        for (uint256 i = 0; i < synthData.waveWhitelist.length; i++) {
            if (synthData.waveWhitelist[i] == wave) {
                hasWave = true;
                break;
            }
        }

        if (!hasWave) revert NotValidMint();

        uint256 tokenId = mint(TokenTypeEnum.WAVE, wave, account);

        bytes32 waveId = concatTokenID(wave, tokenId);

        Owner.set(waveId, account);
    }
}
