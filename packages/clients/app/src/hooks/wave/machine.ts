import { createMachine, assign } from "xstate";

export interface WaveEvent {
  synth: string | null;
  wave: string | null;
  waveId: number | null;
  transactionHash: string | null;
}

export interface WaveContext extends WaveEvent {
  error: string | null;
}

export const waveMachine = createMachine(
  {
    id: "wave",
    version: "0.0.1",
    description: "Wave machine for collective Waves at IRL experiences.",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./machine.typegen").Typegen0,
    predictableActionArguments: true,
    initial: "idle",
    schema: {
      services: {} as {
        scanService: {
          data: WaveEvent;
        };
      },
      context: {
        error: null,
      } as WaveContext,
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
            target: "idle",
            actions: ["scanned", "revealWave"],
          },
          onError: {
            target: "idle",
            actions: "error",
          },
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
