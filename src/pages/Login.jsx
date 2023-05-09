import React, { useEffect, useState } from "react";
import LoginForm from "../components/login/LoginForm";
import Or from "../components/Or";
import ChangeTitle from "../components/ChangeTitle";
import RegisterModal from "../components/Modals/RegisterModal";
import GoogleWithSignIn from "../components/chat/components/GoogleWithSignIn";

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const  openModal = () =>  {
    setIsOpen(true);
  }

  useEffect(() => {
    ChangeTitle("Sign In - Sign Up");
  }, []);

  return (
    <div className="flex w-full h-screen">
      <main className="w-full  px-4  h-full flex flex-col">
        <div className="m-auto w-full max-w-[350px] min-w-[280px]">
          <header>
            <h2 className="text-2xl text-center  mb-3">Sign In</h2>
          </header>
          <LoginForm />
          <Or />
          <GoogleWithSignIn type="button" label={"Login with Google"} />
        </div>

        <div className="text-sm w-full mt-auto mb-5  ">
          <div className="flex items-center gap-2  text-xs justify-center">
            Don't have an Account?{" "}
            <button type="button" onClick={openModal} className="font-semibold">
              Sign Up
            </button>
          </div>
        </div>
      </main>
      <RegisterModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Login;
