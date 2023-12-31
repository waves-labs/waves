// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class ArtWhitelistAdded extends ethereum.Event {
  get params(): ArtWhitelistAdded__Params {
    return new ArtWhitelistAdded__Params(this);
  }
}

export class ArtWhitelistAdded__Params {
  _event: ArtWhitelistAdded;

  constructor(event: ArtWhitelistAdded) {
    this._event = event;
  }

  get art(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ArtWhitelistRemoved extends ethereum.Event {
  get params(): ArtWhitelistRemoved__Params {
    return new ArtWhitelistRemoved__Params(this);
  }
}

export class ArtWhitelistRemoved__Params {
  _event: ArtWhitelistRemoved;

  constructor(event: ArtWhitelistRemoved) {
    this._event = event;
  }

  get art(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class NFTOwnershipToMintSet extends ethereum.Event {
  get params(): NFTOwnershipToMintSet__Params {
    return new NFTOwnershipToMintSet__Params(this);
  }
}

export class NFTOwnershipToMintSet__Params {
  _event: NFTOwnershipToMintSet;

  constructor(event: NFTOwnershipToMintSet) {
    this._event = event;
  }

  get nftOwnershipToMint(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class NFTWhitelistAdded extends ethereum.Event {
  get params(): NFTWhitelistAdded__Params {
    return new NFTWhitelistAdded__Params(this);
  }
}

export class NFTWhitelistAdded__Params {
  _event: NFTWhitelistAdded;

  constructor(event: NFTWhitelistAdded) {
    this._event = event;
  }

  get nft(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class NFTWhitelistRemoved extends ethereum.Event {
  get params(): NFTWhitelistRemoved__Params {
    return new NFTWhitelistRemoved__Params(this);
  }
}

export class NFTWhitelistRemoved__Params {
  _event: NFTWhitelistRemoved;

  constructor(event: NFTWhitelistRemoved) {
    this._event = event;
  }

  get nft(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RoleAdminChanged extends ethereum.Event {
  get params(): RoleAdminChanged__Params {
    return new RoleAdminChanged__Params(this);
  }
}

export class RoleAdminChanged__Params {
  _event: RoleAdminChanged;

  constructor(event: RoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RoleGranted extends ethereum.Event {
  get params(): RoleGranted__Params {
    return new RoleGranted__Params(this);
  }
}

export class RoleGranted__Params {
  _event: RoleGranted;

  constructor(event: RoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleRevoked extends ethereum.Event {
  get params(): RoleRevoked__Params {
    return new RoleRevoked__Params(this);
  }
}

export class RoleRevoked__Params {
  _event: RoleRevoked;

  constructor(event: RoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class SynthMinted extends ethereum.Event {
  get params(): SynthMinted__Params {
    return new SynthMinted__Params(this);
  }
}

export class SynthMinted__Params {
  _event: SynthMinted;

  constructor(event: SynthMinted) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get synth(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get synthAccount(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get synthId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class WaveAdded extends ethereum.Event {
  get params(): WaveAdded__Params {
    return new WaveAdded__Params(this);
  }
}

export class WaveAdded__Params {
  _event: WaveAdded;

  constructor(event: WaveAdded) {
    this._event = event;
  }

  get wave(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class WaveRemoved extends ethereum.Event {
  get params(): WaveRemoved__Params {
    return new WaveRemoved__Params(this);
  }
}

export class WaveRemoved__Params {
  _event: WaveRemoved;

  constructor(event: WaveRemoved) {
    this._event = event;
  }

  get wave(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Synth extends ethereum.SmartContract {
  static bind(address: Address): Synth {
    return new Synth("Synth", address);
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  artWhitelist(param0: Address): boolean {
    let result = super.call("artWhitelist", "artWhitelist(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_artWhitelist(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("artWhitelist", "artWhitelist(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getTrustedForwarder(): Address {
    let result = super.call(
      "getTrustedForwarder",
      "getTrustedForwarder():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getTrustedForwarder(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getTrustedForwarder",
      "getTrustedForwarder():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isTrustedForwarder(forwarder: Address): boolean {
    let result = super.call(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );

    return result[0].toBoolean();
  }

  try_isTrustedForwarder(forwarder: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mint(_nftOwned: Address): Address {
    let result = super.call("mint", "mint(address):(address)", [
      ethereum.Value.fromAddress(_nftOwned)
    ]);

    return result[0].toAddress();
  }

  try_mint(_nftOwned: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("mint", "mint(address):(address)", [
      ethereum.Value.fromAddress(_nftOwned)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  waveExists(param0: Address): boolean {
    let result = super.call("waveExists", "waveExists(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_waveExists(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("waveExists", "waveExists(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _nftOwnershipToMint(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get _synthAccountImplementation(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _art(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _organizer(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _name(): string {
    return this._call.inputValues[4].value.toString();
  }

  get _metadata(): string {
    return this._call.inputValues[5].value.toString();
  }

  get _nftWhitelist(): Array<Address> {
    return this._call.inputValues[6].value.toAddressArray();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddToArtWhitelistCall extends ethereum.Call {
  get inputs(): AddToArtWhitelistCall__Inputs {
    return new AddToArtWhitelistCall__Inputs(this);
  }

  get outputs(): AddToArtWhitelistCall__Outputs {
    return new AddToArtWhitelistCall__Outputs(this);
  }
}

export class AddToArtWhitelistCall__Inputs {
  _call: AddToArtWhitelistCall;

  constructor(call: AddToArtWhitelistCall) {
    this._call = call;
  }

  get _art(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddToArtWhitelistCall__Outputs {
  _call: AddToArtWhitelistCall;

  constructor(call: AddToArtWhitelistCall) {
    this._call = call;
  }
}

export class AddToNFTWhitelistCall extends ethereum.Call {
  get inputs(): AddToNFTWhitelistCall__Inputs {
    return new AddToNFTWhitelistCall__Inputs(this);
  }

  get outputs(): AddToNFTWhitelistCall__Outputs {
    return new AddToNFTWhitelistCall__Outputs(this);
  }
}

export class AddToNFTWhitelistCall__Inputs {
  _call: AddToNFTWhitelistCall;

  constructor(call: AddToNFTWhitelistCall) {
    this._call = call;
  }

  get _nft(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddToNFTWhitelistCall__Outputs {
  _call: AddToNFTWhitelistCall;

  constructor(call: AddToNFTWhitelistCall) {
    this._call = call;
  }
}

export class AddWaveCall extends ethereum.Call {
  get inputs(): AddWaveCall__Inputs {
    return new AddWaveCall__Inputs(this);
  }

  get outputs(): AddWaveCall__Outputs {
    return new AddWaveCall__Outputs(this);
  }
}

export class AddWaveCall__Inputs {
  _call: AddWaveCall;

  constructor(call: AddWaveCall) {
    this._call = call;
  }

  get _wave(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddWaveCall__Outputs {
  _call: AddWaveCall;

  constructor(call: AddWaveCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get _nftOwned(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class RemoveFromArtWhitelistCall extends ethereum.Call {
  get inputs(): RemoveFromArtWhitelistCall__Inputs {
    return new RemoveFromArtWhitelistCall__Inputs(this);
  }

  get outputs(): RemoveFromArtWhitelistCall__Outputs {
    return new RemoveFromArtWhitelistCall__Outputs(this);
  }
}

export class RemoveFromArtWhitelistCall__Inputs {
  _call: RemoveFromArtWhitelistCall;

  constructor(call: RemoveFromArtWhitelistCall) {
    this._call = call;
  }

  get _art(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveFromArtWhitelistCall__Outputs {
  _call: RemoveFromArtWhitelistCall;

  constructor(call: RemoveFromArtWhitelistCall) {
    this._call = call;
  }
}

export class RemoveFromNFTWhitelistCall extends ethereum.Call {
  get inputs(): RemoveFromNFTWhitelistCall__Inputs {
    return new RemoveFromNFTWhitelistCall__Inputs(this);
  }

  get outputs(): RemoveFromNFTWhitelistCall__Outputs {
    return new RemoveFromNFTWhitelistCall__Outputs(this);
  }
}

export class RemoveFromNFTWhitelistCall__Inputs {
  _call: RemoveFromNFTWhitelistCall;

  constructor(call: RemoveFromNFTWhitelistCall) {
    this._call = call;
  }

  get _nft(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveFromNFTWhitelistCall__Outputs {
  _call: RemoveFromNFTWhitelistCall;

  constructor(call: RemoveFromNFTWhitelistCall) {
    this._call = call;
  }
}

export class RemoveWaveCall extends ethereum.Call {
  get inputs(): RemoveWaveCall__Inputs {
    return new RemoveWaveCall__Inputs(this);
  }

  get outputs(): RemoveWaveCall__Outputs {
    return new RemoveWaveCall__Outputs(this);
  }
}

export class RemoveWaveCall__Inputs {
  _call: RemoveWaveCall;

  constructor(call: RemoveWaveCall) {
    this._call = call;
  }

  get wave(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveWaveCall__Outputs {
  _call: RemoveWaveCall;

  constructor(call: RemoveWaveCall) {
    this._call = call;
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetMetadataURICall extends ethereum.Call {
  get inputs(): SetMetadataURICall__Inputs {
    return new SetMetadataURICall__Inputs(this);
  }

  get outputs(): SetMetadataURICall__Outputs {
    return new SetMetadataURICall__Outputs(this);
  }
}

export class SetMetadataURICall__Inputs {
  _call: SetMetadataURICall;

  constructor(call: SetMetadataURICall) {
    this._call = call;
  }

  get _metadata(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetMetadataURICall__Outputs {
  _call: SetMetadataURICall;

  constructor(call: SetMetadataURICall) {
    this._call = call;
  }
}

export class SetNFTOwnershipToMintCall extends ethereum.Call {
  get inputs(): SetNFTOwnershipToMintCall__Inputs {
    return new SetNFTOwnershipToMintCall__Inputs(this);
  }

  get outputs(): SetNFTOwnershipToMintCall__Outputs {
    return new SetNFTOwnershipToMintCall__Outputs(this);
  }
}

export class SetNFTOwnershipToMintCall__Inputs {
  _call: SetNFTOwnershipToMintCall;

  constructor(call: SetNFTOwnershipToMintCall) {
    this._call = call;
  }

  get _bool(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SetNFTOwnershipToMintCall__Outputs {
  _call: SetNFTOwnershipToMintCall;

  constructor(call: SetNFTOwnershipToMintCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}
