import React from "react";
import { QrReader } from "react-qr-reader";
import { Loader } from "../Loader";

// TODO: Polish styles to match designs

interface QRScannerProps {
  isIdle: boolean;
  isScanning: boolean;
  detected?: boolean;
  error: string | null;
  onQRDetection: (code: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  isScanning,
  onQRDetection,
}) => {
  async function handleQRDetection() {}

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            // setData(result?.text);
            handleQRDetection();
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{}}
        // style={{ width: "100%" }}
      />
      {isScanning && <Loader />}
    </>
  );
};
