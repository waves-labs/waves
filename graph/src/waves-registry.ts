import {
  Initialized as InitializedEvent,
  WavesMinted as WavesMintedEvent,
} from "../generated/WavesRegistry/WavesRegistry";
import { Initialized, WavesMinted } from "../generated/schema";
import { Waves } from "../generated/templates";

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.version = event.params.version;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWavesMinted(event: WavesMintedEvent): void {
  let entity = new WavesMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.waves = event.params.waves;
  entity.ticket = event.params.ticket;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  Waves.create(event.params.waves);

  entity.save();
}
