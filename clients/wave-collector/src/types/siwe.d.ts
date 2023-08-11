declare module "siwe" {
  export class SiweMessage {
    constructor(options: any);
    prepareMessage(): string;
  }
}
