import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
      </div>
      {children}
      <Footer theme=""/>
    </div>
  );
}
