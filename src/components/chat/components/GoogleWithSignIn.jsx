import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../fbConfig";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "../../../assets/google.png";
import toast from "react-hot-toast";

const GoogleWithSignIn = ({ type = "button", label }) => {
  const navigate = useNavigate();

  const LoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        localStorage.setItem("token", res.user.accessToken);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <div className="w-full  flex items-center justify-center">
      <button type={type} onClick={LoginWithGoogle} className="mt-3">
        <div className="flex items-center gap-1">
          <img alt="google" width="24" height="24" src={GoogleIcon} />
          <div className="text-xs hover:text-blue-300">{label}</div>
        </div>
      </button>
    </div>
  );
};

export default GoogleWithSignIn;
