import React from "react";

import { RC as TwitterIcon } from "../../assets/twitter.svg";
import { Link } from "react-router-dom";

// import { RC as MenuIcon } from "../../assets/menu.svg";

interface HeaderProps {
  isStarted?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header
      className={`bg-transparent py-4 px-8 flex items-center justify-between`}
    >
      <h1 className="font-bold text-4xl flex-1">WAVES</h1>
      <div className="flex gap-4">
        <Link to="/about" className="text-lg font-medium">
          House
        </Link>
        <Link to="/market" className="text-lg font-medium">
          Market
        </Link>
        <Link to="/roadmap" className="text-lg font-medium">
          Drops
        </Link>
      </div>
      <div className="flex-1 flex justify-end">
        <a
          className="w-10 h-10 flex justify-end items-center"
          href="https://twitter.com/waves_house"
          target="_blank"
        >
          <TwitterIcon
            className={`fill-black cursor-pointer opacity-80 hover:opacity-100 transform-gpu transition-opacity duration-200 ease-in-out`}
            height={30}
            width={30}
          />
        </a>
      </div>
    </header>
  );
};
