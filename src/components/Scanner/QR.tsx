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
}

export const QRScanner: React.FC<QRScannerProps> = ({
  isScanning,
  onQRDetection,
}) => {
  async function handleQRDetection() {}

  return (
    <>
      <QrReader
        scanDelay={2000}
        onResult={(result, error) => {
          if (!!result) {
            console.log("QR Scan", result?.getText());

            handleQRDetection();
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{
          facingMode: "environment",
        }}
        className="qr-scanner"
      />
      {isScanning && <Loader />}
    </>
  );
};
