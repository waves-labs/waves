import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { SynthsDataProps } from "../../hooks/views/useSynths";

import { RC as AddIcon } from "../../assets/icons/add.svg";

import { SynthsGallery } from "../../components/Synths/Gallery";
import { SynthsMintDialog } from "../../components/Synths/MintDialog";

interface SynthsProps extends SynthsDataProps {}

const Synths: React.FC<SynthsProps> = ({ synths, address }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleItemClick(item: Synth | Wave) {
    if ("eventName" in item) {
      navigate(`/synths/${item.address}`);
    }
  }

  return (
    <section
      className={`relative flex flex-col w-full h-full items-center gap-3 px-6`}
    >
      {location.pathname === "/synths" && (
        <>
          <label
            htmlFor="synths-mint-dialog"
            className={`absolute right-6 top-2 grid place-items-center w-12 h-12 unselectable`}
          >
            <AddIcon />
          </label>
          <SynthsGallery
            items={address ? synths : []}
            view="synths"
            onItemClick={handleItemClick}
          />
        </>
      )}
      <Outlet />
      <SynthsMintDialog />
    </section>
  );
};

export default Synths;
