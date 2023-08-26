import { SynthMinted as SynthMintedEvent } from "../generated/templates/SynthGenerator/SynthGenerator";
import { SynthMinted } from "../generated/schema";

export function handleSynthMinted(event: SynthMintedEvent): void {
  let entity = new SynthMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );

  entity.synth = event.params.synth;
  entity.generator = event.params.generator;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
