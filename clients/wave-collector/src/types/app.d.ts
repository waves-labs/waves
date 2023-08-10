declare interface Synth {
  name: string;
  description?: string;
  // createdAt?: number;
}

declare interface Wave {
  localId: string;
  isUploaded: boolean;
}
