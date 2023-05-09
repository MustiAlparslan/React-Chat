import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db, auth } from "../../../fbConfig";
import { IoSendSharp } from "react-icons/io5";
import TextareaAutosize from "react-autosize-textarea";
import EmojiPicker from "emoji-picker-react";
import { IoIosHappy } from "react-icons/io";
import { DEFAULT_AVATAR } from "../../../constants";

const Form = ({ showEmojiPicker, setShowEmojiPicker }) => {
  const [message, setMessage] = useState("");
  const { id: roomId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    } else {
      const messageRef = collection(db, "rooms", roomId, "messages");
      await addDoc(messageRef, {
        id: auth.currentUser.uid,
        avatar: auth.currentUser.photoURL || DEFAULT_AVATAR,
        displayName: auth.currentUser.displayName,
        message: message,
        createdAt: serverTimestamp(),
      });
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };
  const selectEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <form
      className="w-full  flex items-center px-2 max-h-[70px] mb-1  py-1 bg-sidebarColor rounded-full shadow-gray-500 shadow"
      onSubmit={handleSubmit}
    >
      {/* TODO:  
        <EmojiPicker /> 
        <div className="hover:opacity-50 cursor-pointer" onClick={selectEmoji}>
          <IoIosHappy size={21} />
        </div> 
    */}
    
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message..."
        maxLength={300}
        rows={1}
        cols={3}
        className={`outline-none resize-none leading-8	   w-full bg-transparent min-h-[30px]  rounded-full text-sm max-h-[70px] px-1 overflow-y-auto scrollbar scrollbar-thumb-[#aaaaaa] scrollbar-thumb-rounded-md scrollbar-w-2`}
      />
      <button
        disabled={!message}
        type="submit"
        className="w-10 flex items-center justify-center bg-transparent h-full"
      >
        <IoSendSharp size={21} />
      </button>
    </form>
  );
};

export default Form;
