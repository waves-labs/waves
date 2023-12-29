import { useState } from "react";
import { MapContainer } from "react-leaflet";

import { Container, MapDataProps } from "./Container";
import { SynthPointProps } from "./SynthPoint";
import { ClaimPointProps } from "./ClaimPoint";

interface MapProps extends MapDataProps {}

const center = {
  lat: 33.678,
  lng: -116.234,
};

export const Map: React.FC<MapProps> = ({ synthPoints }) => {
  const [zoom, setZoom] = useState(14);
  const [view, setView] = useState("all");
  const [selectedSynth, setSelectedSynth] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("");
  const [selectedSynthStyles, setSelectedSynthStyles] = useState([]);
  const [selectedWaveStyles, setSelectedWaveStyles] = useState([]);

  function handleSynthTouch(synth: SynthPointProps) {}
  function handleWaveTouch(wave: ClaimPointProps) {}

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-screen h-screen"
    >
      <Container synthPoints={synthPoints} onSynthTouch={} />
    </MapContainer>
  );
};
