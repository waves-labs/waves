// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  DataSourceTemplate,
  DataSourceContext
} from "@graphprotocol/graph-ts";

export class SynthGenerator extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("SynthGenerator", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "SynthGenerator",
      [address.toHex()],
      context
    );
  }
}

export class Waves extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("Waves", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext("Waves", [address.toHex()], context);
  }
}
