import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/home/components/Sidebar";

const Home = () => {

  return (
    <div className="w-full h-screen flex">
      <Sidebar/>
      <div className="flex-1 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
