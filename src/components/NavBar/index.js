import React, { useEffect, useState, useContext } from "react";
import {HiMenu} from "react-icons/hi"
import { AuthContext } from "../../contexts/auth.context";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

const NavBar = ({ isSolid }) => {
  const [isMobilemenushown, setIsMobilemenushown] = useState(false);
  const [size, setSize] = useState([0, 0]);

  const ContextAuth = useContext(AuthContext);

  useEffect(() => {
    console.log(ContextAuth);
  }, [ContextAuth]);

  const toggleMenu = () => {
    setIsMobilemenushown(!isMobilemenushown);
  };

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
      setIsMobilemenushown(false);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <nav
      className={`py-1 z-50 ${isMobilemenushown ? "bg-blue-800" : null} ${
        isSolid ? "bg-blue-600" : null
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link
                to="/"
                className={"flex items-center py-4 px-3 text-gray-100"}
              >
                <img
                  src={logo}
                  alt="logo"
                  className={
                    " h-8 w-8 mr-2 text-blue-500" +
                    (isSolid ? " bg-white p-1 rounded-full" : "")
                  }
                />
                <span className="font-bold">Aashroy</span>
              </Link>
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/about-us"
                className="py-4 px-3 text-gray-100 hover:text-gray-200"
              >
                About Us
              </Link>
              <Link to="/contact-us">
                <a
                  to="#"
                  className="py-4 px-3 text-gray-100 hover:text-gray-200"
                >
                  Contact Us
                </a>
              </Link>
            </div>
          </div>

          {/* secondary nav */}
          <div className="hidden md:flex items-center space-x-1">
            {ContextAuth.isLoggedIn ? (
              <Link to="/general">
                <a to="#" className="py-4 px-3 text-gray-100">
                  My Account
                </a>
              </Link>
            ) : null}

            {!ContextAuth.isLoggedIn ? (
              <Link to="/general/login">
                <a className="py-2 px-3 mx-2 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-300 transition duration-100">
                  User Login
                </a>
              </Link>
            ) : null}

            <Link to="/ngo/login">
              <a className="py-2 px-3 bg-black text-white rounded hover:bg-yellow-300 transition duration-100">
                NGO Login
              </a>
            </Link>
            {/* <Link to="/">
              <a className="py-2 px-3 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-300 transition duration-100">
                NGO Login
              </a>
            </Link> */}
          </div>
          {/* mobile button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
             <HiMenu size={26} color="#fff"/>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div
        className={`bg-blue-800 h-screen text-white pt-10 ml-6 ${!isMobilemenushown ? "hidden" : null}`}
      >
        <Link to="/about-us">
          <a
            className="block py-2 px-4 text-lg hover:bg-gray-200 mb-4 border-b-2 border-white"
            onClick={toggleMenu}
          >
            About Us
          </a>
        </Link>
        <Link to="/contact-us">
          <a
            className="block py-2 px-4 text-lg hover:bg-gray-200 mb-4  border-b-2 border-white"
            onClick={toggleMenu}
          >
            Contact Us
          </a>
        </Link>

        {ContextAuth.isLoggedIn ? (
          <Link to="/general">
            <a
              className="block py-2 px-4 text-lg hover:bg-gray-200 mb-4  border-b-2 border-white"
              onClick={toggleMenu}
            >
              My Account
            </a>
          </Link>
        ) : null}

        {!ContextAuth.isLoggedIn ? (
          <Link to="/general/login">
            <a
              className="block py-2 px-4 text-lg hover:bg-gray-200 mb-4  border-b-2 border-white"
              onClick={toggleMenu}
            >
              User Login
            </a>
          </Link>
        ) : null}

        <Link to="/ngo/login">
          <a
            className="block py-2 px-4 text-lg hover:bg-gray-200 mb-4  border-b-2 border-white"
            onClick={toggleMenu}
          >
            NGO Login
          </a>
        </Link>
      </div>

      <div></div>
    </nav>
  );
};

export default NavBar;
