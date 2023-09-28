import {
  WaveMinted as WaveMintedEvent,
  DurationUpdated as DurationUpdatedEvent,
  StartTimeUpdated as StartTimeUpdatedEvent,
} from "../generated/templates/Wave/Wave";
import { WaveNFT, Wave, SynthWave } from "../generated/schema";
import { store } from "@graphprotocol/graph-ts";

export function handleWaveMinted(event: WaveMintedEvent): void {
  let entity = new Wave(
    event.params.wave.concatI32(event.params.waveId.toI32())
  );
  entity.owner = event.params.owner; // synth account address
  entity.contract = event.params.wave;
  entity.tokenId = event.params.waveId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let synthWave = new SynthWave(event.params.owner.concat(entity.id));

  synthWave.synth = event.params.owner;
  synthWave.wave = entity.id;

  synthWave.blockNumber = event.block.number;
  synthWave.blockTimestamp = event.block.timestamp;
  synthWave.transactionHash = event.transaction.hash;

  synthWave.save();
}

export function handleStartTimeUpdated(event: StartTimeUpdatedEvent): void {
  // const entity = store.get(
  //   "WaveNFT",
  //   event.address.toHexString()
  // ) as WaveNFT | null;
  // if (!entity) {
  //   return;
  // }
  // entity.startTime = event.params.startTime; // synth account address
  // store.set("WaveNFT", event.address.toHexString(), entity);
}

export function handleDurationUpdated(event: DurationUpdatedEvent): void {
  const entity = store.get(
    "WaveNFT",
    event.address.toHexString()
  ) as WaveNFT | null;

  if (!entity) {
    return;
  }

  entity.duration = event.params.duration; // synth account address

  store.set("WaveNFT", event.address.toHexString(), entity);
}
