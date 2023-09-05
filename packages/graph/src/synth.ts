import { store } from "@graphprotocol/graph-ts";

import {
  SynthMinted as SynthMintedEvent,
  WaveAdded as WaveAddedEvent,
  WaveRemoved as WaveRemovedEvent,
} from "../generated/templates/Synth/Synth";
import { Synth, SynthWaveNFT } from "../generated/schema";

export function handleSynthMinted(event: SynthMintedEvent): void {
  let entity = new Synth(event.params.synthAccount);

  entity.owner = event.params.owner;
  // entity.account = event.params.synthAccount;
  entity.contract = event.params.synth;
  entity.tokenId = event.params.synthId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWaveAdded(event: WaveAddedEvent): void {
  let entity = new SynthWaveNFT(
    event.address.concatI32(event.params.wave.toI32())
  );

  entity.synthNft = event.address;
  entity.waveNft = event.params.wave;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWaveRemoved(event: WaveRemovedEvent): void {
  store.remove(
    "SynthWaveNFT",
    event.address.concatI32(event.params.wave.toI32()).toHex()
  );
}
