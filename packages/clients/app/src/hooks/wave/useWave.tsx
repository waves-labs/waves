import { useMachine } from "@xstate/react";
import { useNavigate } from "react-router-dom";
import React, { createContext, useContext } from "react";

import {
  WaveEvent,
  WaveContext as WaveMachineContext,
  waveMachine,
} from "./machine";
import { apiClient } from "../../modules/axios";

export interface WaveState {
  isIdle: boolean;
  isScanning: boolean;
}

export interface WaveDataProps extends WaveMachineContext, WaveState {
  scan: (synth: string, synthAccount: string, wave: string) => void;
}

const WaveContext = createContext<WaveDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const WaveProvider = ({ children }: Props) => {
  const currentValue = useContext(WaveContext);

  if (currentValue) throw new Error("WaveProvider can only be used once");

  const navigate = useNavigate();

  const [state, send] = useMachine(waveMachine, {
    actions: {
      revealWave: (_context, event) => {
        navigate(`/synths/${event.data.synth}?wave=${event.data.wave}`);
      },
    },
    services: {
      scanService: async (
        _context,
        event: { synth: string; synthAccount: string; wave: string },
      ) => {
        try {
          const { data } = await apiClient.post<WaveEvent>(
            "/waves/claim",
            {
              synth: event.synth,
              synthAccount: event.synthAccount,
              wave: event.wave,
            },
            {
              withCredentials: true,
            },
          );

          if (!data) {
            throw new Error("Error catching wave, try again.");
          }

          return {
            synth: data.synth,
            wave: data.wave,
            waveId: data.waveId,
            transactionHash: data.transactionHash,
          };
        } catch (error) {
          throw error;
        }
      },
    },
  });

  function scan(synth: string, synthAccount: string, wave: string) {
    if (state.matches("idle")) send("SCAN", { synth, synthAccount, wave });
  }

  return (
    <WaveContext.Provider
      value={{
        scan,
        isIdle: state.matches("idle"),
        isScanning: state.matches("scanning"),
        ...state.context,
      }}
    >
      {children}
    </WaveContext.Provider>
  );
};

export const useWave = (): WaveDataProps => {
  const context = useContext(WaveContext);

  if (!context) {
    throw new Error("useWave must be used within a WaveProvider");
  }

  return context;
};