import classNames from "classnames";
import React from "react";
import { BsSearch } from "react-icons/bs";

export const SearchBar = ({ setSearch, isMenuOpen }) => {
  return (
    <div
      className={classNames({
        "w-full  lg:flex  items-center justify-center px-4 h-12": true,
        "sm:flex": isMenuOpen,
        "hidden": !isMenuOpen,
      })}
    >
      <div className="w-full flex items-center  bg-white gap-1  border-b border-mainColor">
        <BsSearch className="text-mainColor pl-3 cursor-pointer" size={26} />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm text-mainColor  placeholder:text-zinc-300 focus:placeholder:text-mainColor outline-none w-full h-8 px-2  bg-transparent"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
