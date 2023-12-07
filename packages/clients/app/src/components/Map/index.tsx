import { LatLng, LatLngBoundsExpression } from "leaflet";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Rectangle,
} from "react-leaflet";

interface MapProps {
  nfcClaimPoints?: any[];
}

const rectangle: LatLngBoundsExpression = [
  [51.49, -0.08],
  [51.5, -0.06],
];

const blackOptions = { color: "black" };
const center = {
  lat: 51.505,
  lng: -0.09,
};

export const Map: React.FC<MapProps> = ({ nfcClaimPoints }) => {
  const [draggable, setDraggable] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<typeof center>(center);
  const [position, setPosition] = useState<LatLng | null>(null);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-ignore
          setMarkerPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-screen h-screen"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={markerPosition}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
      <Rectangle bounds={rectangle} pathOptions={blackOptions} />
    </MapContainer>
  );
};
