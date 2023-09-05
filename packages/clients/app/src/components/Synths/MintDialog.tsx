import React from "react";
import { createPortal } from "react-dom";

import { SynthDataProps } from "../../hooks/synth/useSynth";

import { Button } from "../Button";

interface SynthsMintDialogProps extends SynthDataProps {}

const events: { id: EventName; name: string }[] = [
  { id: "coachella-2024", name: "Coachella 2024" },
  { id: "lollapalooza-chicago-2024", name: "Lollapalooza Chicago 2024" },
];

export const SynthsMintDialog: React.FC<SynthsMintDialogProps> = ({
  mintSynth,
}) => {
  const [synth, setSynth] = React.useState<EventName | "">("");

  function handleSetEvent(event: React.ChangeEvent<HTMLSelectElement>) {
    setSynth(event.target.value as EventName);
  }

  return createPortal(
    <>
      <input type="checkbox" id="synths-mint-dialog" className="modal-toggle" />
      <label htmlFor="synths-mint-dialog" className="modal cursor-pointer px-6">
        <label
          className="modal-box relative flex w-full max-w-xs flex-col gap-4"
          htmlFor=""
        >
          <select
            className="select w-full"
            value={synth}
            onChange={handleSetEvent}
          >
            {events.map((event) => (
              <option key={event.id} value={event.id} className="capitalize">
                {event.name}
              </option>
            ))}
          </select>
          <Button
            title="Mint"
            onClick={() => synth && mintSynth(synth)}
            disabled={!synth}
          />
        </label>
      </label>
    </>,
    document.body,
  );
};
