import React from "react";
import { useAccount } from "wagmi";

import { ExploreDataProps } from "../../hooks/views/useExplore";

// import { QRScanner } from "../../components/Scanner/QR";
// import { WaveLoader } from "../../components/Loader/Wave";
import { Map } from "../../components/Map";

interface ExploreProps extends ExploreDataProps {}

const Explore: React.FC<ExploreProps> = ({
  isIdle,
  isScanning,
  isScanned,
  error,
  synths,
  ...wave
}) => {
  const { address } = useAccount();

  return (
    <section className="flex flex-col w-full h-full items-center gap-3 px-6 text-center">
      {address ? (
        <Map />
      ) : (
        <h4 className="w-full h-full grid place-items-center">
          Connect Wallet To Catch Waves
        </h4>
      )}
    </section>
  );
};

export default Explore;
