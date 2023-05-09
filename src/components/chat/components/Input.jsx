import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({ type, value, onChange, placeholder,maxLength= "",minLength= "", readOnly = false, extraClassName = "",}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className={`w-full text-xs border rounded-sm h-8 px-1 outline-none focus:border focus:border-[#334155] ${extraClassName}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={true}
        readOnly={readOnly}
      />
      {type === "password" && value && (
        <>
          {showPassword ? (
            <AiFillEyeInvisible
              size={15}
              className="absolute right-2 top-2.5 cursor-pointer "
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiFillEye
              size={15}
              className="absolute right-1 top-2.5 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Input;
