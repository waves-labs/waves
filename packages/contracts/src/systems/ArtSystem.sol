// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {ArtTypeEnum, TransferStatusEnum, TokenTypeEnum} from "../codegen/common.sol";

import {Owner} from "../codegen/tables/Owner.sol";
import {Artist} from "../codegen/tables/Artist.sol";
import {TransferStatus} from "../codegen/tables/TransferStatus.sol";
import {Asset, AssetData} from "../codegen/tables/Asset.sol";
import {Identity, IdentityData} from "../codegen/tables/Identity.sol";
import {ArtContract, ArtContractData} from "../codegen/tables/ArtContract.sol";
import {SynthContract, SynthContractData} from "../codegen/tables/SynthContract.sol";

import "../addressToEntityKey.sol";
import {ArtToken} from "../tokens/Art.sol";
import {SynthToken} from "../tokens/Synth.sol";
import {SynthAccount} from "../accounts/Synth.sol";
import {NotOwner, NotValidMint, MintAlreadyClaimed} from "../Constants.sol";

import {TokenSystem} from "./TokenSystem.sol";

contract ArtSystem is TokenSystem {
    function createArt(
        address artist,
        ArtTypeEnum artType,
        string memory name,
        string memory metadata,
        string memory script,
        string memory image
    ) public {
        address owner = _msgSender();

        ArtToken art = new ArtToken(address(this), owner, name);

        bytes32 artId = addressToEntityKey(address(art));

        Owner.set(artId, owner);
        Artist.set(artId, artist);
        Asset.set(artId, "", image);
        TransferStatus.set(artId, TransferStatusEnum.IDLE);
        Identity.set(artId, block.timestamp, metadata);
        ArtContract.set(artId, artType, script);
    }

    function modifyArt(
        address art,
        ArtTypeEnum artType,
        string memory metadata,
        string memory script,
        string memory image
    ) public {
        address owner = _msgSender();
        bytes32 artId = addressToEntityKey(art);

        if (owner != Owner.get(artId)) {
            revert NotOwner();
        }

        ArtToken(art);
        ArtContractData memory artData = ArtContract.get(artId);

        if (artType != artData.artType) {
            artData.artType = artType;
        }

        if (bytes(metadata).length > 0) {
            Identity.set(artId, Identity.getCreatedAt(artId), metadata);
        }

        if (bytes(script).length > 0) {
            artData.script = script;
        }

        if (bytes(image).length > 0) {
            Asset.set(artId, "", image);
        }
    }

    function mintArtToken(address art, address synth, address account) public {
        address owner = _msgSender();

        ArtToken artToken = ArtToken(art);
        SynthToken synthToken = SynthToken(synth);
        SynthAccount synthAccount = SynthAccount(payable(account));

        if (artToken.balanceOf(owner) != 0) revert MintAlreadyClaimed();
        if (synthToken.balanceOf(owner) != 0) revert MintAlreadyClaimed();

        (, address tokenContract,) = synthAccount.token();

        if (synth != tokenContract) revert NotValidMint();
        if (Owner.get(addressToEntityKey(account)) != owner) revert NotValidMint();

        SynthContractData memory synthData = SynthContract.get(addressToEntityKey(synth));

        for (uint256 i = 0; i < synthData.artWhitelist.length; i++) {
            if (synthData.artWhitelist[i] == art) {
                break;
            }

            if (i == synthData.artWhitelist.length - 1) {
                revert NotValidMint();
            }
        }

        uint256 tokenId = mint(TokenTypeEnum.ART, art, owner);

        bytes32 artId = concatTokenID(art, tokenId);

        Owner.set(artId, owner);
    }
}
