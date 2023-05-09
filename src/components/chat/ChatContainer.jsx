import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../fbConfig";
import Loader from "../Loader";
import { useParams } from "react-router-dom";
import classNames from "classnames";

const groupMessagesByUser = (messages) => {
  let messageGroups = [];
  let currentGroup = [];

  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    let prevMessage = messages[i - 1];

    if (!prevMessage || prevMessage.id !== message.id) {
      if (currentGroup.length > 0) {
        messageGroups.push(currentGroup);
      }
      currentGroup = [message];
    } else {
      currentGroup.push(message);
    }
  }

  if (currentGroup.length > 0) {
    messageGroups.push(currentGroup);
  }

  return messageGroups;
};

const Date_Format = (date) => {
  return moment.unix(date).format("HH:mm");
};

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(null);
  const { id: roomId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (!roomId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(groupMessagesByUser(messages));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  return (
    <div className="w-full">
      {loading != null || messages.length !== 0 ? (
        messages.map((messageGroup, index) => (
          <div key={index} className="py-1  mt-1 px-2 ">
            <div
              className={classNames({
                "w-full flex gap-1 justify-start": true,
                "justify-end": auth?.currentUser?.uid === messageGroup[0]?.id,
              })}
            >
              {auth?.currentUser?.uid !== messageGroup[0]?.id && (
                <img
                  src={messageGroup[0].avatar}
                  alt={messageGroup[0].displayName}
                  style={{
                    width: 26,
                    height: 26,
                    minHeight: 26,
                    borderRadius: 26,
                  }}
                />
              )}
              <div>
                {auth?.currentUser?.uid !== messageGroup[0]?.id && (
                  <div className="text-xs font-medium   ">
                    {messageGroup[0]?.displayName}
                  </div>
                )}
                {messageGroup.map((message, index) => (
                  <div
                    key={index}
                    className={`text-xs mb-1  px-3 rounded-3xl bg-mainColor text-white  w-full max-w-[50%] min-w-[100px] ] `}
                  >
                    <div className="break-words font-medium  whitespace-pre-wrap pt-[2px]">
                      {message.message}
                    </div>
                    <div className="text-xs text-right text-zinc-400 font-thin tracking-wider cursor-pointer ">
                      {Date_Format(message.createdAt?.seconds)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full mt-2  flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
