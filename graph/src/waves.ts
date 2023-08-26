import { WaveRewarded as WaveRewardedEvent } from "../generated/templates/Waves/Waves";
import { WaveRewarded } from "../generated/schema";

export function handleWaveRewarded(event: WaveRewardedEvent): void {
  let entity = new WaveRewarded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );

  entity.to = event.params.to;
  entity.waves = event.params.waves;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
