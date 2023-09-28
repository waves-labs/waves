import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

import { ScannerDialog } from "./Dialog";

import { WaveDataProps } from "../../hooks/wave/useWave";

export interface QRScannerProps extends WaveDataProps {
  detected?: boolean;
  synths: SynthUI[];
}

export const QRScanner: React.FC<QRScannerProps> = ({
  isScanning,
  scan,
  synths,
  ...props
}) => {
  const [dialogData, setDialogData] = useState<{
    synths: SynthUI[];
    wave: string;
  }>({
    synths: [],
    wave: "",
  });

  return (
    <>
      <QrReader
        className="qr-scanner"
        onResult={(result, error) => {
          if (!!result) {
            const address = result.getText();

            if (!address.includes("0x")) {
              return;
            }

            // scan(address, address, address);

            const synthWaves = synths.filter(
              (synth) =>
                synth.waves?.find((wave) => wave.id === address) &&
                !!synth.account,
            );

            if (!synthWaves.length) {
              return;
            }

            if (synthWaves.length > 1) {
              setDialogData({
                synths: synthWaves,
                wave: address,
              });

              const dialog = document.getElementById(
                "scanner-dialog",
              ) as HTMLDialogElement;

              if (dialog) {
                dialog.showModal();
              }

              return;
            }

            const synth = synthWaves[0];

            if (!synth.account) {
              return;
            }

            scan(synth.id, synth.account, address);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        scanDelay={1200}
        constraints={{
          facingMode: "environment",
        }}
      />
      <ScannerDialog
        {...props}
        {...dialogData}
        scan={scan}
        isScanning={isScanning}
        setDialogData={setDialogData}
      />
    </>
  );
};
