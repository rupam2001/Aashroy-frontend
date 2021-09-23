import React from "react";
import { FaDonate } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

const NgoCard = ({ _id, name, about, geo_location }) => {
  return (
    <div className={"p-5 my-4 bg-white shadow rounded md:w-2/5 w-full"}>
      <Link to={"/ngo/profile/" + _id}>
        <h3 className="text-lg font-bold">{name}</h3>
      </Link>
      <p className="text-blue-400">{geo_location.address}</p>
      <p className="text-gray-500 italic">{about.substr(0, 80)} ...</p>
      {
        <div className="flex justify-end mt-4">
          <Link to={"/general/donate/" + _id}>
            <button className="mr-6 text-green-400 flex flex-col items-center">
              <FaDonate className="text-xl" />
              Donate
            </button>
          </Link>
        </div>
      }
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
