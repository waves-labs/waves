import React from "react";
import { QrReader } from "react-qr-reader";
import { Loader } from "../Loader";
import { useSynth } from "../../hooks/synth/useSynth";

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
  const { synths } = useSynth();

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            const url = new URL(result?.getText() as string);

            const artist = url.searchParams.get("artist");
            const eventName = url.searchParams.get("event");

            if (!artist || !eventName) {
              console.info("Invalid QR Code");
              return;
            }

            const synth: string = synths.find(
              (synth) => eventName === synth.eventName,
            )?.address as string;

            onQRDetection(synth, eventName, artist);
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
