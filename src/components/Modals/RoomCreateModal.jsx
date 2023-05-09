import React, { useState } from "react";
import Modal from "react-modal";
import Requests from "../../utils/requests";
import { toast } from "react-hot-toast";
import Button from "../chat/components/Button";
import Input from "../chat/components/Input";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.8)",
    backdropFilter: "blur(3px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "420px",
    width: "100%",
    backgroundColor: "#f0f2f5",
    padding: "24px",
    borderRadius: "8px",
    border: "none",
  },
};

Modal.setAppElement("#root");

function RoomCreateModal({ setIsOpen, modalIsOpen}) {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const RESPONSE = await Requests.createRoom(roomName);
    if (RESPONSE.type === "success") {
      toast.success("Room created successfully");
      setIsOpen(false);
    } else if (RESPONSE.type === "error") {
      toast.error(RESPONSE.message);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <header className="mb-2">
          <h2 className="text-center text-2xl font-bold">Create a room</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <Input
              type={"text"}
              value={roomName}
              onChange={setRoomName}
              placeholder={"Room name"}
              maxLength={35}
              minLength={3}
            />
          </div>
          <footer className="mt-3">
            <Button
              disabled={!roomName}
              loading={loading}
              label={"Create a new room"}
            />
          </footer>
        </form>
      </Modal>
    </div>
  );
}

export default RoomCreateModal;
