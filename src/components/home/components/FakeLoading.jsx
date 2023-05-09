import React from "react";

const FakeLoading = () => {
  return (
    <div
      role="status"
      className="w-full bg-zinc-200 animate-pulse md:p-2  dark:border-gray-700 h-10"
    >
      <div className="h-1 bg-zinc-200 dark:bg-gray-700 w-2/4 mt-1  px-3  py-[6px] rounded-md" />
    </div>
  );
};

export default FakeLoading;
