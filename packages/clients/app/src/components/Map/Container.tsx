import { TileLayer, useMapEvents } from "react-leaflet";

import { SynthPointProps } from "./SynthPoint";
import { WavePointProps } from "./WavePoint";

interface MapProps {
  synthPoints?: SynthPointProps[];
  wavePoints?: WavePointProps[];
}

export const Container: React.FC<MapProps> = () => {
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
