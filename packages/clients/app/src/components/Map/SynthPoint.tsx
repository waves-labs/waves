import { LatLngBoundsExpression } from "leaflet";
import { Marker, Popup, Rectangle } from "react-leaflet";

const rectangle: LatLngBoundsExpression = [
  [33.671, -116.225],
  [33.685, -116.234],
];

const blackOptions = { color: "black" };
const center = {
  lat: 33.678,
  lng: -116.234,
};

export interface PointProps {
  lat: number;
  lng: number;
}

export interface SynthPointProps extends PointProps, SynthNFT {
  waves: string[];
  bounds: LatLngBoundsExpression;
}

export const SynthPoint: React.FC<SynthPointProps> = () => {
  return (
    <Marker position={center}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      <Rectangle bounds={rectangle} pathOptions={blackOptions} />
    </Marker>
  );
};
