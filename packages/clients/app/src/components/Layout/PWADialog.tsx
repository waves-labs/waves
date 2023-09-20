import React from "react";
import { createPortal } from "react-dom";

import { InstallState } from "../../hooks/providers/pwa";

// TODO: Debug install prompt
// TODO: Add styling for dialog

interface PWADialogProps {
  state: InstallState;
}

export const PWADialog: React.FC<PWADialogProps> = ({}) => {
  return createPortal(
    <>
      <input type="checkbox" id="synths-mint-dialog" className="modal-toggle" />
      <label htmlFor="synths-mint-dialog" className="modal cursor-pointer">
        <label
          className="modal-box relative flex w-full max-w-sm flex-col gap-4"
          htmlFor=""
        ></label>
      </label>
    </>,
    document.body,
  );
};
