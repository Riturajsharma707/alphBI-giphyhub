import React from "react";

const Loading = () => {
  return (
    <div className="h-full flex items-center  p-2 md:p-10 bg-pink-100  mx-4 justify-center  md:mx-20  gap-5 overflow-hidden">
      <div className="animate-spin rounded-full justify-center h-16 w-16 border-t-4 border-pink-500 border-opacity-50"></div>
    </div>
  );
};

export default Loading;
