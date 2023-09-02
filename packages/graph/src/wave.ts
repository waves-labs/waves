import { WaveMinted as WaveMintedEvent } from "../generated/templates/Wave/Wave";
import { WaveMinted } from "../generated/schema";

export function handleWaveMinted(event: WaveMintedEvent): void {
  let entity = new WaveMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.owner = event.params.owner;
  entity.wave = event.params.wave;
  entity.waveId = event.params.waveId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
