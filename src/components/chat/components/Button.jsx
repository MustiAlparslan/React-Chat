import React from "react";
import Loader from "../../Loader";

const Button = ({ type = "submit", disabled, loading, label }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full active:hover:opacity-80   disabled:opacity-75 px-2 text-sm text-white rounded h-8 bg-[#334155] text-center "
    >
      {!loading ? (
        <span className="text-xs">{label}</span>
      ) : (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
    </button>
  );
};

export default Button;
