import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col pt-3 h-screen">
      <Header />
      <div className="flex-1 px-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
