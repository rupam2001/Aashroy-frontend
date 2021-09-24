import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../../layouts/default.layout";
import * as FontAwsome from "react-icons/fa";
import "./style.css";

const GalleryWall = () => {
  return (
    <div
      className="flex flex-wrap justify-evenly py-5"
      style={{ backgroundColor: "#fff" }}
    >
      {[
        "https://picsum.photos/seed/picsum/300/300",
        "https://picsum.photos/seed/rtwrt/300/300",
        "https://picsum.photos/seed/adfz/300/300",
        "https://picsum.photos/seed/adsfasdf/300/300",
        "https://picsum.photos/seed/fdgha/300/300",
        "https://picsum.photos/seed/rtey/300/300",
        "https://picsum.photos/seed/dg/300/300",
        "https://picsum.photos/seed/ty/300/300",
        "https://picsum.photos/seed/ryud/300/300",
        "https://picsum.photos/seed/jmrtu/300/300",
        "https://picsum.photos/seed/wert/300/300",
        "https://picsum.photos/seed/rwt/300/300",
      ].map((url) => {
        return (
          <img className="my-5" src={url} style={{ height: 300, width: 300 }} />
        );
      })}
    </div>
  );
};

const CTAButton = ({ title }) => {
  return (
    <div className="py-3 px-10 mx-4 border-2 border-white text-white rounded font-bold text-sm hover:bg-blue-700 transition duration-100 cursor-pointer">
      {title}
    </div>
  );
};

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="hero-section flex flex-col items-center justify-center relative">
      <div
        className="hero-section-image"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      ></div>
      <div className="text-7xl text-white font-bold text-center hero-title mb-5">
        Some Heading About Something Will Go Here
      </div>
      <p className="text-white">
        Exercitation aliqua est ut veniam eu nulla sint aliqua exercitation
        irure culpa quis aliquip enim
      </p>
      <div className="flex mt-8">
        <CTAButton title="Submit" />
        <CTAButton title="Submit" />
        <CTAButton title="Submit" />
      </div>
    </div>
  );
};

const SponsorSection = () => {
  return (
    <div className="my-16">
      <div className="text-center mb-8">OUR SPONSORS</div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex mb-10">
          <FontAwsome.FaAws size={80} color="gray" className="mx-10" />
          <FontAwsome.FaDigitalOcean size={80} color="gray" className="mx-10" />
          <FontAwsome.FaFacebookSquare
            size={80}
            color="gray"
            className="mx-10"
          />
          <FontAwsome.FaGoogle size={80} color="gray" className="mx-10" />
        </div>
        <div className="flex">
          <FontAwsome.FaUbuntu size={80} color="gray" className="mx-10" />
          <FontAwsome.FaSkype size={80} color="gray" className="mx-10" />
          <FontAwsome.FaPlaystation size={80} color="gray" className="mx-10" />
          <FontAwsome.FaPhoenixSquadron
            size={80}
            color="gray"
            className="mx-10"
          />
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <DefaultLayout>
      <HeroSection />
      <div className="bg-white pt-20 pb-20">
        <div className=" max-w-6xl mx-auto md:px-4 px-7 ">
          <div className="flex">
            <div className="md:w-1/2">
              <Link to="/general/report-homeless">
                <div className="mb-12">
                  <p className="mb-2 font-bold cursor-default text-3xl">
                    Report homeless
                  </p>
                  <p className="mb-2 cursor-default">
                    Cupidatat sit exercitation et velit velit enim magna
                    deserunt consequat.
                  </p>
                  <p className=" text-blue-600">
                    <a href="#">
                      <u>GO</u> {">>>"}
                    </a>
                  </p>
                </div>
              </Link>
              <div className="mb-20">
                <p className="mb-2 font-bold cursor-default text-3xl">
                  Crime Report
                </p>
                <p className="mb-2 cursor-default">
                  Cupidatat sit exercitation et velit velit enim magna deserunt
                  consequat.
                </p>
                <p className="text-blue-600">
                  <a href="#">
                    <u>Make report for crime</u> {">>>"}
                  </a>
                </p>
              </div>

              {[
                "Adipisicing sunt occaecat sit qui ea esse aliqua sunt id officia culpa cupidatat eu voluptate. \
          Veniam occaecat mollit fugiat ipsum aliqua non laborum voluptate non id. Enim sint ut ex non adipisicing amet elit laboris quis aliqua veniam culpa.",
                "Incididunt consectetur nisi aute consequat velit sunt laborum laboris eu ullamco velit irure. Amet dolor fugiat ullamco aliquip laboris.",
                "Velit eu sit excepteur fugiat commodo Lorem commodo excepteur labore ea dolore sint fugiat. Reprehenderit cillum labore aliquip enim commodo sint nisi et reprehenderit.",
              ].map((item, index) => (
                <p className="mb-4 leading-8" key={`home_list_1_${index}`}>
                  {item}
                </p>
              ))}
              <div className="mb-12 mt-12">
                <p className="mb-2 font-bold">NGO</p>
                <p className="mb-2">By YAy</p>
                <p className=" text-blue-600">
                  <a
                    target="_blank"
                    href="https://news.google.com/covid19/map?hl=en-IN&gl=IN&ceid=IN%3Aen&mid=%2Fm%2F03rk0"
                    rel="noopener noreferrer"
                  >
                    <u>Login</u> {">>>"}
                  </a>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 md:block hidden">
              <div className="pl-20">
                <img
                  height={800}
                  width={640}
                  src="https://source.unsplash.com/36PPJckrJY8/640X800"
                  alt="Helping hands"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GalleryWall />
      <SponsorSection />
    </DefaultLayout>
  );
};

export default Landing;
