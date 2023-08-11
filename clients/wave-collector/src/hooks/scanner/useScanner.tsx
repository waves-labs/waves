import { useMachine } from "@xstate/react";
import React, { createContext, useContext } from "react";

import {
  ScannerEvent,
  ScannerContext as ScannerMachineContext,
  scannerMachine,
} from "./machine";
import { apiClient } from "../../modules/axios";

export interface ScannerState {
  isIdle: boolean;
  isScanning: boolean;
}

export interface ScannerDataProps extends ScannerMachineContext, ScannerState {
  scan: () => void;
}

const ScannerContext = createContext<ScannerDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ScannerProvider = ({ children }: Props) => {
  const currentValue = useContext(ScannerContext);

  if (currentValue) throw new Error("ScannerProvider can only be used once");

  const [state, send] = useMachine(scannerMachine, {
    actions: {
      revealWave: () => {
        // Navigate to the synths tab and show the synth with the new wave
      },
    },
    services: {
      scanService: async () => {
        try {
          const { data } = await apiClient.post<ScannerEvent>("/waves/claim", {
            synth: "0x0",
            wave: "0x0",
          });

          if (!data) {
            throw new Error("Error catching wave, try again.");
          }

          return {
            artist: data.artist,
            eventName: data.eventName,
            tokenAddress: data.tokenAddress,
            tokenId: data.tokenId,
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
  const context = useContext(ScannerContext);

  if (!context) {
    throw new Error("useScanner must be used within a ScannerProvider");
  }

  return context;
};
