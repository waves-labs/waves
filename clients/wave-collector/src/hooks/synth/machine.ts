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
      "Synth machine for WEFA enabling discovery flow with creature creation.",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./machine.typegen").Typegen0,
    predictableActionArguments: true,
    tags: ["synth", "game", "nature", "critters", "creatures"],
    initial: "idle",
    schema: {
      services: {} as {
        mintService: {
          data: {
            plantId: number;
            details: any | undefined;
            img: string;
          };
        };
        burnService: {
          data: {
            element: any;
            img: string;
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
          BURN: {
            target: "burning",
            cond: "isBurnValid",
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
      burning: {
        invoke: {
          id: "burnService",
          src: "burnService",
          onDone: {
            target: "idle",
            actions: "burned",
          },
          onError: {
            target: "idle",
            actions: "error",
          },
        },
      },
    },
    entry: async (context) => {
      // toast.info("Synth machine entered.");
    },
    // exit: (context, event) => {
    //   console.log("Synth machine exited.", context, event);
    // },
  },
  {
    guards: {
      isMintValid: (_context, event: { image: string | ArrayBuffer }) => {
        return !!event.image;
      },
      isBurnValid: (context, event: { element: any }) => {
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

          case "error.platform.burnService":
            // @ts-ignore
            context.error = event.data.message;
            break;

          default:
            break;
        }
        console.log("Error!", context, event);

        // toast.error(context.error || "Error with creature generator.");

        return context;
      }),
    },
    services: {
      mintService: async (context, event: { image?: string }, _meta) => {
        let image: string | null = context.image;

        if (event.image) {
          image = event.image;
        }

        if (!image) {
          throw new Error("No image provided!");
        }

        // TODO: Add form image upload
        // const formData = new FormData();

        // formData.append("image", image, image.name);

        // const data = {
        //   // Add other parameters here
        // };
        // formData.append("data", JSON.stringify(data));

        try {
          const { data } = await apiClient.post<{ plant: any }>(
            "/plants/detect",
            { image },
          );

          return {
            plantId: data.plant.suggestions[0].id,
            details: data.plant.suggestions[0].plant_details,
            img: image,
          };
        } catch (error) {
          console.log("Photo verification failed!", error);
          throw error;
        }
      },
      burnService: async (context, event: { element?: any }) => {
        try {
          const { data } = await apiClient.post<{ img: string }>(
            "/creatures/synth",
            {
              plant: context,
              element: event.element,
            },
          );

          return { element: "", img: `data:image/png;base64,${data.img}` };
        } catch (error) {
          console.log("Creature generation failed!", error);
          throw error;
        }
      },
    },
  },
);
