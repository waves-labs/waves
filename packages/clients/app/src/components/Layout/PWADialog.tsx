import React from "react";
import { createPortal } from "react-dom";

import { InstallState } from "../../hooks/providers/pwa";

import { Button } from "../Button";

// TODO: Polish styles to match designs

interface PWADialogProps {
  state: InstallState;
}

const events: { id: EventName; name: string }[] = [
  { id: "coachella-2024", name: "Coachella 2024" },
  { id: "lollapalooza-chicago-2024", name: "Lollapalooza Chicago 2024" },
];

export const PWADialog: React.FC<PWADialogProps> = ({}) => {
  const [eventName, setEventName] = React.useState<EventName | "">("");

  function handleSetEvent(event: React.ChangeEvent<HTMLSelectElement>) {
    setEventName(event.target.value as EventName);
  }

  return createPortal(
    <>
      <input type="checkbox" id="synths-mint-dialog" className="modal-toggle" />
      <label htmlFor="synths-mint-dialog" className="modal cursor-pointer">
        <label
          className="modal-box relative flex w-full max-w-sm flex-col gap-4"
          htmlFor=""
        >
          <select
            className="select select-primary w-full"
            value={eventName}
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
            onClick={() => eventName && false /* mintSynth(eventName) */}
            disabled={!eventName}
          />
        </label>
      </label>
    </>,
    document.body,
  );
};
