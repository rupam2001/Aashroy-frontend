//
// Navbar for User layout
//
// eg -
//
// <UserNavbar NavbarLinks={NavbarLinks} />
//
// const NavbarLinks = [
//   { icon: <FaHome className="text-base" />, name: "Home", link: "/general" },
//   {
//     icon: <MdPersonAdd className="text-base" />,
//     name: "Report Homeless",
//     link: "/general/report-homeless",
//   },
//   {
//     icon: <FaExclamationCircle className="text-base" />,
//     name: "Report Crime",
//     link: "#",
//   },
//   { icon: <FaPeopleCarry className="text-base" />, name: "Donate", link: "#" },
// ];

import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function UserNavbar({ NavbarLinks }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 ">
        <div className="w-full container flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:block lg:justify-start">
            <a
              className="text-md font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              ASHROY
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {NavbarLinks.map((item, index) => {
                return (
                  <li className="nav-item" key={index}>
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href={item.link}
                    >
                      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2 flex item-center">
                        {item.icon}&nbsp;
                        {item.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default React.memo(UserNavbar);

{
  /* <>
      <nav className="flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 ">
        <div className="w-full container flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              ASHROY
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {NavbarLinks.map((item, index) => {
                return (
                  <li className="nav-item" key={index}>
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href={item.link}
                    >
                      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2 flex item-center">
                        {item.icon}&nbsp;
                        {item.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </> */
}
