import { createMachine, assign } from "xstate";

export interface MapEvent {
  synth: string | null;
  map: string | null;
  mapId: number | null;
  transactionHash: string | null;
}

export interface MapContext extends MapEvent {
  error: string | null;
}

export const mapMachine = createMachine(
  {
    id: "map",
    version: "0.0.1",
    description: "Map machine for collective Maps at IRL experiences.",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./machine.typegen").Typegen0,
    predictableActionArguments: true,
    initial: "idle",
    schema: {
      services: {} as {
        scanService: {
          data: MapEvent;
        };
      },
      context: {
        error: null,
      } as MapContext,
    },
    states: {
      idle: {
        on: {
          SCAN: {
            target: "scanning",
          },
        },
      },
      scanning: {
        invoke: {
          id: "scanService",
          src: "scanService",
          onDone: {
            target: "scanned",
            actions: ["scanned", "revealMap"],
          },
          onError: {
            target: "idle",
            actions: "error",
          },
        },
      },
      scanned: {
        after: {
          1200: "idle",
        },
      },
    },
  },
  {
    actions: {
      scanned: assign((context, event) => {
        context = {
          ...context,
          ...event.data,
          error: null,
        };

        return context;
      }),
      error: assign((context, event) => {
        switch (event.type) {
          case "error.platform.scanService":
            // @ts-ignore
            if (event.data.message !== "No address provided.") {
            }

            // @ts-ignore
            context.error = event.data.message;

            break;

          default:
            break;
        }
        console.log("Error!", context, event);

        return context;
      }),
    },
  },
);
