import React from "react";
import { createPortal } from "react-dom";

export interface WaveDialogData {
  data: string;
  name: string;
  artist: string; // Generative Artist
  creative?: string; // Musician, Performer, etc.
  contract?: string; // Contract Address
  isCatched?: boolean;
  isAvailable?: boolean;
}

interface WaveDialogProps extends WaveDialogData {}

export const WaveDialog: React.FC<WaveDialogProps> = ({
  data,
  name,
  artist,
  creative,
  contract,
  isCatched,
  isAvailable,
}) => {
  const isImage =
    data.startsWith("data:image") ||
    data.endsWith(".png") ||
    data.endsWith(".jpg") ||
    data.endsWith(".jpeg") ||
    data.endsWith(".gif");

  console.log("WaveDialog", data);

  return createPortal(
    <>
      <input type="checkbox" id="wave-dialog" className="modal-toggle" />
      <label htmlFor="wave-dialog" className="modal cursor-pointer px-6">
        <label
          className="modal-box relative flex w-full max-w-sm flex-col gap-4"
          htmlFor=""
        >
          {isImage ? (
            <img
              src={data}
              alt={`${name} Wave by ${artist} and ${creative}`}
              className="w-full aspect-square object-cover rounded-xl"
            />
          ) : (
            <div
              className={`w-full aspect-square`}
              style={{
                background: data,
              }}
            />
          )}
          <div className="flex gap-3">
            {isCatched ? (
              <span className={`badge badge-lg bg-blue`}>Catched</span>
            ) : null}
            <span
              className={`badge badge-lg ${
                isAvailable ? "bg-green" : "bg-red"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
          <h4 className="font-medium text-3xl capitalize">{name}</h4>
          <p>{`by ${artist} ${
            artist === creative ? undefined : `and ${creative}`
          }`}</p>
          {contract && <p className="font-light w-3/4">{contract}</p>}
        </label>
      </label>
    </>,
    document.body,
  );
};