// import { toast } from "react-toastify";
import { createMachine, assign } from "xstate";

import { apiClient } from "../../modules/axios";

export interface SynthContext {
  address?: `0x${string}`;
  image: string | null;
  imageVerified: boolean;
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
          data: {
            synthAddress: string; // Address of synth
            tokenAddress: string; // Address of NFT contract
            tokenId: number; // Token ID of NFT
          };
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
            target: "generating",
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
      generating: {
        invoke: {
          id: "genArtService",
          src: "genArtService",
          onDone: {
            target: "idle",
            actions: "generated",
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
      isMintValid: (_context, event: { image: string | ArrayBuffer }) => {
        return !!event.image;
      },
      isGenArtValid: (context, event: { element: any }) => {
        return !!context.image && !!event.element;
      },
    },
    actions: {
      error: assign((context, event) => {
        switch (event.type) {
          case "error.platform.mintService":
            context.imageVerified = false;
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
    services: {
      mintService: async (
        context,
        event: { generatorAddrs?: string },
        _meta,
      ) => {
        try {
          const { data } = await apiClient.post<{ plant: any }>(
            "/plants/detect",
            {},
          );

          return {
            synthAddress: "",
            tokenAddress: "",
            tokenId: 0,
          };
        } catch (error) {
          console.log("Synth minting failed!", error);
          throw error;
        }
      },
      genArtService: async (context, event: { element?: any }) => {
        try {
          const { data } = await apiClient.post<{ img: string }>(
            "/creatures/synth",
            {
              plant: context,
              element: event.element,
            },
          );

          return {
            tokenAddress: "",
            tokenId: 0,
          };
        } catch (error) {
          console.log("Art generation failed!", error);
          throw error;
        }
      },
    },
  },
);
