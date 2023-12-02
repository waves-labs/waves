import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

import { WaveDataProps } from "../../hooks/wave/useWave";

import { WaveLoader } from "../Loader/Wave";
import { ScannerDialog } from "./Dialog";

export interface QRScannerProps extends WaveDataProps {
  detected?: boolean;
  synths: SynthUI[];
}

export const QRScanner: React.FC<QRScannerProps> = ({
  isIdle,
  isScanned,
  isScanning,
  error,
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
      <div className="h-full w-full grid place-items-center justify-center">
        <div className="h-2/3 flex flex-col items-center gap-16">
          <h3 className="bg-white px-3 py-1 w-60">
            {isScanning ? "Catching" : isScanned ? "Wave Caught" : "Catch Wave"}
          </h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : isScanning ? (
            <WaveLoader />
          ) : null}
        </div>

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
      </div>
      <ScannerDialog
        {...props}
        {...dialogData}
        scan={scan}
        isIdle={isIdle}
        isScanned={isScanned}
        isScanning={isScanning}
        error={error}
        setDialogData={setDialogData}
      />
    </>
  );
};
