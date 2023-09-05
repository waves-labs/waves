import { WaveMinted as WaveMintedEvent } from "../generated/templates/Wave/Wave";
import { Wave, SynthWave } from "../generated/schema";

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

  let synthWave = new SynthWave(
    event.params.owner.concatI32(entity.id.toI32())
  );

  synthWave.synth = event.params.owner;
  synthWave.wave = entity.id;

  synthWave.blockNumber = event.block.number;
  synthWave.blockTimestamp = event.block.timestamp;
  synthWave.transactionHash = event.transaction.hash;

  synthWave.save();
}
