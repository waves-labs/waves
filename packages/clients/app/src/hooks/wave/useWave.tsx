import { useMachine } from "@xstate/react";
import { useNavigate } from "react-router-dom";
import React, { createContext, useContext } from "react";

import { apiClient } from "../../modules/axios";

import { useWaves } from "../providers/waves";

import { WaveContext as WaveMachineContext, waveMachine } from "./machine";

export interface WaveState {
  isIdle: boolean;
  isScanning: boolean;
  isScanned: boolean;
}

export interface WaveDataProps extends WaveMachineContext, WaveState {
  scan: (synth: string, synthAccount: string, wave: string) => void;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const WaveContext = createContext<WaveDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const WaveProvider = ({ children }: Props) => {
  const currentValue = useContext(WaveContext);

  if (currentValue) throw new Error("WaveProvider can only be used once");

  const navigate = useNavigate();
  const { fetchSynths } = useWaves();

  const [state, send] = useMachine(waveMachine, {
    actions: {
      revealWave: async (_context, event) => {
        await wait(1000);
        navigate(`/synths/${event.data.synth}`);
      },
    },
    services: {
      scanService: async (
        _context,
        event: { synth: string; synthAccount: string; wave: string },
      ) => {
        try {
          const { data } = await apiClient.post<{ id: string }>(
            "/waves/mint",
            {
              synth: event.synth,
              synthAccount: event.synthAccount,
              wave: event.wave,
            },
            // {
            //   withCredentials: true,
            // },
          );

          if (!data) {
            throw new Error("Error catching wave, try again.");
          }

          // await wait(2000);

          fetchSynths();

          await wait(2000);

          return {
            synth: event.synth,
            wave: event.wave,
            waveId: null,
            transactionHash: data.id,
            // transactionHash: "0x1234567890",
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
        isScanned: state.matches("scanned"),
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
