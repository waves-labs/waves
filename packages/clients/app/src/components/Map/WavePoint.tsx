import { Marker, Popup } from "react-leaflet";

import { PointProps } from "./SynthPoint";

const center = {
  lat: 33.678,
  lng: -116.234,
};

export interface WavePointProps extends PointProps, WaveNFT {}

export const WavePoint: React.FC<WavePointProps> = () => {
  return (
    <Marker position={center}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};
