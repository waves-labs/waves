// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {getUniqueEntity} from "@latticexyz/world-modules/src/modules/uniqueentity/getUniqueEntity.sol";

import {SynthTypeEnum, TransferStatusEnum, TokenTypeEnum} from "../codegen/common.sol";

import {Owner} from "../codegen/tables/Owner.sol";
import {Organizer} from "../codegen/tables/Organizer.sol";
import {TransferStatus} from "../codegen/tables/TransferStatus.sol";
import {Identity, IdentityData} from "../codegen/tables/Identity.sol";
import {SynthAccountImplAddrs} from "../codegen/tables/SynthAccountImplAddrs.sol";
import {SynthContract, SynthContractData} from "../codegen/tables/SynthContract.sol";

import "../addressToEntityKey.sol";
import {TBALib} from "../lib/TBA.sol";
import {ArtToken} from "../tokens/Art.sol";
import {WaveToken} from "../tokens/Wave.sol";
import {SynthToken} from "../tokens/Synth.sol";
import {SynthAccount} from "../accounts/Synth.sol";
import {NotOwner, NotValidMint} from "../Constants.sol";

import {TokenSystem} from "./TokenSystem.sol";

error AlreadyExists();

contract SynthSystem is TokenSystem {
    function createSynth(
        SynthTypeEnum synthType,
        address organizer,
        string memory name,
        string memory metadata,
        address[] memory artWhitelist,
        address[] memory waveWhitelist,
        address[] memory ticketWhitelist
    ) external {
        address owner = _msgSender();

        SynthToken synth = new SynthToken(address(this), owner,  SynthAccountImplAddrs.get(), name);

        address synthAddrs = address(synth);
        bytes32 synthId = addressToEntityKey(synthAddrs);

        Owner.set(synthId, owner);
        Organizer.set(synthId, organizer);
        Identity.set(synthId, block.timestamp, metadata);
        TransferStatus.set(synthId, TransferStatusEnum.IDLE);
        SynthContract.set(synthId, synthType, artWhitelist, waveWhitelist, ticketWhitelist);
    }

    function modifySynth(address synth, SynthTypeEnum synthType, string memory metadata) public {
        address owner = _msgSender();
        bytes32 synthId = addressToEntityKey(synth);

        if (owner != Owner.get(synthId)) {
            revert NotOwner();
        }

        SynthToken(synth);
        SynthContractData memory synthData = SynthContract.get(synthId);

        if (bytes(metadata).length > 0) {
            Identity.set(synthId, Identity.getCreatedAt(synthId), metadata);
        }

        if (synthType != synthData.synthType) {
            synthData.synthType = synthType;
        }

        SynthContract.set(synthId, synthData);
    }

    function mintSynthToken(address synth, address ticket) public {
        bytes32 synthId = addressToEntityKey(synth);

        SynthContractData memory synthData = SynthContract.get(synthId);

        if (synthData.ticketWhitelist.length > 0) {
            bool hasTicket = false;

            for (uint256 i = 0; i < synthData.ticketWhitelist.length; i++) {
                if (synthData.ticketWhitelist[i] == ticket) {
                    hasTicket = true;
                    break;
                }
            }

            if (!hasTicket) {
                revert NotValidMint();
            }
        }

        uint256 tokenId = mint(TokenTypeEnum.WAVE, synth, _msgSender());

        address synthAccount = TBALib.createAccount(SynthAccountImplAddrs.get(), synth, tokenId);

        SynthAccount(payable(synthAccount)).initialize(7, Organizer.get(synthId));

        Owner.set(addressToEntityKey(synthAccount), _msgSender());
    }

    function addToArtWhitelist(address synth, address art) public {
        address owner = _msgSender();
        bytes32 synthId = addressToEntityKey(synth);

        if (owner != Owner.get(synthId)) {
            revert NotOwner();
        }

        ArtToken(art);

        SynthContractData memory synthData = SynthContract.get(synthId);
        address[] memory newArtWhitelist = new address[](synthData.artWhitelist.length + 1);

        for (uint256 i = 0; i < synthData.artWhitelist.length; i++) {
            if (synthData.artWhitelist[i] == art) {
                revert AlreadyExists();
            }

            newArtWhitelist[i] = synthData.artWhitelist[i];
        }

        newArtWhitelist[synthData.artWhitelist.length] = art;
        synthData.artWhitelist = newArtWhitelist;

        SynthContract.set(synthId, synthData);
    }

    function removeFromArtWhitelist(address synth, address art) public {
        address owner = _msgSender();
        bytes32 synthId = addressToEntityKey(synth);

        if (owner != Owner.get(synthId)) {
            revert NotOwner();
        }

        ArtToken(art);
        SynthContractData memory synthData = SynthContract.get(synthId);

        for (uint256 i = 0; i < synthData.artWhitelist.length; i++) {
            if (synthData.artWhitelist[i] == art) {
                delete synthData.artWhitelist[i];
                break;
            }
        }

        SynthContract.set(synthId, synthData);
    }

    function addToTicketWhitelist(address synth, address ticket) public {
        address owner = _msgSender();
        bytes32 synthId = addressToEntityKey(synth);

        if (owner != Owner.get(synthId)) {
            revert NotOwner();
        }

        // ERC721(ticket);

        SynthContractData memory synthData = SynthContract.get(synthId);
        address[] memory newTicketWhitelist = new address[](synthData.ticketWhitelist.length + 1);

        for (uint256 i = 0; i < synthData.ticketWhitelist.length; i++) {
            if (synthData.ticketWhitelist[i] == ticket) {
                revert AlreadyExists();
            }

            newTicketWhitelist[i] = synthData.ticketWhitelist[i];
        }

        newTicketWhitelist[synthData.ticketWhitelist.length] = ticket;
        synthData.ticketWhitelist = newTicketWhitelist;

        SynthContract.set(synthId, synthData);
    }

    function removeFromTicketWhitelist(address synth, address ticket) public {
        address owner = _msgSender();
        bytes32 synthId = addressToEntityKey(synth);

        if (owner != Owner.get(synthId)) {
            revert NotOwner();
        }

        // ERC721(ticket);
        SynthContractData memory synthData = SynthContract.get(synthId);

        for (uint256 i = 0; i < synthData.ticketWhitelist.length; i++) {
            if (synthData.ticketWhitelist[i] == ticket) {
                delete synthData.ticketWhitelist[i];
                break;
            }
        }

        SynthContract.set(synthId, synthData);
    }

    function addWave(address synth, address wave) public {
        address owner = _msgSender();
        bytes32 synthId = addressToEntityKey(synth);

        if (owner != Owner.get(synthId)) {
            revert NotOwner();
        }

        WaveToken(wave);

        SynthContractData memory synthData = SynthContract.get(synthId);
        address[] memory newWaveWhitelist = new address[](synthData.waveWhitelist.length + 1);

        for (uint256 i = 0; i < synthData.waveWhitelist.length; i++) {
            if (synthData.waveWhitelist[i] == wave) {
                revert AlreadyExists();
            }

            newWaveWhitelist[i] = synthData.waveWhitelist[i];
        }

        newWaveWhitelist[synthData.waveWhitelist.length] = wave;
        synthData.waveWhitelist = newWaveWhitelist;
        SynthContract.set(synthId, synthData);
    }

    function removeWave(address synth, address wave) public {
        address owner = _msgSender();
        bytes32 synthId = addressToEntityKey(synth);

        if (owner != Owner.get(synthId)) {
            revert NotOwner();
        }

        WaveToken(wave);
        SynthContractData memory synthData = SynthContract.get(synthId);

        for (uint256 i = 0; i < synthData.waveWhitelist.length; i++) {
            if (synthData.waveWhitelist[i] == wave) {
                delete synthData.waveWhitelist[i];
                break;
            }
        }

        SynthContract.set(synthId, synthData);
    }
}
