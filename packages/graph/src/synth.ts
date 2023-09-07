import { store } from "@graphprotocol/graph-ts";

import {
  SynthMinted as SynthMintedEvent,
  WaveAdded as WaveAddedEvent,
  WaveRemoved as WaveRemovedEvent,
  NFTWhitelistAdded as NFTWhitelistAddedEvent,
  NFTWhitelistRemoved as NFTWhitelistRemovedEvent,
  NFTOwnershipToMintSet as NFTOwnershipToMintSetEvent,
} from "../generated/templates/Synth/Synth";
import { Synth, SynthNFT, SynthWaveNFT } from "../generated/schema";

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

export function handleNftOwnershipToMintUpdated(
  event: NFTOwnershipToMintSetEvent
): void {
  const entity = store.get(
    "SynthNFT",
    event.address.toHexString()
  ) as SynthNFT | null;

  if (!entity) {
    return;
  }

  entity.nftOwnershipRequired = event.params.nftOwnershipToMint;

  entity.save();
}

export function handleWaveAdded(event: WaveAddedEvent): void {
  let entity = new SynthWaveNFT(event.address.concat(event.params.wave));

  entity.synthNft = event.address;
  entity.waveNft = event.params.wave;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWaveRemoved(event: WaveRemovedEvent): void {
  store.remove("SynthWaveNFT", event.address.concat(event.params.wave).toHex());
}

export function handleWhitelistNftAdded(event: NFTWhitelistAddedEvent): void {
  const entity = store.get(
    "SynthNFT",
    event.address.toHexString()
  ) as SynthNFT | null;

  if (!entity) {
    return;
  }

  entity.nftWhitelist = entity.nftWhitelist.concat([event.params.nft]);

  store.set("SynthNFT", event.address.toHexString(), entity);
}

export function handleWhitelistNftRemoved(
  event: NFTWhitelistRemovedEvent
): void {
  const entity = store.get(
    "SynthNFT",
    event.address.toHexString()
  ) as SynthNFT | null;

  if (!entity) {
    return;
  }

  // const nft = event.params.nft;

  // const newWhitelist = entity.nftWhitelist.filter((data) => data !== nft);

  // entity.nftWhitelist = newWhitelist;

  store.set("SynthNFT", event.address.toHexString(), entity);
}
