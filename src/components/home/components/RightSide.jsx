import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../chat/components/Input";
import Requests from "../../../utils/requests";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import classNames from "classnames";
import { useEffect } from "react";
import { setIsOpen } from "../../../redux/RightSideSlice";
import { DEFAULT_AVATAR } from "../../../constants";

const RightSide = () => {
  const USER = useSelector((state) => state.user.userData);
  const isOpen = useSelector((state) => state.rightSide.isOpen);

  const navigate = useNavigate();
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  const logout = async () => {
    const RESPONSE = await Requests.logout();
    if (RESPONSE.type === "success") {
      navigate("/auth/login", { replaceWith: true });
      toast.success("Successfully logged out");
    } else if (RESPONSE.type === "error") {
      toast.error(RESPONSE.message);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (isOpen && e.target.closest(".rightSidebar") === null) {
        dispatch(setIsOpen(false));
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [width,isOpen]);

  return (
    <div
      className={classNames({
        "bg-sidebarColor lg:w-[250px] md:w-[250px] sm:w-[80%] sm:hidden     h-full flex flex-col px-4 pt-2 rightSidebar": true,
        "absolute z-50 right-0 shadow shadow-gray-500 sm:hidden  md:flex": isOpen
      })}
    >
      <header className="w-full ">
        <h3 className="text-medium  border-b pb-1">Profile / User Information</h3>
        <div
          className="border border-mainColor m-auto mt-2"
          style={{
            borderRadius: "100%",
            backgroundImage: `url(${
              USER?.photoURL ? USER?.photoURL : DEFAULT_AVATAR
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 70,
            height: 70,
          }}
        />
      </header>
      <section className="mt-2">
        <label className="pb-3 block">
          <p className="text-sm text-zinc-800">Name</p>
          <Input
            placeholder={"Name"}
            value={USER?.displayName}
            readOnly={true}
            extraClassName="border-none cursor-not-allowed"
          />
        </label>

        <label className="pb-3 block">
          <p className="text-sm text-zinc-800">Email</p>
          <Input
            placeholder={"Email"}
            type="email"
            value={USER?.email}
            readOnly={true}
            extraClassName="border-none cursor-not-allowed"
          />
        </label>

        <label className="pb-3 block">
          <p className="text-sm text-zinc-800">Password</p>
          <Input
            placeholder={"**********"}
            readOnly={true}
            extraClassName="border-none cursor-not-allowed"
          />
        </label>
      </section>
      <footer className="mt-auto h-11  ">
        <button
          className="hover:opacity-75 flex items-center px-2 w-full rounded-sm text-white text-xs gap-2 bg-red-800 h-9"
          onClick={logout}
        >
          <HiOutlineLogout size={18} />
          <span>Logout</span>
        </button>
      </footer>
    </div>
  );
};
export default RightSide;
