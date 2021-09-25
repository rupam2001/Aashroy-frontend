import React, { useEffect, useState } from "react";
import {
  HiOutlineLibrary,
  HiOutlineKey,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import "./style.css";

import TextField from "../../../components/TextField";
import PasswordField from "../../../components/PasswordField";
import MultilineField from "../../../components/MultilineField";
import LocationInputField from "../../../components/LocationInputField";
import StrengthChecker from "../../../components/StrengthChecker";
import { Link } from "react-router-dom";
import { ngoRegisterAsync } from "../../../api/auth.api";
import { toast } from "react-toastify";

const RegistrationFormSection = () => {
  // Contants
  const ICON_SIZE = 16;

  const [ngoName, setNgoName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [aboutUs, setaboutUs] = useState("");
  const [address, setAddress] = useState("");
  const [geoLocation, setGeoLocation] = useState([94.2463553, 26.7459721]);

  const onCordinateChange = (center) => setGeoLocation(center);

  const onAddressChange = (text) => setAddress(text);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async () => {
    // API Call here
    //@testing
    const _location = {
      latitude: geoLocation[1],
      longitude: geoLocation[0],
      address,
    };
    //@

    const { success, msg, error } = await ngoRegisterAsync({
      name: ngoName,
      email: emailAddress,
      password,
      phone: phoneNumber,
      website,
      about: aboutUs,
      location: _location,
    });
    if (error) {
      toast.error("Something went wrong :(");
      return;
    }
    toast.success(msg);
    window.location.reload();
  };

  return (
    <div className="container w-96 pb-20">
      <p className="text-2xl mb-2 font-bold">Register on Aashroy</p>
      <p className="mb-6">
        Already have an account?{" "}
        <Link to="/ngo/login">
          <span className="text-red-300 font-bold hover:underline">Login</span>
        </Link>
      </p>
      <div className="flex flex-col">
        <TextField
          head={<HiOutlineLibrary size={ICON_SIZE} color="grey" />}
          placeholder="NGO Name"
          containerClass="mb-5"
          state={[ngoName, setNgoName]}
        />
        <TextField
          head={<HiOutlineMail size={ICON_SIZE} color="grey" />}
          placeholder="Email Address"
          containerClass="mb-5"
          state={[emailAddress, setEmailAddress]}
        />
        <PasswordField
          head={<HiOutlineKey size={ICON_SIZE} color="grey" />}
          placeholder="Password"
          containerClass={password.length > 6 ? "" : "mb-5"}
          state={[password, setPassword]}
        />
        {password.length > 6 ? (
          <StrengthChecker password={password} containerClass="mb-5" />
        ) : password.length !== 0 ? (
          <span className="mb-5 text-sm text-red-600">
            Password should be 6 or more character
          </span>
        ) : null}
        <TextField
          head={<HiOutlinePhone size={ICON_SIZE} color="grey" />}
          placeholder="Phone Number"
          containerClass="mb-5"
          state={[phoneNumber, setPhoneNumber]}
        />
        <TextField
          head={<HiOutlineGlobeAlt size={ICON_SIZE} color="grey" />}
          placeholder="Website"
          containerClass="mb-5"
          state={[website, setWebsite]}
        />
        <LocationInputField
          containerClass="mb-5"
          onCordinateChange={onCordinateChange}
          onRGCResponse={onAddressChange}
        />
        <MultilineField
          placeholder="About Us"
          containerClass="mb-5"
          state={[aboutUs, setaboutUs]}
        />
      </div>
      <button
        className="py-3 mb-4 w-full bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 transition duration-100"
        onClick={submitHandler}
      >
        REGISTER
      </button>
    </div>
  );
};

const HeroSection = () => (
  <div className="container px-20 text-gray-200">
    <h1 className="mb-6 text-4xl font-semibold leading-snug">
      Thank you for landing in our portal.
    </h1>
    <p className="text-sm leading-relaxed">
      It is a very overwhelming moment for us to work with such a high-peer
      organizations like you. We assure, that we together will bring a change to
      these homeless people and provide their rights as a human being in this
      world. We request you to please login or register for this virtuous leap .
    </p>
  </div>
);

const FootLinks = ({ links }) => (
  <div className="flex">
    {links.map((item) => {
      return (
        <a href={item.to} key={item.to} className="mx-6">
          <p className="text-sm text-gray-700">{item.title}</p>
        </a>
      );
    })}
  </div>
);

const Registration = () => {
  return (
    <div className="flex ngo-registration-root bg-blue-600">
      <div className="main-form-section bg-gray-100 lg:w-3/5 w-full md:px-20 px-5 py-16">
        <Link className="text-3xl font-bold text-blue-600" to="/">
          Aashroy
        </Link>
        <div className="w-full flex justify-center">
          <RegistrationFormSection />
        </div>
      </div>
      <div className="container bg-blue-600 w-2/5 lg:block hidden">
        <div className="w-full h-full flex items-center justify-center">
          <HeroSection />
        </div>
      </div>
    </div>
  );
};

export default Registration;
