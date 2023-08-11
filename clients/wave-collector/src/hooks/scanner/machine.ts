// import { toast } from "react-toastify";
import { createMachine, assign } from "xstate";

export interface ScannerContext {
  transactionHash: string | null;
  error: string | null;
}

export const scannerMachine = createMachine(
  {
    id: "scanner",
    version: "0.0.1",
    description:
      "Scanner machine for generating synths based on your Web3 experiences.",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./machine.typegen").Typegen0,
    predictableActionArguments: true,
    initial: "idle",
    schema: {
      services: {} as {
        scanService: {
          data: {
            stats: any;
          };
        };
      },
      context: {
        address: undefined,
        stats: undefined,
        transactionHash: null,
        error: null,
      } as ScannerContext,
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
        // context.stats = event.data.stats;
        context.error = null;

        return context;
      }),
      error: assign((context, event) => {
        switch (event.type) {
          case "error.platform.scanService":
            // @ts-ignore
            if (event.data.message !== "No address provided.") {
              // @ts-ignore
              context.error = event.data.message;
            }

            break;

          default:
            break;
        }
        console.log("Error!", context, event);

        // toast.error(context.error || "Error with creature generator.");

        return context;
      }),
    },
  },
);
