import React, { useContext, useEffect, useRef, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { MdFilterList, MdPlace, MdPerson } from "react-icons/md";
import { NgoContext } from "../../../contexts/ngo.context";
import { getCurrentGeoLocationAsync } from "../../../utils/location";
import {
  fetchHomelessAsync,
  searchHomelessAsync,
} from "../../../api/homeless.api";
import "./style.css";
export default function NgoHomeLess() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("place");
  const [diameter, setDiameter] = useState(50);
  const [homelessList, setHomelessList] = useState([]);
  const modelRef = useRef(null);
  const showModel = () => {
    modelRef.current.style.display = "flex";
  };
  const hideModel = () => {
    modelRef.current.style.display = "none";
  };

  //at first show the reports nearest to ngo
  const ngocontext = useContext(NgoContext);
  const getBaseLocationAsync = async () => {
    // get the base location which is the location of ngo
    if (ngocontext.ngoDetails) {
      const { geo_location } = ngocontext.ngoDetails;
      return geo_location;
    }
    return await getCurrentGeoLocationAsync();
  };

  const loadInitialHomelessDataAsync = async () => {
    const geo_location = await getBaseLocationAsync();
    const { homeless_list } = await fetchHomelessAsync({
      geo_location,
      diameter,
    });
    if (homeless_list) {
      setHomelessList(homeless_list);
    }
    console.log(homeless_list);
  };
  useEffect(() => {
    loadInitialHomelessDataAsync();
  }, [ngocontext.ngoDetails]);

  const handleImageClick = (homeless) => {};
  const handleSearchAsync = async () => {
    const { homeless_list } = await searchHomelessAsync({
      address: searchQuery,
      diameter,
    });
    if (!homeless_list) {
      setHomelessList([]);
      return;
    }
    setHomelessList(homeless_list);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse h-screen">
      <div className="md:flex-initial md:flex-1 md:w-1/3 bg-gray-100 md:min-h-screen flex flex-col items-center py-4 px-4 h-1/3 md:overflow-y-auto">
        <div className="flex w-full items-center h-auto sticky top-0">
          <SearchBar
            onChange={(text) => {
              setSearchQuery(text);
            }}
            onSearchClick={() => {
              handleSearchAsync();
            }}
            containerClass="flex-1 rounded"
            value={searchQuery}
          />
          <MdFilterList
            className="text-4xl  md:mx-2 text-blue-500 cursor-pointer"
            onClick={showModel}
          />
        </div>
        <div className="mt-10">
          {homelessList.map((each_homeless) => {
            return (
              <div className="my-5">
                <div>
                  <h2 className="text-gray-600 font-bold">
                    {each_homeless.geo_location.address} :
                  </h2>
                </div>
                <div className="container grid grid-cols-3 gap-2 mx-auto mt-10">
                  {each_homeless.media_url.map((media) => (
                    <div className="w-full rounded " key={media.url}>
                      <img
                        src={media.url}
                        alt="image"
                        className="cursor-pointer"
                        onClick={() => {
                          handleImageClick(each_homeless);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 bg-blue-300 md:min-h-screen  shadow">
        Map goes here
      </div>

      <div
        id="myModal"
        className="fixed hidden z-10000 left-0 top-0 w-full h-full bg-black bg-opacity-50  flex justify-center items-center py-10 bg-transparent"
        ref={modelRef}
      >
        <div className=" h-full md:w-1/2 w-full px-4 rounded-md flex flex-col items-center justify-center ">
          <div className="flex justify-end w-full h-10 items-end"></div>
          <div className="py-0 md:py-2 bg-gray-100 md:w-1/3 w-1/2 flex flex-col items-center rounded shadow">
            <div className="flex justify-between items-center w-full px-4">
              {" "}
              <h2 className="font-bold">Filter By:</h2>
              <span className="close text-red-400 text-2xl" onClick={hideModel}>
                &times;
              </span>
            </div>
            <ol className="w-full mx-2 mt-2 ">
              <li className=" flex items-center  my-0  bg-white p-4 font-bold  shadow cursor-pointer hover:shadow-lg">
                <MdPlace className="text-lg text-green-500 mr-2" />
                <h2 className="text-blue-500"> Place Name</h2>
              </li>
              <li className=" flex items-center  my-0  bg-white p-4 font-bold  shadow cursor-pointer hover:shadow-lg">
                <MdPerson className="text-lg text-green-500 mr-2" />
                <h2 className="text-blue-500"> Person's Name</h2>
              </li>
            </ol>
            <div className="bg-white w-full px-2 py-8">
              <h2 className="font-bold">
                Radius of area{" "}
                <span className="text-red-500">({diameter}km)</span>
              </h2>
              <input
                class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
                type="range"
                min="1"
                max="100"
                step="1"
                value={diameter}
                onChange={(e) => {
                  setDiameter(e.target.value);
                }}
                title={diameter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getRandomColor = () => {
  const list = [
    "text-green-500",
    "text-red-500",
    "text-blue-500",
    "text-black",
    "text-gray-500",
  ];
  return list[Math.random() * (list.length - 1)];
};
