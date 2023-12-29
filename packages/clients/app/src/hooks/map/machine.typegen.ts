// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.scanService": {
      type: "done.invoke.scanService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.scanService": {
      type: "error.platform.scanService";
      data: unknown;
    };
    "xstate.after(1200)#map.scanned": {
      type: "xstate.after(1200)#map.scanned";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    scanService: "done.invoke.scanService";
  };
  missingImplementations: {
    actions: "revealMap";
    delays: never;
    guards: never;
    services: "scanService";
  };
  eventsCausingActions: {
    error: "error.platform.scanService";
    revealMap: "done.invoke.scanService";
    scanned: "done.invoke.scanService";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    scanService: "SCAN";
  };
  matchesStates: "idle" | "scanned" | "scanning";
  tags: never;
}
