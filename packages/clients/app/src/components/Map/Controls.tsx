import { TileLayer, useMapEvents } from "react-leaflet";

// import { WavePointProps } from "./ClaimPoint";

export type MapView = "synths" | "waves" | "synth" | "all";

export interface MapControlsProps {
  view: MapView;
  selectedTicket?: string;
  selectedSynth?: string;
  selectedSynthStyles: string[];
  selectedWaveStyles: string[];
}

interface ControlsProps extends MapControlsProps {
  setView: React.Dispatch<React.SetStateAction<MapView>>;
  setSelectedTicket?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSynth?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSynthStyles: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedWaveStyles: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Controls: React.FC<ControlsProps> = () => {
  return (
    <form>
      <input type="checkbox" id="synth" name="synth" value="synth" />
      <label htmlFor="synth">Synths</label>
      <input type="checkbox" id="wave" name="wave" value="wave" />
      <label htmlFor="wave">Waves</label>
      <input type="text" id="ticket" name="ticket" value="ticket" />
      <label htmlFor="ticket">Tickets</label>
    </form>
  );
};
