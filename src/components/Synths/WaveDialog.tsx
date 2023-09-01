import React from "react";
import { createPortal } from "react-dom";

// TODO: Polish styles to match designs

export interface WaveDialogData {
  image: string;
  name: string;
  description?: string;
}

interface WaveDialogProps extends WaveDialogData {}

export const WaveDialog: React.FC<WaveDialogProps> = ({
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
      <input type="checkbox" id="wave-dialog" className="modal-toggle" />
      <label htmlFor="wave-dialog" className="modal cursor-pointer">
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
