import React, { useState } from "react";
import Requests from "../../utils/requests";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../chat/components/Button";
import Input from "../chat/components/Input";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const RESPONSE = await Requests.login(email, password);
    if (RESPONSE.type === "success") {
      localStorage.setItem("token", RESPONSE.data?.user.accessToken);
      navigate("/");
    } else if (RESPONSE.type === "error") {
      toast.error(RESPONSE.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <Input
          type={"email"}
          value={email}
          onChange={setEmail}
          placeholder={"Email"}
        />
      </div>
      <div className="mb-2 relative">
        <Input
          type={"password"}
          value={password}
          onChange={setPassword}
          placeholder={"Password"}
        />
      </div>
      <div className="w-full flex items-center justify-center mb-3  text-sm ">
        <Button
          disabled={!email || !password}
          loading={loading}
          label={"Sign In"}
        />
      </div>
    </form>
  );
};

export default LoginForm;
