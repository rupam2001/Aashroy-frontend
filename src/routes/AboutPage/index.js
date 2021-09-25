import React from "react";
import DefaultLayout from "../../layouts/default.layout";
import logo from "./logo.svg";
const DisplayName = () => (
  <div className="w-auto lg:-ml-40  ">
    <p className="text-5xl font-bold text-black  tracking-widest">AASHROY</p>
    <br />
    <p class="mb-8">
      <div class="mb-2  tracking-widest font-bold text-gray-700 leading-snug">
        A Charitable Journey for
      </div>
      <span className="pt-7 text-2xl leading-6 font-bold text-2xl text-gray-900 sm:leading-7">
        HOMELESS PEOPLE
      </span>
    </p>

    <button className=" py-3 mb-4 lg:w-80 w-60 bg-blue-600 tracking-widest text-white rounded-full font-bold text-sm hover:bg-red-700 transition duration-100">
      TEAM AURIN
    </button>
  </div>
);

const AboutSection = () => (
  <div className="text-justify p-10">
    <p className=" py-3  text-3xl space-y-4 text-gray-800  w-full">About us</p>
    <p class=" py-5 text-base space-y-4 text-gray-700 md:w-auto ">
      As homeless street people where a large section comprises of women and
      children , are more prone to trafficking, drug abuse and other crimes, our
      team has come up with effective solutions to monitor the living conditions
      and place they stay, so that relief materials and proper healthy support
      can be provided to these homeless.
      <br />
      <br />
      Our Project 'AASHROY' is a type of web portal that ensure proper health
      facilities and other aids especially to the homeless having physical or
      mental ailments by providing information about their temporary shelters to
      the government and volunteer organizations.
      <br />
      <br />
      In this website, we are developing and interactive platform to allow
      General public to report Homeless people or Crime a report anonymously.
      Moreover, NGO’s are invited to take the responsibility of the homeless
      people and use our tools to keep a track of these people and support them.
      Even Donations from Mankind are welcomed with security-encrypted policy
      for transaction.
    </p>
  </div>
);

const ServiceSection = () => (
  <div class="bg-white shadow-md overflow-hidden bg-blue-500">
    <div class="grid lg:grid-flow-col lg:items-center justify-center">
      <div class="flex-row mt-10 mb-10 lg:ml-32 lg:mr-32 ml-10 mr-10 items-center justify-center bg-blue-500">
        <span className="text-4xl lg:text-6xl font-bold text-white  tracking-widest">
          Our <br />
          Services
        </span>
        <br />
        <br />
        <div class="h-48 w-full flex">
          <div className=" p-10 w-full flex-shrink bg-white"></div>
        </div>
      </div>

      <div class="flex flex-col p-8 ml-10 mr-10 bg-blue-500">
        <div className="flex py-7">
          <div className="text-5xl mt-4 text-gray-300 font-bold">01</div>
          <div className="p-3"></div>
          <div className="2 ">
            <p class="block mt-1 text-3xl leading-tight font-bold text-white ">
              INTERACTIVE MAPS
            </p>
            <p class="mt-2 text-white">
              Detailed Location of the shelther of homeless people and the
              projects of NGO working for them
            </p>
          </div>
        </div>

        <div className="flex py-7">
          <div className="text-5xl mt-4 text-gray-300 font-bold">02</div>
          <div className="p-3"></div>
          <div className="2">
            <p class="block mt-1 text-3xl leading-tight font-bold text-white ">
              CRIME-REPORT
            </p>
            <p class="mt-2 text-white">
              Priviledge of raising voice for these helpless people
            </p>
          </div>
        </div>

        <div className="flex py-7">
          <div className="text-5xl mt-4 text-gray-300 font-bold">03</div>
          <div className="p-3"></div>
          <div className="2">
            <p class="block mt-1 text-3xl leading-tight font-bold text-white">
              SECURED DONATIONS
            </p>
            <p class="mt-2 text-white">
              We are providing the feature of donating people anonymously
              connected with the NGO's
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <DefaultLayout navbarSolid={true}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col lg:flex-row ">
          <div className="bg-white flex h-screen w-full lg:w-4/5  h-full items-center justify-center">
            <DisplayName />
          </div>
          <div className=" flex bg-blue-600 h-44 w-full lg:w-96 lg:h-screen items-center justify-center ">
            <div class="rounded-full lg:-ml-96 lg:mt-0 -mt-60 ml-0 lg:h-96 lg:w-96 h-60 w-60 flex items-center justify-center shadow-2xl  bg-white">
              <img src={logo} alt="Homeless people" />
            </div>{" "}
          </div>
        </div>

        <div className="w-full">
          <AboutSection />
        </div>
        <div className="w-full ">
          <ServiceSection />
        </div>
        <div className="  flex-col  w-full mb-8 mt-8">
          <div className="w-full  text-center text-4xl font-bold tracking-widest text-black ">
            TEAM AURIN
          </div>
          <div className="w-full  text-center text-xl space-y-4 text-black">
            A place of providing interactive solutions for people
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;
