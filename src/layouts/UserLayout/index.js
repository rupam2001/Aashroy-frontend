import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { getAccessToken, getRefreshToken } from "../../utils/storage";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";

import { FaHome, FaExclamationCircle, FaPeopleCarry } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";

const NavbarLinks = [
  { icon: <FaHome className="text-base" />, name: "Home", link: "/general" },
  {
    icon: <MdPersonAdd className="text-base" />,
    name: "Report Homeless",
    link: "/general/report-homeless",
  },
  {
    icon: <FaExclamationCircle className="text-base" />,
    name: "Report Crime",
    link: "/report-crime",
  },
  {
    icon: <FaPeopleCarry className="text-base" />,
    name: "Donate",
    link: "/ngo/list",
  },
];

function UserLayout({ children }) {
  const location = useLocation();
  const history = useHistory();
  const authcontext = useContext(AuthContext);

  useEffect(() => {
    // checks if user has already logged in
    // if not sent him to login page with the location as state
    // that he currently intended to go
    if (
      getAccessToken() == null &&
      getRefreshToken() == null &&
      location.pathname != "/general/login"
    ) {
      history.replace("/general/login", { forwardTo: location.pathname });
      history.go(0);
    }
  }, [authcontext.isLoggedIn]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <UserNavbar NavbarLinks={NavbarLinks} />
      {children}
      <Footer />
    </div>
  );
}

export default UserLayout;
