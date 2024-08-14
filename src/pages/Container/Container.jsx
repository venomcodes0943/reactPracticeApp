import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full py-2 flex items-center max-w-7xl px-4 rounded-md mx-auto shadow-md bg-slate-200">
      {children}
    </div>
  );
};

export default Container;
