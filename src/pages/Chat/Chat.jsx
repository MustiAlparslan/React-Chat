import React, { useEffect, useState } from "react";
import Header from "../../components/chat/components/Header";
import ChatContainer from "../../components/chat/ChatContainer";
import Footer from "../../components/chat/components/Footer";
import ChangeTitle from "../../components/ChangeTitle";
import { Navigate, useLocation, useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = () => {
  const location = useLocation();
  const roomName = location.state ? location.state.roomName : null;


  useEffect(() => {
    if (roomName) {
      ChangeTitle(roomName);
    } else {
      ChangeTitle("Chat App");
    }
  }, [location]);

  useEffect(() => {
    if (!roomName == null) {
      return <Navigate to="/not-found" replace={true} />;
    }
  }, [roomName]);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <ScrollToBottom className="overflow-hidden w-full h-full  scrollContainer">
        <ChatContainer />
      </ScrollToBottom>
      <Footer />
    </div>
  );
};

export default Chat;
