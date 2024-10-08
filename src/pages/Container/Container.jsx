import React from "react";

const Container = ({ children }) => {
  return (
    <div className="sticky top-2 z-50 bg-base-200 w-full py-2 flex items-center max-w-7xl px-4 rounded-md mx-auto shadow-md">
      {children}
    </div>
  );
};

export default Container;
