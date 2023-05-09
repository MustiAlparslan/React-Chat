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
    maxWidth: "430px",
    minWidth: "320px",
    backgroundColor: "#f0f2f5",
    padding: "24px",
    borderRadius: "8px",
    border: "none",
  },
};

Modal.setAppElement("#root");

function RegisterModal({ setIsOpen, modalIsOpen }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const RESPONSE = await Requests.register(email, password, displayName);
    if (RESPONSE.type === "success") {
      toast.success("Successfully registered");
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
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="text-xs">
              Name
            </label>
            <Input
              type={"text"}
              value={displayName}
              onChange={setDisplayName}
              placeholder={"Name"}
              minLength="7"
              maxLength="50"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email" className="text-xs">
              Email
            </label>
            <Input
              type={"email"}
              value={email}
              onChange={setEmail}
              placeholder={"Email"}
              minLength="7"
              maxLength="50"

            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-xs">
              Password
            </label>
            <Input
              type={"password"}
              value={password}
              onChange={setPassword}
              placeholder={"Password"}
              minLength="7"
              maxLength="50"
            />
          </div>
          <footer className="mt-3">
            <Button
              disabled={!displayName || !email || !password}
              loading={loading}
              label={"Sign Up"}
            />
          </footer>
        </form>
      </Modal>
    </div>
  );
}

export default RegisterModal;
