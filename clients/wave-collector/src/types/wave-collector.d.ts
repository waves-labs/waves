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
  color: string; // From on chain
  name: string; // From JSON metadata
  artist?: string; // From JSON metadata
  description?: string; // From JSON metadata
  createdAt?: string;
  updatedAt?: string;
}
