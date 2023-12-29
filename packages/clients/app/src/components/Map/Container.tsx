import { TileLayer, useMapEvents } from "react-leaflet";

import { SynthPointProps } from "./SynthPoint";
// import { WavePointProps } from "./ClaimPoint";
import { MapControlsProps } from "./Controls";

export interface MapDataProps {
  synthPoints: SynthPointProps[];
  // wavePoints: WavePointProps[];
}

export interface ContainerProps extends MapDataProps, MapControlsProps {
  onSynthTouch: (synth: SynthPointProps) => void;
  // onWaveTouch: (wave: WavePointProps) => void;
}

export const Container: React.FC<ContainerProps> = ({
  synthPoints,
  // wavePoints,
  onSynthTouch,
  // onWaveTouch,
  ...props
}) => {
  useMapEvents({
    click() {
      // map.locate();
    },
    locationfound(e) {
      // setPosition(e.latlng);
      // map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </>
  );
};
