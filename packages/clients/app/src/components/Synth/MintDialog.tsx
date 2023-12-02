import React, { useState } from "react";

import { SynthDataProps } from "../../hooks/synth/useSynth";

import { Button } from "../Button";

interface SynthsMintDialogProps extends SynthDataProps {
  synthNfts?: SynthNFT[];
}

export const SynthsMintDialog: React.FC<SynthsMintDialogProps> = ({
  isMinting,
  isMinted,
  mintSynth,
  synthNfts,
  synthAddrs,
  setSynthAddrs,
  error,
}) => {
  const [ticketAddrs, setTicketAddrs] = useState("");

  function handleSetAddress(event: React.ChangeEvent<HTMLSelectElement>) {
    setSynthAddrs(event.target.value);
  }

  function handleSetTicket(event: React.ChangeEvent<HTMLInputElement>) {
    setTicketAddrs(event.target.value);
  }

  return (
    <dialog id="synths-mint-dialog" className="modal">
      <div className="modal-box relative flex w-full max-w-xs flex-col gap-4 text-black pt-4">
        <select
          className="select w-full"
          value={synthAddrs}
          onChange={handleSetAddress}
        >
          {synthNfts && synthNfts.length
            ? synthNfts?.map((synth) => (
                <option key={synth.id} value={synth.id} className="capitalize">
                  {synth.name}
                </option>
              ))
            : null}
        </select>
        <input
          type="text"
          placeholder="Ticket"
          value={ticketAddrs}
          onChange={handleSetTicket}
          className="input input-bordered w-full max-w-xs"
        />
        <Button
          title={
            isMinting
              ? "Minting Synth..."
              : isMinted
              ? "Synth Minted"
              : "Mint Synth"
          }
          onClick={() => mintSynth(synthAddrs, ticketAddrs)}
          disabled={!synthAddrs}
          active={isMinting}
        />
        <p className="text-red-500 h-4 text-sm font-medium line-clamp-1">
          {error}
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};
