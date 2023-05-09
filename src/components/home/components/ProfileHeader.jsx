import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../../redux/RightSideSlice";
import classNames from "classnames";
import { DEFAULT_AVATAR } from "../../../constants";

export const ProfileHeader = ({ user, isMenuOpen, setIsMenuOpen }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.rightSide.isOpen);

  const openRightSide = () => {
    setIsMenuOpen(false);
    dispatch(setIsOpen(!isOpen));
  };

  return (
    <header
      className={classNames({
        "py-4  lg:block  px-1.5   w-full ": true,
        "sm:block": isMenuOpen,
        hidden: !isMenuOpen,
      })}
    >
      <div
        onClick={openRightSide}
        className="hover:bg-white pl-2 cursor-pointer hover:shadow transition-shadow  flex gap-1 justify-center items-center rounded-full py-2"
      >
        <div className="w-[50px] h-[50px]">
          <div
            className="border border-mainColor"
            style={{
              borderRadius: "100%",
              backgroundImage: `url(${
                user?.photoURL ? user.photoURL : DEFAULT_AVATAR
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: 50,
              height: 50,
            }}
          />
        </div>
        <div className="flex-1">
          <h4 className="text-mainColor">{user?.displayName}</h4>
        </div>
      </div>
    </header>
  );
};
