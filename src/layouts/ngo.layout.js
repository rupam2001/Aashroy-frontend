import React, { useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/ngo.css";
import {
  FaGripLines,
  FaWindowMaximize,
  FaDonate,
  FaWalking,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdError } from "react-icons/md";
import { NgoContext } from "../contexts/ngo.context";
import { removeAccessTokenNgo, removeRefreshToken } from "../utils/storage";
import { ngoSignOutAsync } from "../api/auth.api";

export default function NgoLayout({ children }) {
  const sideMenuRef = useRef(null);
  function openNav() {
    sideMenuRef.current.style.width = "250px";
  }

  function closeNav() {
    sideMenuRef.current.style.width = "0";
  }
  const ngocontext = useContext(NgoContext);
  const history = useHistory();
  useEffect(() => {
    if (!ngocontext.isLoggedIn) {
      history.push("/ngo/login");
    }
  }, [ngocontext.isLoggedIn]);

  const handleLogout = async () => {
    const { success } = await ngoSignOutAsync({});
    if (success) {
      removeAccessTokenNgo();
      removeRefreshToken();
      ngocontext.setIsLoggedIn(false);
      history.push("/ngo/login");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="md:bg-transparent md:hidden top-0 sticky bg-white shadow py-2">
        <span className="text-4xl cursor-pointer mx-5" onClick={openNav}>
          &#9776;
        </span>
      </div>
      <div class="min-h-screen flex flex-row">
        <div
          class="flex flex-col bg-white min-h-screen overflow-hidden z-100 md:z-0 fixed md:sticky sidenav md:w-72 w-0 shadow-md"
          ref={sideMenuRef}
        >
          <div class="flex  items-center justify-evenly h-38 shadow  py-5">
            <h1 class="text-3xl text-blue-500 font-bold uppercase">Aashroy</h1>
            <span
              className="text-4xl cursor-pointer md:hidden"
              onClick={closeNav}
            >
              &times;
            </span>
          </div>
          <ul class="flex flex-col py-10 ">
            <li>
              <Link to="/ngo/home">
                <div
                  href="#"
                  class=" outline-none flex flex-row items-center h-12 hover:bg-blue-100 py-8 border-l-4 hover:border-blue-500 border-transparent"
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800">
                    <FaWindowMaximize className="text-blue-900" />
                  </span>
                  <span class=" text-sm text-blue-900 ">Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/ngo/home">
                <div
                  href="#"
                  class="outline-none flex flex-row items-center h-12 hover:bg-blue-100 py-8 border-l-4 hover:border-blue-500 border-transparent"
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800">
                    <FaDonate className="text-blue-900" />
                  </span>
                  <span class="text-sm  text-blue-900">Donations</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/ngo/homeless">
                <div
                  href="#"
                  class="outline-none flex flex-row items-center h-12 hover:bg-blue-100 py-8 border-l-4 hover:border-blue-500 border-transparent"
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800">
                    <FaWalking className="text-blue-900" />
                  </span>
                  <span class="text-sm  text-blue-900">Homeless</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/ngo/crime">
                <div
                  href="#"
                  class="outline-none flex flex-row items-center h-12 hover:bg-blue-100 py-8 border-l-4 hover:border-blue-500 border-transparent"
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800">
                    <MdError className="text-blue-900" />
                  </span>
                  <span class="text-sm  text-blue-900">Crime Reports</span>
                </div>
              </Link>
            </li>
            <li>
              <div
                href="#"
                class=" cursor-pointer outline-none flex flex-row items-center h-12 hover:bg-blue-100 py-8 border-l-4 hover:border-red-500 border-transparent"
                onClick={handleLogout}
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800">
                  <FaSignOutAlt className="text-red-500" />
                </span>
                <span class="text-sm text-red-500">Logout</span>
              </div>
            </li>
          </ul>
        </div>

        {children}
      </div>
    </div>
  );
}
