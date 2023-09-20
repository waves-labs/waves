// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.genArtService": {
      type: "done.invoke.genArtService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.mintService": {
      type: "done.invoke.mintService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.genArtService": {
      type: "error.platform.genArtService";
      data: unknown;
    };
    "error.platform.mintService": {
      type: "error.platform.mintService";
      data: unknown;
    };
    "xstate.after(1200)#synth.generatedArt": {
      type: "xstate.after(1200)#synth.generatedArt";
    };
    "xstate.after(1200)#synth.minted": {
      type: "xstate.after(1200)#synth.minted";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    genArtService: "done.invoke.genArtService";
    mintService: "done.invoke.mintService";
  };
  missingImplementations: {
    actions: "generatedArt" | "minted";
    delays: never;
    guards: never;
    services: "genArtService" | "mintService";
  };
  eventsCausingActions: {
    error: "error.platform.genArtService" | "error.platform.mintService";
    generatedArt: "done.invoke.genArtService";
    minted: "done.invoke.mintService";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isGenArtValid: "GENERATE_ART";
    isMintValid: "MINT";
  };
  eventsCausingServices: {
    genArtService: "GENERATE_ART";
    mintService: "MINT";
  };
  matchesStates:
    | "generatedArt"
    | "generatingArt"
    | "idle"
    | "minted"
    | "minting";
  tags: never;
}
