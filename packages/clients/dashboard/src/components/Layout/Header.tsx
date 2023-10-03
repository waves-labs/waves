import React from "react";
import { RC as MenuIcon } from "../../assets/menu.svg";

interface HeaderProps {
  isStarted: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isStarted }) => {
  return (
    <header
      className={`${
        isStarted ? "text-white" : ""
      } fixed z-20 top-0 left-0 w-full`}
    >
      <div className="py-4 max-w-screen-2xl mx-auto md:py-8 flex items-center justify-end gap-4 w-full px-6 md:px-12">
        <button
          // @ts-ignore
          onClick={() => document.getElementById("about").showModal()}
          className="w-fit h-full"
        >
          <span className="sm:block hidden uppercase text-sm font-medium tracking-tight opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out">
            A<br />B<br />O<br />U<br />T
          </span>
          <MenuIcon
            className={`${
              isStarted ? "fill-white stroke-white" : "fill-black stroke-black"
            } sm:hidden block opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out`}
          />
        </button>
      </div>
    </header>
  );
};
