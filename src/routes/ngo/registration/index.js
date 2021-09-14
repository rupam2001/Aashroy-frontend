import React from "react";
import "./style.css";

const LoginFormSection = () => (
  <div className="container w-96 pb-20">
    <p className="text-2xl mb-2 font-bold">Login to Aashroy</p>
    <p className="mb-6">
      Don't have an account?{" "}
      <span className="text-red-300 font-bold">Create account</span>
    </p>
    <div className="flex flex-col">
      <input
        placeholder="Email address"
        className="rounded shadow-md px-4 py-3 mb-5"
      ></input>
      <input
        placeholder="Password"
        type="password"
        className="rounded shadow-md px-4 py-3 mb-5"
      ></input>
    </div>
    <button className="py-3 mb-4 w-96 bg-blue-500 text-white rounded font-bold text-sm hover:bg-blue-600 transition duration-100">
      LOGIN
    </button>
    <p className="text-gray-500 text-sm">Forgot password?</p>
  </div>
);

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
    <div className="flex ngo-registration-root">
      <div className="bg-gray-100 lg:w-3/5 w-full px-20 py-16">
        <p className="text-3xl font-bold text-blue-600">Aashroy</p>
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
      <div className="container bg-blue-600 w-2/5 lg:block hidden">
        <div className="w-full h-full flex items-center justify-center">
          <HeroSection />
        </div>
      </div>
    </div>
  );
};

export default Registration;
