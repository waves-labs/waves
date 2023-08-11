// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.burnService": {
      type: "done.invoke.burnService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.mintService": {
      type: "done.invoke.mintService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.burnService": {
      type: "error.platform.burnService";
      data: unknown;
    };
    "error.platform.mintService": {
      type: "error.platform.mintService";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    burnService: "done.invoke.burnService";
    mintService: "done.invoke.mintService";
  };
  missingImplementations: {
    actions: "burned" | "minted";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    burned: "done.invoke.burnService";
    error: "error.platform.burnService" | "error.platform.mintService";
    minted: "done.invoke.mintService";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isBurnValid: "BURN";
    isMintValid: "MINT";
  };
  eventsCausingServices: {
    burnService: "BURN";
    mintService: "MINT";
  };
  matchesStates: "burning" | "idle" | "minting";
  tags: "creatures" | "critters" | "game" | "nature" | "synth";
}
