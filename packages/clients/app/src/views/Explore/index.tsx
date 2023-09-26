import React from "react";
import { useAccount } from "wagmi";

import { ExploreDataProps } from "../../hooks/views/useExplore";

import { QRScanner } from "../../components/Scanner/QR";

interface ExploreProps extends ExploreDataProps {}

const Explore: React.FC<ExploreProps> = ({
  isIdle,
  isScanning,
  error,
  synths,
  ...wave
}) => {
  const { address } = useAccount();

  return (
    <section className="flex flex-col w-full h-full items-center gap-3 px-6 text-center">
      {address ? (
        <div className="h-full w-full flex justify-center">
          <h3 className="pt-20">
            {error ? error : isScanning ? "Catching Wave" : "Catch a Wave"}
          </h3>
          <QRScanner
            isIdle={isIdle}
            isScanning={isScanning}
            error={error}
            synths={synths}
            {...wave}
          />
        </div>
      ) : (
        <h4 className="w-full h-full grid place-items-center">
          Connect Wallet To Catch Waves
        </h4>
      )}
    </section>
  );
};

export default Explore;
