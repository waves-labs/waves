import React, { useState } from "react";

import { WaveDataProps } from "../../hooks/wave/useWave";

import { Button } from "../Button";
import { LineLoader } from "../Loader/Line";

interface ScannerDialogProps extends WaveDataProps {
  synths: SynthUI[];
  setDialogData: React.Dispatch<
    React.SetStateAction<{
      synths: SynthUI[];
      wave: string;
    }>
  >;
}

export const ScannerDialog: React.FC<ScannerDialogProps> = ({
  wave,
  synths,
  error,
  scan,
  isScanning,
  // isScanned,
}) => {
  const [synthAddrs, setSynthAddress] = useState(
    synths[0] !== undefined ? synths[0].id : "",
  );

  const synth: SynthUI | undefined = synths.find(
    (synth) => synth.id === synthAddrs,
  );

  function handleSetSynth(event: React.ChangeEvent<HTMLSelectElement>) {
    setSynthAddress(event.target.value);
  }

  return (
    <dialog id="scanner-dialog" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            <select
              className="select w-full"
              value={synthAddrs}
              onChange={handleSetSynth}
            >
              {synths?.map((synth) => (
                <option key={synth.id} value={synth.id} className="capitalize">
                  {synth.name}
                </option>
              ))}
            </select>
            <div className="flex flex-col gap-3">
              <Button
                title="Select"
                onClick={() =>
                  synth?.account &&
                  wave &&
                  scan(synthAddrs, synth.account, wave)
                }
                disabled={!synthAddrs || !synth?.account || !wave}
                // active={isMinting}
              />
              <Button title="Close" />
            </div>
            <p className="text-red-500 h-4 text-sm font-medium line-clamp-1">
              {isScanning ? <LineLoader /> : error}
            </p>
          </form>
        </div>
      </div>
    </dialog>
  );
};
