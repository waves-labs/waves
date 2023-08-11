import { useMachine } from "@xstate/react";
import React, { useState, createContext, useContext } from "react";

import { useMint } from "../useMint";

import {
  ScannerContext as ScannerMachineContext,
  scannerMachine,
} from "./machine";

export interface ScannerState {
  isIdle: boolean;
  isScanning: boolean;
}

export interface ScannerDataProps extends ScannerMachineContext, ScannerState {
  scan: () => void;
  address?: `0x${string}`;
  artFlipped: boolean;
  setFlippedArt: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScannerContext = createContext<ScannerDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ScannerProvider = ({ children }: Props) => {
  const currentValue = useContext(ScannerContext);

  if (currentValue) throw new Error("ScannerProvider can only be used once");

  const [artFlipped, setFlippedArt] = useState(false);
  const { address, writeAsync, openConnectModal } = useMint();
  const [state, send] = useMachine(scannerMachine, {
    actions: {
      revealWave: () => {
        setFlippedArt(true);
      },
    },
    services: {
      scanService: async () => {
        if (!address) {
          openConnectModal && openConnectModal();
          throw new Error("No address provided.");
        }

        try {
          const data = await writeAsync?.();

          if (!data) {
            throw new Error("No stats returned from getStats.");
          }

          return {
            stats: data,
          };
        } catch (error) {
          throw error;
        }
      },
    },
  });

  function scan() {
    if (state.matches("idle")) send("SCAN");
  }

  return (
    <ScannerContext.Provider
      value={{
        scan,
        artFlipped,
        setFlippedArt,
        isIdle: state.matches("idle"),
        isScanning: state.matches("scanning"),
        ...state.context,
      }}
    >
      {children}
    </ScannerContext.Provider>
  );
};

export const useScanner = (): ScannerDataProps => {
  const [artFlipped, setFlippedArt] = useState(false);
  const { address, writeAsync, openConnectModal } = useMint();
  const [state, send] = useMachine(scannerMachine, {
    actions: {
      revealWave: () => {
        setFlippedArt(true);
      },
    },
    services: {
      scanService: async () => {
        if (!address) {
          openConnectModal && openConnectModal();
          throw new Error("No address provided.");
        }

        try {
          const data = await writeAsync?.();

          if (!data) {
            throw new Error("No stats returned from getStats.");
          }

          return {
            stats: data,
          };
        } catch (error) {
          throw error;
        }
      },
    },
  });

  function scan() {
    if (state.matches("idle")) send("SCAN");
  }

  return {
    ...state.context,
    isIdle: state.matches("idle"),
    isScanning: state.matches("scanning"),
    scan,
    address,
    artFlipped,
    setFlippedArt,
  };
};
