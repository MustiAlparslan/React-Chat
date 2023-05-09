import React, { useEffect, useState } from "react";
import RoomCreateModal from "../../Modals/RoomCreateModal";
import RoomList from "./RoomList";
import { useDispatch, useSelector } from "react-redux";
import { filterRoomList } from "../../../redux/RoomListSlice";
import { ProfileHeader } from "./ProfileHeader";
import { SearchBar } from "./SearchBar";
import { SidebarFooter } from "./SidebarFooter";
import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames";
import useWindowSize from "../../../hooks/useWindowSize";

const Sidebar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.user.userData);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    dispatch(filterRoomList(search.toLowerCase().trim()));
  }, [search]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (isMenuOpen && e.target.closest(".sidebar") === null) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [width, isMenuOpen]);

  useEffect(() => {
    if (width > 768) {
      setIsMenuOpen(false);
    }
  }, [width]);

  return (
    <div
      className={classNames({
        "lg:min-w-7  flex lg:w-full lg:max-w-[250px] w-1/12 md:w-6  h-full flex-col bg-sidebarColor transition-all duration-100": true,
        "absolute lg:w-full w-[90%] md:w-[250px] z-50 shadow shadow-gray-500": isMenuOpen,
        "sidebar": true,
      })}
    >
      <div
        className={classNames({
          "lg:hidden flex w-full  items-center py-2 justify-center h-10 hover:opacity-50 ": true,
          "hidden": isMenuOpen
        })}
      >
        <GiHamburgerMenu onClick={handleMenuToggle} className="cursor-pointer"/>
      </div>

      <ProfileHeader user={USER} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <SearchBar setSearch={setSearch} isMenuOpen={isMenuOpen} />
      <RoomList isMenuOpen={isMenuOpen} />
      <SidebarFooter openModal={openModal} isMenuOpen={isMenuOpen} />
      <RoomCreateModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} isMenuOpen={isMenuOpen} /> 
    </div>
  );
};

export default Sidebar;
