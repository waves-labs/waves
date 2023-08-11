import React from "react";
import { createPortal } from "react-dom";

// TODO: Polish styles to match designs

export interface SynthsDialogData {
  image: string;
  name: string;
  description?: string;
}

interface SynthsDialogProps extends SynthsDialogData {}

export const SynthsDialog: React.FC<SynthsDialogProps> = ({
  name,
  description,
  image,
}) => {
  const Content = () => (
    <div className="px-4 flex flex-col gap-3 pb-12 w-full bg-base-100">
      <img
        src={image}
        alt={name}
        className="w-full aspect-square object-cover rounded-xl"
      />
      <h2 className="font-bold text-2xl capitalize">{name}</h2>
      {description && <p className="font-light">{description}</p>}
    </div>
  );

  return createPortal(
    <>
      <input type="checkbox" id="deck-viewer-dialog" className="modal-toggle" />
      <label htmlFor="deck-viewer-dialog" className="modal cursor-pointer">
        <label
          className="modal-box relative flex w-full max-w-sm flex-col gap-4"
          htmlFor=""
        >
          <Content />
        </label>
      </label>
    </>,
    document.body,
  );
};
