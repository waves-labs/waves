import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  Initialized,
  OwnershipTransferred,
  Paused,
  SynthGeneratorRegistered,
  Unpaused
} from "../generated/SynthRegistry/SynthRegistry"

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createSynthGeneratorRegisteredEvent(
  synthGenerator: Address,
  ticket: Address,
  owner: Address
): SynthGeneratorRegistered {
  let synthGeneratorRegisteredEvent = changetype<SynthGeneratorRegistered>(
    newMockEvent()
  )

  synthGeneratorRegisteredEvent.parameters = new Array()

  synthGeneratorRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "synthGenerator",
      ethereum.Value.fromAddress(synthGenerator)
    )
  )
  synthGeneratorRegisteredEvent.parameters.push(
    new ethereum.EventParam("ticket", ethereum.Value.fromAddress(ticket))
  )
  synthGeneratorRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return synthGeneratorRegisteredEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
