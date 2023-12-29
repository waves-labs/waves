import { useMachine } from "@xstate/react";
import { useNavigate } from "react-router-dom";
import React, { createContext, useContext } from "react";

import { apiClient } from "../../modules/axios";

import { useWaves } from "../providers/waves";

import { MapContext as MapMachineContext, mapMachine } from "./machine";

export interface MapState {
  isIdle: boolean;
  isScanning: boolean;
  isScanned: boolean;
}

export interface MapDataProps extends MapMachineContext, MapState {
  scan: (synth: string, synthAccount: string, map: string) => void;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MapContext = createContext<MapDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const MapProvider = ({ children }: Props) => {
  const currentValue = useContext(MapContext);

  if (currentValue) throw new Error("MapProvider can only be used once");

  const navigate = useNavigate();
  const { fetchSynths } = useWaves();

  const [state, send] = useMachine(mapMachine, {
    actions: {
      revealMap: async (_context, event) => {
        await wait(1000);
        navigate(`/synths/${event.data.synth}`);
      },
    },
    services: {
      scanService: async (
        _context,
        event: { synth: string; synthAccount: string; map: string },
      ) => {
        try {
          const { data } = await apiClient.post<{ id: string }>(
            "/maps/mint",
            {
              synth: event.synth,
              synthAccount: event.synthAccount,
              map: event.map,
            },
            // {
            //   withCredentials: true,
            // },
          );

          if (!data) {
            throw new Error("Error catching map, try again.");
          }

          // await wait(2000);

          fetchSynths();

          await wait(2000);

          return {
            synth: event.synth,
            map: event.map,
            mapId: null,
            transactionHash: data.id,
            // transactionHash: "0x1234567890",
          };
        } catch (error) {
          throw error;
        }
      },
    },
  });

  function scan(synth: string, synthAccount: string, map: string) {
    if (state.matches("idle")) send("SCAN", { synth, synthAccount, map });
  }

  return (
    <MapContext.Provider
      value={{
        scan,
        isIdle: state.matches("idle"),
        isScanning: state.matches("scanning"),
        isScanned: state.matches("scanned"),
        ...state.context,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapDataProps => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }

  return context;
};
