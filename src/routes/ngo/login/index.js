import React, { useContext, useState, useEffect } from "react";
import TextField from "../../../components/TextField";
import PasswordField from "../../../components/PasswordField";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { ngoLoginAsync } from "../../../api/auth.api";
import {
  setAccessTokenNGO,
  setRefreshToken,
  setRefreshTokenNgo,
} from "../../../utils/storage";
import { NgoContext } from "../../../contexts/ngo.context";
import { toast } from "react-toastify";

const LoginFormSection = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const ngocontext = useContext(NgoContext);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async () => {
    // API Call here
    const { access_token, refresh_token, ngoData } = await ngoLoginAsync({
      email: emailAddress,
      password,
    });
    if (!access_token) {
      toast.error("Something went wrong");
      return;
    }
    setAccessTokenNGO(access_token);
    setRefreshTokenNgo(refresh_token);
    ngocontext.setNgoDetails(ngoData);
    ngocontext.setIsLoggedIn(true);
    history.push("/ngo/home");
    history.go(0);
  };

  if (ngocontext.isLoggedIn) {
    history.push("/ngo/home");
    return <></>;
  }

  return (
    <div className="pb-20 md:px-0">
      <p className="text-2xl mb-2 font-bold">Login to Aashroy</p>
      <p className="mb-6">
        Don't have an account?{" "}
        <Link to="/ngo/registration">
          <span className="text-red-300 font-bold hover:underline">
            Create account
          </span>
        </Link>
      </p>
      <div className="flex flex-col">
        <TextField
          placeholder="Email Address"
          containerClass="mb-5"
          state={[emailAddress, setEmailAddress]}
        />
        <PasswordField
          placeholder="Password"
          containerClass="mb-5"
          state={[password, setPassword]}
        />
      </div>
      <button
        onClick={submitHandler}
        className="w-full py-3 mb-4 bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 transition duration-100"
      >
        LOGIN
      </button>
      <p className="text-gray-500 text-sm cursor-pointer select-none">
        Forgot password?
      </p>
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
    <div className="flex ngo-login-root bg-blue-600">
      <div className=" bg-gray-100 lg:w-4/6 w-full md:px-20 px-5 py-16">
        <Link className="text-3xl font-bold text-blue-600" to="/">
          Aashroy
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <LoginFormSection />
        </div>
        {/* <FootLinks
          links={[
            { title: "Privacy Policy", to: "http://google.com" },
            { title: "Help", to: "http://youtube.com" },
            { title: "Terms & Conditions", to: "http://facebook.com" },
          ]}
        /> */}
      </div>
      <div className="container lg:w-2/6 md:block hidden ngo-login-hero-section">
        <div className="w-full h-full flex items-center justify-center">
          <HeroSection />
        </div>
      </div>
    </div>
  );
};

export default Registration;
