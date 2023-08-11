import { assign } from "xstate";
import { useMachine } from "@xstate/react";
import { createContext, useContext } from "react";

import { SynthContext as SynthMachineContext, synthMachine } from "./machine";

export interface SynthDataProps extends SynthMachineContext {
  isIdle: boolean;
  isMinting: boolean;
  isBurning: boolean;
  mintSynth: (address: string) => void;
  burnSynth: (id: number, address: string) => void;
}

const SynthContext = createContext<SynthDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SynthProvider = ({ children }: Props) => {
  const currentValue = useContext(SynthContext);

  if (currentValue) throw new Error("SynthProvider can only be used once");

  const [state, send] = useMachine(synthMachine, {
    actions: {
      minted: assign((context, event) => {
        context.imageVerified = true;
        context.image = event.data.img;

        const plantDetails = event.data.details;

        if (plantDetails) {
          // context.image &&
          //   handleCreatePlant({
          //     ...plantDetails,
          //     id: `0x${nanoid()}`,
          //     localId: nanoid(),
          //     isUploaded: false,
          //     caretakerAddress: context.address || "0x",
          //     // spaceAddress: "0x",
          //     name: context.plant.common_names[0],
          //     description: plantDetails.wiki_description?.value,
          //     image: context.image ?? context.plant.wiki_image?.value ?? "",
          //     plantId: event.data.plantId,
          //     createdAt: new Date().getMilliseconds(),
          //     updatedAt: new Date().getMilliseconds(),
          //   }).then(() => {
          //     const energy = localStorage.getItem("energy");
          //     if (energy) {
          //       const energyInt = parseInt(energy);
          //       localStorage.setItem("energy", `${energyInt + 4}`);
          //     } else {
          //       localStorage.setItem("energy", "4");
          //     }
          //   });
        }

        return context;
      }),
      burned: assign((context, event) => {
        // context.creature = creature;

        return context;
      }),
    },
  });

  function mintSynth(address: string) {
    send({ type: "MINT", address });
  }

  function burnSynth(id: number, address: string) {
    send({ type: "BURN", id, address });
  }

  return (
    <SynthContext.Provider
      value={{
        isIdle: state.matches("idle"),
        isMinting: state.matches("minting"),
        isBurning: state.matches("burning"),
        mintSynth,
        burnSynth,
        ...state.context,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
};

export const useSynth = () => {
  const value = useContext(SynthContext);
  if (!value) throw new Error("Must be used within a SynthProvider");
  return value;
};
