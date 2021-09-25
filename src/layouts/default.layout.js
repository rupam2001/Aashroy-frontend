import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function DefaultLayout({ children, navbarSolid }) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar isSolid={navbarSolid} />
      </div>
      {children}
      <Footer theme="" />
    </div>
  );
}
