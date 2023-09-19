import { Order } from "../generated/schema";
import {
  PrintPurchased as PrintPurchasedEvent,
  PalettePurchased as PalettePurchasedEvent,
} from "../generated/templates/SynthAccount/SynthAccount";

export function handlePrintPurchased(event: PrintPurchasedEvent): void {
  let entity = new Order(
    event.params.art.concatI32(event.params.orderId.toI32())
  );

  const style = event.params.style;

  entity.synth = event.address;
  entity.art = event.params.art;
  entity.artTokenId = event.params.tokenId;
  entity.orderId = event.params.orderId;
  entity.type = "Print";
  entity.good =
    style === 0
      ? "SHIRT"
      : style === 1
      ? "HOODIE"
      : style === 2
      ? "HAT"
      : style === 3
      ? "DASHIKI"
      : style === 4
      ? "PANTS"
      : style === 5
      ? "BLANKET"
      : style === 6
      ? "POSTER"
      : null;
  entity.buyer = event.params.buyer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePalletePurchased(event: PalettePurchasedEvent): void {
  let entity = new Order(
    event.params.art.concatI32(event.params.orderId.toI32())
  );

  const palette = event.params.palette;

  entity.synth = event.address;
  entity.art = event.params.art;
  entity.artTokenId = event.params.tokenId;
  entity.orderId = event.params.orderId;
  entity.type = "Palette";
  entity.good =
    palette === 0
      ? "MARKER"
      : palette === 1
      ? "CRAYON"
      : palette === 2
      ? "PENCIL"
      : null;
  entity.buyer = event.params.buyer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
