import {
  Initialized as InitializedEvent,
  SynthGeneratorRegistered as SynthGeneratorRegisteredEvent,
} from "../generated/SynthRegistry/SynthRegistry";
import { Initialized, SynthGeneratorRegistered } from "../generated/schema";
import { SynthGenerator } from "../generated/templates";

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

export function handleSynthGeneratorRegistered(
  event: SynthGeneratorRegisteredEvent,
): void {
  let entity = new SynthGeneratorRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.synthGenerator = event.params.synthGenerator;
  entity.ticket = event.params.ticket;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  SynthGenerator.create(event.params.synthGenerator);

  entity.save();
}
