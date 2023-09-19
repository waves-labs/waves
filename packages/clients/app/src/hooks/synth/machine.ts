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
            target: "idle",
            actions: "minted",
          },
          onError: {
            target: "idle",
            actions: "error",
          },
        },
      },
      generatingArt: {
        invoke: {
          id: "genArtService",
          src: "genArtService",
          onDone: {
            target: "idle",
            actions: "generatedArt",
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
    guards: {
      isMintValid: (_context, _event: { image: string | ArrayBuffer }) => {
        return true;
      },
      isGenArtValid: (_context, _event: { element: any }) => {
        return true;
      },
    },
    actions: {
      error: assign((context, event) => {
        switch (event.type) {
          case "error.platform.mintService":
            // context.imageVerified = false;
            // context.image = null;

            // @ts-ignore
            context.error = event.data.message;
            break;

          case "error.platform.genArtService":
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
