import React from "react";
import { FaDonate } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

const NgoCard = ({ _id, name, about, geo_location }) => {
  return (
    <div className={"px-6 py-5 my-4 bg-white shadow rounded md:w-2/5 w-full"}>
      <Link to={"/ngo/profile/" + _id}>
        <h3 className="text-xl font-bold mb-1">{name}</h3>
      </Link>
      <p className="text-blue-400 mb-3">{geo_location.address}</p>
      <p className="text-gray-500 italic">{about.substr(0, 150)} ...</p>

      <div className="flex justify-end mt-4">
        {/* <Link to={"/general/donate/" + _id}> */}
        <a
          href={"/general/donate/" + _id}
          className="mr-6 text-white flex flex-col items-center"
        >
          <div className="py-2 px-5 flex border-white bg-green-500 rounded font-bold text-sm transition duration-100 cursor-pointer text-center md:mb-0 mb-5">
            <FaDonate className="text-xl mr-2" />
            Donate
          </div>
        </a>
        {/* </Link> */}
      </div>
    </div>
  );
};

const NgoLoadingCard = () => {
  return (
    <div
      className={
        "p-5 my-4 bg-white shadow rounded animate-pulse md:w-2/5 w-full"
      }
    >
      <div className="text-lg font-bold bg-gray-200 h-12 w-1/2 mb-2"></div>
      <div className="text-blue-400 bg-gray-200 h-8 w-1/4 mb-2"></div>
      <div className="text-gray-500 bg-gray-200 italic h-20 w-full"></div>
    </div>
  );
};

export { NgoCard, NgoLoadingCard };
