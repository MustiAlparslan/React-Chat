import classNames from "classnames";
import React from "react";

export const SidebarFooter = ({ openModal, isMenuOpen }) => {
  return (
    <footer
      className={classNames({
        "lg:block  mt-auto h-11 shadow  px-4 pt-1.5": true,
        "sm:block": isMenuOpen,
        "hidden": !isMenuOpen,
      })}
    >
      <button
        type="button"
        onClick={openModal}
        className="w-full flex items-center justify-center rounded-sm  bg-mainColor h-8 text-white text-xs"
      >
        Create a Room
      </button>
    </footer>
  );
};
