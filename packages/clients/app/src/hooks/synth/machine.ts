// import { toast } from "react-toastify";
import { createMachine, assign } from "xstate";

export interface SynthContext {
  address?: `0x${string}`;
  error: string | null;
}

export const synthMachine = createMachine(
  {
    id: "synth",
    version: "0.0.1",
    description:
      "Synth machine enabling users to mint a synth and generate art from it",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./machine.typegen").Typegen0,
    predictableActionArguments: true,
    initial: "idle",
    schema: {
      services: {} as {
        mintService: {
          data: { hash: string };
        };
        genArtService: {
          data: {
            tokenAddress: string; // Address of NFT contract
            tokenId: number; // Token ID of NFT
          };
        };
      },
      context: {
        image: null,
        element: null,
        creature: null,
        imageVerified: false,
        error: null,
      } as SynthContext,
    },
    states: {
      idle: {
        on: {
          MINT: {
            target: "minting",
            cond: "isMintValid",
          },
          GENERATE_ART: {
            target: "generatingArt",
            cond: "isGenArtValid",
          },
        },
      },
      minting: {
        invoke: {
          id: "mintService",
          src: "mintService",
          onDone: {
            target: "minted",
            actions: "minted",
          },
          onError: {
            target: "idle",
            actions: ["error", "minted"],
          },
        },
      },
      minted: {
        after: {
          2000: "idle",
        },
      },
      generatingArt: {
        invoke: {
          id: "genArtService",
          src: "genArtService",
          onDone: {
            target: "generatedArt",
            actions: "generatedArt",
          },
          onError: {
            target: "idle",
            actions: "error",
          },
        },
      },
      generatedArt: {
        after: {
          1200: "idle",
        },
      },
    },
  },
  {
    guards: {
      isMintValid: (_context, event: { synth: string }) => {
        return !!event.synth;
      },
      isGenArtValid: (_context, _event: { element: any }) => {
        return true;
      },
    },
    actions: {
      error: assign((context, event) => {
        switch (event.type) {
          case "error.platform.mintService":
            // @ts-ignore
            context.error = event.data.message
              .split("reason:")[1]
              .split("Contract Call")[0]
              .trim();

            break;

          case "error.platform.genArtService":
            // @ts-ignore
            context.error = event.data.message
              .split("reason:")[1]
              .split("Contract Call")[0]
              .trim();

            break;

          default:
            break;
        }

        console.log("Error!", context);

        return context;
      }),
    },
  },
);
