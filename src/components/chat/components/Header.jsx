import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const roomName = location.state ? location.state.roomName : null;

  useEffect(() => {
    if (!roomName === null) {
      return <Navigate to="/not-found" replace={true} />;
    }
  }, [roomName]);
  
  return (
    <header className="w-full border-b   shadow-zinc-300 shadow   h-12  flex items-center px-2">
      <h5 className="font-medium">{roomName}</h5>
    </header>
  );
};

export default Header;
