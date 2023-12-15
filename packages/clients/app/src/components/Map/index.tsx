import { useState } from "react";
import { MapContainer } from "react-leaflet";

import { SynthPointProps } from "./SynthPoint";
import { WavePointProps } from "./WavePoint";

interface MapProps {
  synthPoints?: SynthPointProps[];
  wavePoints?: WavePointProps[];
}

const center = {
  lat: 33.678,
  lng: -116.234,
};

export const Map: React.FC<MapProps> = () => {
  const [zoom, setZoom] = useState(14);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-screen h-screen"
    ></MapContainer>
  );
};
