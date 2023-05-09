import React, { useEffect, useState } from "react";
import { auth, db } from "../fbConfig";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../constants";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    } else if (message.includes("/exit")) {
      localStorage.removeItem("token");
      navigate("/auth/login");
    } else {
      await addDoc(collection(db, "messages"), {
        id: auth.currentUser.uid,
        avatar: auth.currentUser.photoURL || DEFAULT_AVATAR,
        username: auth.currentUser.email,
        message: message,
        createdAt: serverTimestamp(),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center py-5">
      <div className="bg-white max-w-[900px] w-full h-full  shadow-lg flex flex-col overflow-auto">
        <div className="flex-1 mt-1">
          {messages &&
            messages.map((itm) => (
              <div
                className="w-full bg-slate-100 px-2 mb-1 flex items-center justify-between"
                key={itm.id}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={itm.avatar}
                    alt={itm.email}
                    style={{
                      width: 30,
                      height: 30,
                      minHeight: 30,
                      borderRadius: 30,
                    }}
                  />
                  <div>
                    <h2 className="text-sm font-semibold text-slate-400">
                      {itm.username}
                    </h2>
                    <p className="text-sm font-light">{itm.message}</p>
                  </div>
                </div>
                <div className="text-xs text-zinc-500 tracking-wider	">
                  {moment
                    .unix(itm.createdAt?.seconds)
                    .format("DD.MM.yyyy  -  HH:mm")}
                </div>
              </div>
            ))}
        </div>
        <div className="mt-auto w-full h-11 bg-slate-100 shadow-inner">
          <form onSubmit={handleSubmit} className="w-ull flex mt-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="w-full px-1 text-sm outline-none h-9 rounded-sm"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
