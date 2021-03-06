import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DefaultLayout from "../../layouts/default.layout";
import DonationBoard from "../../components/DonationBoard";
import { getDonationData } from "../../api/donationBoard.api";

import * as FontAwsome from "react-icons/fa";
import "./style.css";

const GalleryWall = () => {
  return (
    <div
      className="flex flex-wrap justify-evenly py-5"
      style={{ backgroundColor: "#fff" }}
    >
      {[
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Teal_Black_White_Photo_Homelessness_Poster_oz1bhe.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Brown_Carton_Homelessness_Poster_o5miud.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Red_and_Black_Hands_Homeless_Poster_sd7ebh.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Blue_Beige_Photo_Homelessness_Poster_kxxxxy.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Orange_Photo_Homelessness_Poster_nafgu9.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Pink_and_Black_Photo_Homelessness_Awareness_Poster_epun86.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Brown_Yellow_Photo_Modern_Homelessness_Poster_a5joov.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Blue_and_Grayscale_Photo_Homelessness_Poster_podw7a.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Green_and_White_Square_Photo_Frame_Homelessness_Poster_tf2ku5.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Cyan_Hand_Homelessness_Poster_ypvmul.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Orange_Blue_Photo_Homelessness_Poster_a2ag7w.png",
        "https://res.cloudinary.com/dmmrlohoi/image/upload/c_scale,w_500/v1632550822/aashroy/Black_White_with_Photo_Homelessness_Fact_Awareness_Poster_ixge1b.png",
      ].map((url) => {
        return <img className="my-5" src={url} style={{ width: 300 }} />;
      })}
    </div>
  );
};

const CTAButton = ({ title, bgColor, color, containerClass, to }) => {
  return (
    <Link to={to}>
      <div
        className={`md:w-auto w-full py-3 px-10 mx-2 border-2 border-white rounded font-bold transition duration-100 cursor-pointer text-center md:mb-0 mb-5 ${containerClass}`}
        style={{ backgroundColor: bgColor, color }}
      >
        {title}
      </div>
    </Link>
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
      <div className="md:px-0 px-10 md:pb-0 pb-16 hero-section-content">
        <div className="text-3xl md:text-7xl text-white font-bold text-center hero-title mb-5">
          Help the Homeless
          <br /> Get Them their AASHROY
        </div>
        <p className="text-white text-center">
          An initiative towards humanity under JORHAT ENGINEERING COLLEGE
        </p>
        <div className="flex mt-10 flex-col justify-center items-center">
          <div className="flex md:mb-5 justify-center items-center flex-col md:flex-row">
            <CTAButton
              to="/general/report-homeless"
              title="Report Homeless"
              bgColor="#fbbf24"
              containerClass="rounded-3xl"
            />
            <CTAButton
              to="/report-crime"
              title="Report Crime"
              bgColor="black"
              color="#fff"
              containerClass="rounded-3xl"
            />
          </div>
          <div className="md:w-96">
            <CTAButton
              to="/ngo/list"
              title="??? Donate Now"
              color="#000"
              bgColor="#fff"
              containerClass="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SponsorSection = () => {
  const ICON_SIZE = 70;
  const ICON_COLOR = "#ccc";

  return (
    <div className="my-16">
      <div className="text-center mb-10">OUR SPONSORS</div>
      <div className="flex mb-10 flex-wrap justify-center items-center">
        <FontAwsome.FaAws
          size={ICON_SIZE}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
        <FontAwsome.FaDigitalOcean
          size={ICON_SIZE}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
        <FontAwsome.FaFacebookSquare
          size={80}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
        <FontAwsome.FaGoogle
          size={ICON_SIZE}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
        <FontAwsome.FaUbuntu
          size={ICON_SIZE}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
        <FontAwsome.FaSkype
          size={ICON_SIZE}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
        <FontAwsome.FaPlaystation
          size={ICON_SIZE}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
        <FontAwsome.FaPhoenixSquadron
          size={ICON_SIZE}
          color={ICON_COLOR}
          className="mx-10 md:my-0 my-5"
        />
      </div>
    </div>
  );
};

const DonationBoardSection = () => {
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    // fetch data and pass it to donation board to display
    (async () => {
      const rdata = await getDonationData(0, 20);
      setRecentDonations(rdata.donations);
    })();
  }, []);

  return (
    <div>
      <DonationBoard donations={recentDonations} showImage={false} />
      <Link className="px-4 text-blue-600" to="/public-contribution">
        View More ???
      </Link>
    </div>
  );
};

const Landing = () => {
  return (
    <DefaultLayout>
      <HeroSection />
      <div className="bg-white pt-20 pb-20">
        <div className=" max-w-6xl mx-auto md:px-4 px-7 ">
          <div className="flex flex-col  md:flex-row">
            <div className="md:w-1/2">
              <Link to="/general/report-homeless">
                <div className="mb-12 cursor-pointer">
                  <p className="mb-2 font-bold cursor-default text-3xl">
                    Report homeless
                  </p>
                  <p className="mb-2 cursor-default  text-justify">
                    Detect the person you saw roaming around in search of
                    Aashroy and ask the authorities to help them.
                  </p>
                  <p className=" text-blue-600">Report Now ???</p>
                </div>
              </Link>
              <Link to="/report-crime" className="cursor-pointer">
                <div className="mb-20">
                  <p className="mb-2 font-bold cursor-default text-3xl">
                    Crime Report
                  </p>
                  <p className="mb-2 cursor-default  text-justify">
                    Be the voice of the homeless and report any anonymous
                    activity against these helpless.
                  </p>
                  <p className="text-blue-600">
                    <a href="#">Make report for crime ???</a>
                  </p>
                </div>
              </Link>

              {[
                "Hey! Are you a socialist? Whatever you are! You as a human, can too join our hands and be a part of our social motive - Aashroy for homeless people.",
                "NGOs, government representives, journalists, socialists and common people too can join our hands.",
              ].map((item, index) => (
                <p
                  className="mb-4 leading-8 text-justify"
                  key={`home_list_1_${index}`}
                >
                  {item}
                </p>
              ))}
              <div className="mb-12 mt-12">
                <p className="mb-2 font-bold">NGO</p>
                <p className="mb-2">
                  Get data on homeless population, crimes and more. Work for
                  upliftment of the homeless.
                </p>
                <p className=" text-blue-600">
                  <Link to="/ngo/registration">Register Now ???</Link>
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="md:px-16">
                <DonationBoardSection />
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
