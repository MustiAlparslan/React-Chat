import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../../fbConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { initialRoomList } from "../../../redux/RoomListSlice";
import FakeLoading from "./FakeLoading";
import classNames from "classnames";
import { HiUserGroup } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../../Modals/ConfirmModal";

const RoomList = ({ isMenuOpen }) => {
  const [loading, setLoading] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuId, setMenuId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const menuRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const rooms = useSelector((state) => state.room.roomList);
  const filteredList = useSelector((state) => state.room.filteredList);

  const linkClasses = (id) => {
    return classNames({
      "text-ellipsis relative overflow-hidden w-full px-1 h-9 mb-1  flex items-center gap-2 py-3": true,
      "bg-white": location.pathname === `/chat/${id}`,
      "text-zinc-500": location.pathname !== `/chat/${id}`,
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
      setMenuId(null);
    }
  };

  const OpenContextMenu = (e, id) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuId(id);
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "rooms"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newRooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        mainChat: doc.data().mainChat,
      }));
      dispatch(initialRoomList(newRooms));
      setLoading(false);
    });
    document.addEventListener("click", handleClick);

    return () => {
      unsubscribe();
      document.removeEventListener("click", handleClick);
    };
  }, [modalIsOpen]);

  useEffect(() => {
    const defaultRoomId = "2mW2wwPtzKv1L2mAA8z5";

    if (!id) {
      navigate(`/chat/${defaultRoomId}`);
    }
  }, [id, navigate]);

  const renderRoomsList = (roomList) => {
    return roomList.map((room) => (
      <div key={room?.id}>
        <Link
          onContextMenu={(e) => OpenContextMenu(e, room.id)}
          to={`/chat/${room?.id}`}
          className={linkClasses(room?.id)}
          state={{ roomName: room?.name }}
        >
          <div className="border border-black px-2 py-2 h-7 w-7 flex items-center justify-center rounded-lg">
            <HiUserGroup />
          </div>
          <span className="text-xs">{room?.name}</span>
        </Link>
        {!room?.mainChat && !modalIsOpen && showMenu && menuId === room.id && (
          <div className="w-full flex justify-end px-2" ref={menuRef}>
            <ul
              className={classNames({
                "w-2/4   border rounded-md  shadow  z-50 ": true,
                "bg-white": location.pathname === `/chat/${menuId}`,
                "bg-sidebarColor": location.pathname !== `/chat/${menuId}`,
              })}
            >
              <li
                className="flex gap-2 items-center h-7 pl-3  text-red-700 cursor-pointer "
                onClick={openModal}
              >
                <FaTrashAlt /> <span>Delete</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    ));
  };
  const displayRooms = () => {
    if (loading) {
      return [1, 2, 4, 5, 6, 7, 8].map((item) => <FakeLoading />);
    } else if (rooms.length > 0 && filteredList.length === 0) {
      return (
        <p className="text-center text-xs font-light mt-4">Room Not Found !</p>
      );
    } else if (rooms.length === 0) {
      return (
        <p className="text-center text-xs font-light mt-4">
          There is no any room yet!
        </p>
      );
    } else {
      return filteredList.length > 0
        ? renderRoomsList(filteredList)
        : renderRoomsList(rooms);
    }
  };

  return (
    <div
      className={classNames({
        "lg:block flex-1   overflow-x-hidden  overflow-y-auto scrollbar scrollbar-thumb-[#aaaaaa] scrollbar-thumb-rounded-md scrollbar-w-2 ": true,
        "sm:block ": isMenuOpen,
        "hidden ": !isMenuOpen,
      })}
    >
      <React.Fragment>{displayRooms()}</React.Fragment>
      <ConfirmModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        id={menuId}
      />
    </div>
  );
};

export default RoomList;
