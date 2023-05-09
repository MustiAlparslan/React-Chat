import { Outlet } from "react-router-dom";
import Sidebar from "../components/home/components/Sidebar";
import RightSide from "../components/home/components/RightSide";
import { useSelector } from "react-redux";

export default function HomeLayout() {

  const isOpen = useSelector((state) => state.rightSide.isOpen);

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 h-full lg:min-w-[550px] sm:w-full">
        <Outlet />
      </div>
      {isOpen && <RightSide  />}
    </div>
  );
}
