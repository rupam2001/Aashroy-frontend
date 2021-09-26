import React, { useEffect, useState, useContext } from "react";
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  color="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div
        className={`bg-white h-screen ${!isMobilemenushown ? "hidden" : null}`}
      >
        <Link to="/listing">
          <a
            className="block py-2 px-4 text-sm hover:bg-gray-200"
            onClick={toggleMenu}
          >
            Link 1
          </a>
        </Link>
        <Link to="/plasmarequest">
          <a
            className="block py-2 px-4 text-sm hover:bg-gray-200"
            onClick={toggleMenu}
          >
            Link 2
          </a>
        </Link>
        <Link to="/myaccount">
          <a
            className="block py-2 px-4 text-sm hover:bg-gray-200"
            onClick={toggleMenu}
          >
            My Account
          </a>
        </Link>
        <Link to="/howitworks">
          <a
            className="block py-2 px-4 text-sm hover:bg-gray-200"
            onClick={toggleMenu}
          >
            How it works
          </a>
        </Link>
      </div>

      <div></div>
    </nav>
  );
};

export default NavBar;
