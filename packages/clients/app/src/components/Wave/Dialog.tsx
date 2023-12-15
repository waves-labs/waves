import React from "react";
import { createPortal } from "react-dom";
import { TextAddress } from "../Text/Address";
import { Button } from "../Button";

export interface WaveDialogData extends WaveUI {}

interface WaveDialogProps extends WaveDialogData {}

export const WaveDialog: React.FC<WaveDialogProps> = ({
  data,
  name,
  artist,
  creative,
  owner,
  // contract,
  // isCatched,
  // isAvailable,
}) => {
  const isImage =
    data.startsWith("data:image") ||
    data.endsWith(".png") ||
    data.endsWith(".jpg") ||
    data.endsWith(".jpeg") ||
    data.endsWith(".gif");

  return createPortal(
    <>
      <input type="checkbox" id="wave-dialog" className="modal-toggle" />
      <label htmlFor="wave-dialog" className="modal cursor-pointer px-6">
        <label
          className="modal-box p-0 card rounded-lg relative flex w-full max-w-sm flex-col"
          htmlFor=""
        >
          <figure className={`w-full h-full aspect-[4/3]`}>
            {isImage ? (
              <img
                src={data}
                alt={`${name} Wave by ${artist} and ${creative}`}
                className="w-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full`}
                style={{
                  background: data,
                }}
              />
            )}
          </figure>
          <div className="card-body">
            <h4 className="card-title text-2xl capitalize">{name}</h4>
            <div className="flex gap-3">
              {owner && (
                <div className="badge badge-info badge-outline">Caught</div>
              )}
              {name === "bad bunny" && (
                <div className="badge badge-success badge-outline">Live</div>
              )}
            </div>
            <span className="text-lg">
              by <TextAddress address={artist} canCopy />{" "}
              {creative && (
                <>
                  and <TextAddress address={creative} canCopy />
                </>
              )}
            </span>
            {/* {contract && <p className="font-light w-3/4">{contract}</p>} */}
            <div className="card-actions justify-end">
              <Button
                title="House"
                //  className="btn bg-stone-950 text-white"
                disabled={true}
              />
            </div>
          </div>
        </label>
      </label>
    </>,
    document.body,
  );
};
