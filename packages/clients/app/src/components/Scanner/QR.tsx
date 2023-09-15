import React from "react";
import { QrReader } from "react-qr-reader";

import { Loader } from "../Loader";

// TODO: Polish styles to match designs

interface QRScannerProps {
  isIdle: boolean;
  isScanning: boolean;
  detected?: boolean;
  error: string | null;
  onQRDetection: (synth: string, eventName: string, artist: string) => void;
  synths: SynthUI[];
}

export const QRScanner: React.FC<QRScannerProps> = ({
  isScanning,
  onQRDetection,
  synths,
}) => {
  return (
    <>
      <QrReader
        className="qr-scanner"
        onResult={(result, error) => {
          if (!!result) {
            const address = result.getText();

            // TODO: Add validation for address
            if (!address.includes("0x")) {
              return;
            }

            const synthWaves = synths.filter(
              (synth) =>
                synth.waves?.find((wave) => wave.id === address) &&
                !!synth.account,
            );

            if (!synthWaves.length) {
              return;
            }

            if (synthWaves.length > 1) {
              // TODO: Add prompt to slect synth
              return;
            }

            const synth = synthWaves[0];

            if (!synth.account) {
              return;
            }

            onQRDetection(synth.id, synth.account, address);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{
          facingMode: "environment",
        }}
      />
      {isScanning && <Loader />}
    </>
  );
};
