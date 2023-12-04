// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {getUniqueEntity} from "@latticexyz/world-modules/src/modules/uniqueentity/getUniqueEntity.sol";

import {OrderTypeEnum, TransferStatusEnum, TokenTypeEnum} from "../codegen/common.sol";

import {Owner} from "../codegen/tables/Owner.sol";
import {WavesAddrs} from "../codegen/tables/WavesAddrs.sol";
import {Token, TokenData} from "../codegen/tables/Token.sol";
import {Order, OrderData} from "../codegen/tables/Order.sol";
import {TransferStatus} from "../codegen/tables/TransferStatus.sol";
import {OrderTokenAddrs} from "../codegen/tables/OrderTokenAddrs.sol";
import {Identity, IdentityData} from "../codegen/tables/Identity.sol";
import {ArtContract, ArtContractData} from "../codegen/tables/ArtContract.sol";

import "../addressToEntityKey.sol";
import {OrderToken} from "../tokens/Order.sol";

import {TokenSystem} from "./TokenSystem.sol";

error NotWavesAccount();

contract OrderSystem is TokenSystem {
    function createOrder(OrderTypeEnum orderType, bytes32 artId, address owner, string memory metadata) public {
        if (_msgSender() != WavesAddrs.get()) {
            revert NotWavesAccount();
        }

        address order = OrderTokenAddrs.get();

        uint256 tokenId = mint(TokenTypeEnum.ORDER, order, owner);
        bytes32 orderId = concatTokenID(order, tokenId);

        Owner.set(orderId, owner);
        Order.set(orderId, orderType, artId);
        Token.set(orderId, tokenId, order, address(0));
        Identity.set(orderId, block.timestamp, metadata);
        TransferStatus.set(orderId, TransferStatusEnum.IDLE);
    }

    function modifyOrder(bytes32 orderId, TransferStatusEnum transferStatus, string memory metadata) public {
        if (_msgSender() != WavesAddrs.get()) {
            revert NotWavesAccount();
        }

        TransferStatusEnum currentStatus = TransferStatus.get(orderId);

        if (currentStatus != transferStatus) {
            TransferStatus.set(orderId, transferStatus);
        }

        if (bytes(metadata).length > 0) {
            IdentityData memory identity = Identity.get(orderId);

            identity.metadata = metadata;

            Identity.set(orderId, identity);
        }
    }

    function cancelOrder(bytes32 orderId) public {
        if (_msgSender() != WavesAddrs.get()) {
            revert NotWavesAccount();
        }

        TokenData memory tokenData = Token.get(orderId);

        burn(TokenTypeEnum.ORDER, tokenData.addrs, tokenData.id);

        OrderData memory orderData = Order.get(orderId);

        TransferStatus.set(orderId, TransferStatusEnum.CANCELLED);
        Order.set(orderId, orderData);
    }

    // function purchasePrint(Order memory _order) external returns (uint256, uint256) {
    //     require(_isValidSigner(_msgSender(), ""), "Invalid signer");
    //     require(purchasesRemaining > 0, "No prints remaining");

    //     (, address synth,) = token();

    //     // bool artWhitelisted = SynthToken(synth).artWhitelist(_order.art);

    //     // require(artWhitelisted, "Art not whitelisted");

    //     // uint256 tokenId = IERC721GeneralMint(_order.art).mintOneToOneRecipient(_msgSender());
    //     // TODO: Send order ro Market Contract

    //     --purchasesRemaining;

    //     emit PrintPurchased(_msgSender(), _order.art, 0, 0, _order.style);

    //     return (0, 0);
    // }

    // function purchasePalette(address _art, PaletteEnum _palette) external returns (uint256, uint256) {
    //     require(_isValidSigner(_msgSender(), ""), "Invalid signer");
    //     require(!artPalettePurchased[_palette], "Palette already purchased");

    //     (, address synth,) = token();

    //     // bool artWhitelisted = SynthToken(synth).artWhitelist(_art);

    //     // require(artWhitelisted, "Art not whitelisted");

    //     // uint256 tokenId = IERC721GeneralMint(_art).mintOneToOneRecipient(_msgSender());
    //     // TODO: Send order ro Market Contract

    //     --purchasesRemaining;
    //     artPalettePurchased[_palette] = true;

    //     emit PalettePurchased(_msgSender(), _art, 0, 0, _palette);

    //     return (0, 0);
    // }
}
