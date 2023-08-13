import { useMachine } from "@xstate/react";
import { useNavigate } from "react-router-dom";
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
  scan: (synth: string, eventName: string, artist: string) => void;
}

const ScannerContext = createContext<ScannerDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ScannerProvider = ({ children }: Props) => {
  const currentValue = useContext(ScannerContext);

  if (currentValue) throw new Error("ScannerProvider can only be used once");

  const navigate = useNavigate();

  const [state, send] = useMachine(scannerMachine, {
    actions: {
      revealWave: (_context, event) => {
        navigate(`/synths/${event.data.synth}?wave=${event.data.tokenId}`);
      },
    },
    services: {
      scanService: async (
        _context,
        event: { synth: string; eventName: string; artist: string },
      ) => {
        try {
          const { data } = await apiClient.post<ScannerEvent>("/waves/claim", {
            synth: event.synth,
            eventName: event.eventName,
            artist: event.artist,
          });

          if (!data) {
            throw new Error("Error catching wave, try again.");
          }

          return {
            synth: data.synth,
            tokenAddress: data.tokenAddress,
            tokenId: data.tokenId,
          };
        } catch (error) {
          throw error;
        }
      },
    },
  });

  function scan(synth: string, eventName: string, artist: string) {
    if (state.matches("idle")) send("SCAN", { synth, eventName, artist });
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
