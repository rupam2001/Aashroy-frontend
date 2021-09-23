import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaAddressBook,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import {
  SERVICES,
  CONTACTDETAILS,
  SOCIAL_MEDIA,
} from "../../constants/footer.constats";

const Footer = () => {
  return (
    <div className="flex flex-col w-full pt-xl pb-10 bg-white items-center border-gray-200 border-t-2">
      {/* top section */}
      <div className="mt-10 flex flex-row justify-evenly flex-wrap lg:gap-20 gap:10 text-left w-full px-20">
        {/* main section */}
        <div className="flex flex-col text-left mx-2">
          <span className="text-3xl text-blue-600 mb-4 font-bold">
            A A S H R O Y
          </span>
          <span className="text-gray-700 mt-3 py-1 text-base hover:text-green ease-in duration-200">
            A Charitable Journey For
          </span>
          <span className="text-black py-1 text-base hover:text-red-600 font-bold">
            Homeless people
          </span>
          <span className="text-black py-1 text-base">
            {" "}
            Developed By{" "}
            <span className="font-bold italic hover:text-red-600">
              TEAM AURIN
            </span>
          </span>
          <span className="text-black py-1 text-base ">
            {" "}
            Under{" "}
            <span className="font-bold italic hover:text-red-600">
              Jorhat Engineering College
            </span>
          </span>

          <div className="text-base mt-8 text-gray-500 not-italic">
            Follow us @
          </div>

          <div className="flex flex-row text-left">
            <a
              className="text-blue-900 py-2 text-2xl hover:text-blue-700"
              href="www.gg.com"
            >
              <i className="fab fa-facebook-f">
                <a href={SOCIAL_MEDIA.facebook} className="ml-10">
                  <FaFacebook />
                </a>
              </i>
            </a>
            <a
              className="text-black py-2 text-2xl hover:text-red-700"
              href="www.gg.com"
            >
              <i className="fab fa-instagram">
                <a href={SOCIAL_MEDIA.instagram} className="ml-10">
                  <FaInstagram />
                </a>
              </i>
            </a>
            <a
              className="text-blue-700 py-2 text-2xl hover:text-blue-500"
              href="www.gg.com"
            >
              <i className="fab fa-twitter">
                <a href={SOCIAL_MEDIA.twitter} className="ml-10">
                  {" "}
                  <FaTwitter />
                </a>
              </i>
            </a>
            <a
              className="text-red-700 py-2 text-2xl hover:text-red-500"
              href="www.gg.com"
            >
              <i className="fab fa-youtube">
                <a href={SOCIAL_MEDIA.youtube} className="ml-10">
                  {" "}
                  <FaYoutube />
                </a>
              </i>
            </a>
          </div>
        </div>

        {/* service section */}
        <div className="flex flex-col text-left italic mx-2">
          <div className="text-base text-gray-400 w-full my-4 not-italic">
            Services
          </div>
          {SERVICES.map((service, index) => {
            return (
              <a
                key={index}
                className="text-black py-2 text-base hover:text-blue-600"
                href={service.link}
              >
                {" "}
                {service.name}
              </a>
            );
          })}
        </div>

        {/* support section */}
        <div className="flex flex-col text-left italic mx-2">
          <div className="text-base text-gray-400  mt-4 mb-4 not-italic">
            Support
          </div>
          <a
            className="text-black py-2 text-base hover:text-blue-600"
            href="/about-us"
          >
            {" "}
            About us
          </a>
          <a
            className="text-black py-2 text-base hover:text-blue-600"
            href="/contact-us"
          >
            {" "}
            Contact us{" "}
          </a>

          {/* social media section */}
          <div className="text-black py-2 text-base hover:text-blue-600 items-center justify-left">
            <div className="flex flex-row ">
              <span className="pr-10 pt-3">
                <FaAddressBook />{" "}
              </span>
              {CONTACTDETAILS.address}
            </div>
          </div>
          <div className="text-black py-2 text-base hover:text-blue-600 ">
            <div className="flex flex-row items-center justify-left ">
              <span className="pr-10 ">
                <FaPhoneAlt />{" "}
              </span>
              <a href={`tel:${CONTACTDETAILS.phone}`}>{CONTACTDETAILS.phone}</a>
            </div>
          </div>
          <div className="text-black py-2 text-base hover:text-blue-600 ">
            <div className="flex flex-row items-center justify-left ">
              <span className="pr-10 ">
                <FaEnvelope />{" "}
              </span>
              <a href={`mailto:${CONTACTDETAILS.email}`}>
                {CONTACTDETAILS.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* copyright section */}
      <div className="text-green-500 font-bold text-center mt-5">
        @ Copyright Reserved 2021
      </div>
    </div>
  );
};
export default Footer;
