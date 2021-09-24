import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
