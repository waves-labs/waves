import {
  SynthMinted as SynthMintedEvent,
  WaveAdded as WaveAddedEvent,
  WaveRemoved as WaveRemovedEvent,
} from "../generated/templates/Synth/Synth";
import { SynthMinted } from "../generated/schema";

export function handleSynthMinted(event: SynthMintedEvent): void {
  let entity = new SynthMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.owner = event.params.owner;
  entity.synthAccount = event.params.synthAccount;
  entity.synth = event.params.synth;
  entity.synthId = event.params.synthId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWaveAdded(event: WaveAddedEvent): void {}

export function handleWaveRemoved(event: WaveRemovedEvent): void {}
