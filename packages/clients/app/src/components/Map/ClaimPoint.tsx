import { Marker, Popup } from "react-leaflet";

import { PointProps } from "./SynthPoint";

const center = {
  lat: 33.678,
  lng: -116.234,
};

export interface ClaimPointProps extends PointProps, WaveNFT {}

export const ClaimPoint: React.FC<ClaimPointProps> = () => {
  return (
    <Marker position={center}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};
