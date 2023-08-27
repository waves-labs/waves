import React from "react";

import { ExploreDataProps } from "../../hooks/views/useExplore";
import { QRScanner } from "../../components/Scanner/QR";
import { useAccount } from "wagmi";

interface ExploreProps extends ExploreDataProps {}

const Explore: React.FC<ExploreProps> = ({
  isIdle,
  isScanning,
  error,
  scan,
}) => {
  const { address } = useAccount();
  return (
    <section className="flex flex-col w-full items-center gap-3 px-6 pt-12">
      {address ? (
        <>
          <h2 className="font-medium text-xl">
            {error ? error : isScanning ? "Catching wave" : "Catch a wave"}
          </h2>
          <QRScanner
            isIdle={isIdle}
            isScanning={isScanning}
            onQRDetection={scan}
            error={error}
          />
        </>
      ) : (
        <h2 className="font-medium text-xl h-full text-center w-2/3 grid place-items-center">
          Connect Wallet To Catch Wave
        </h2>
      )}
    </section>
  );
};

export default Explore;
