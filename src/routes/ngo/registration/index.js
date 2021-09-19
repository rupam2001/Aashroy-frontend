import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { ngoRegisterAsync } from "../../../api/auth.api";

const RegistrationFormSection = () => {
  // Contants
  const ICON_SIZE = 16;

  const [ngoName, setNgoName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [aboutUs, setaboutUs] = useState("");

  const submitHandler = async () => {
    // API Call here
    const fakeLocation = {
      latitude: 26.762094,
      longitude: 94.2125081,
      address: "Jorhat, 785001",
    };

    const { success, msg, error } = await ngoRegisterAsync({
      name: ngoName,
      email: emailAddress,
      password,
      phone: phoneNumber,
      website,
      about: aboutUs,
      location: fakeLocation,
    });
    if (error) {
      alert("Something went wrong :(");
      return;
    }
    alert(msg);
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
          containerClass="mb-5"
          state={[password, setPassword]}
        />
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
        <MultilineField
          placeholder="About Us"
          containerClass="mb-5"
          state={[aboutUs, setaboutUs]}
        />
      </div>
      <button
        className="py-3 mb-4 w-96 bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 transition duration-100"
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
      Some heading will go here, its really hot today
    </h1>
    <p className="text-sm leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ex elit,
      tincidunt venenatis mauris in, pretium bibendum tellus. Nullam vitae
      maximus sem, in convallis nisi. Maecenas laoreet augue libero, nec dictum
      dolor euismod nec. Fusce mollis et erat a ullamcorper.
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
      <div className="main-form-section bg-gray-100 lg:w-3/5 w-full px-20 py-10">
        <p className="text-3xl font-bold text-blue-600 mb-16">Aashroy</p>
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
