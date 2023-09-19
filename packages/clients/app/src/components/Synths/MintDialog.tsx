import React from "react";
import { createPortal } from "react-dom";

import { SynthDataProps } from "../../hooks/synth/useSynth";

import { Button } from "../Button";

interface SynthsMintDialogProps extends SynthDataProps {
  synthNfts?: SynthNFT[];
}

export const SynthsMintDialog: React.FC<SynthsMintDialogProps> = ({
  // isIdle,
  isMinting,
  mintSynth,
  synthNfts,
  synthAddrs,
  setSynthAddrs,
}) => {
  function handleSetAddress(event: React.ChangeEvent<HTMLSelectElement>) {
    setSynthAddrs(event.target.value);
  }

  return createPortal(
    <>
      <input type="checkbox" id="synths-mint-dialog" className="modal-toggle" />
      <label htmlFor="synths-mint-dialog" className="modal cursor-pointer px-6">
        <label
          className="modal-box relative flex w-full max-w-xs flex-col gap-4 text-black"
          htmlFor=""
        >
          <select
            className="select w-full"
            value={synthAddrs}
            onChange={handleSetAddress}
          >
            {synthNfts && synthNfts.length
              ? synthNfts?.map((synth) => (
                  <option
                    key={synth.id}
                    value={synth.id}
                    className="capitalize"
                  >
                    {synth.name}
                  </option>
                ))
              : null}
          </select>
          <Button
            title={isMinting ? "Minting..." : "Mint"}
            onClick={() => mintSynth(synthAddrs)}
            disabled={!synthAddrs}
            active={isMinting}
          />
        </label>
      </label>
    </>,
    document.body,
  );
};
