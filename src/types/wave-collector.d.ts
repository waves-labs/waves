type EventName = "coachella-2024" | "lollapalooza-chicago-2024";
type Artist =
  | "burna-boy"
  | "bad-bunny"
  | "drake"
  | "taylor-swift"
  | "wizkid"
  | "kendrick-lamar"
  | "sza";

declare interface Synth {
  address: string; // Synth Account Address
  tokenAddress: string; // Synth ERC-721 Address
  tokenId: number; // Synth Token ID
  eventName: string; // From on chain - ex. Coachella 2024
  image?: string; // From JSON metadata
  waves: Wave[];
  createdAt?: string;
  updatedAt?: string;
}

declare interface Wave {
  id: number; // Wave Token ID
  wavesAddress: string; // Waves ERC-1155 Address
  data: string; // From on chain either image url or color
  artist: Artist; // From JSON metadata
  // name: string; // From JSON metadata
  description?: string; // From JSON metadata
  createdAt?: string;
  updatedAt?: string;
}
