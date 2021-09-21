import React, { useEffect, useState } from "react";
import { getNearestNGOSAsync } from "../../../api/ngoPublic.api";
import { getCurrentGeoLocationAsync } from "../../../utils/location";
import { FaDonate, FaAngleRight, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function NgoList() {
  const [ngoList, setNgoList] = useState([]);
  const [msg, setMsg] = useState("NGOs near you");
  const fetchInitialNgoListAsync = async () => {
    //get nearest ngos

    // get current location
    const position = await getCurrentGeoLocationAsync();
    const { latitude, longitude } = position.coords;

    const { ngos } = await getNearestNGOSAsync({
      diameter: -1,
      geo_location: { latitude, longitude },
    });
    //sort them
    const sorted_ngos = [...ngos].sort((a, b) => a.clossness - b.clossness);

    if (!ngos) return;
    setNgoList(sorted_ngos);
  };
  useEffect(() => {
    fetchInitialNgoListAsync();
  }, []);
  return (
    <div className=" w-full min-h-full flex flex-col items-center bg-gray-50 px-2 pt-6">
      <div className="w-full md:w-2/5 shadow flex item-center justify-center bg-white py-2 px-2">
        <input
          className="w-full outline-none text-lg "
          placeholder="Search..."
        />
        <FaSearch className="text-2xl text-blue-400" />
      </div>
      <p className="text-gray-400 mt-4">{msg}</p>
      {ngoList.map((n) => (
        <NgoCard {...n} />
      ))}
    </div>
  );
}

const NgoCard = ({ _id, name, about, geo_location }) => {
  return (
    <div className="p-5 my-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-blue-400">{geo_location.address}</p>
      <p className="text-gray-500 italic">{about.substr(0, 80)} ...</p>
      <div className="flex justify-end mt-4">
        <Link to={"/general/donate/" + _id}>
          <button className="mr-6 text-green-400 flex flex-col items-center">
            <FaDonate className="text-xl" />
            Donate
          </button>
        </Link>
        <Link to={"/ngo/profile/" + _id}>
          <button className=" text-blue-400 flex flex items-center justify-center">
            <p className="text-lg"> View</p>
            <FaAngleRight className="text-2xl" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export { NgoCard };
