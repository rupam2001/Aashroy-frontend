import React, { useContext, useEffect, useRef, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { MdFilterList, MdPlace, MdPerson } from "react-icons/md";
import { NgoContext } from "../../../contexts/ngo.context";
import { getCurrentGeoLocationAsync } from "../../../utils/location";
import {
  fetchHomelessAsync,
  searchHomelessAsync,
  searchHomelessPeopleAsync,
} from "../../../api/homeless.api";
import "./style.css";
import SearchResultGallery from "../../../components/SeachResultGallery";
import SearchResultMain from "../../../components/SearchResultMain";
import Map from "../../../components/Map";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function NgoHomeLess() {
  const SEARCH_RESULT_MODES = {
    MAIN: "main",
    GALLERY: "gallery",
  };
  const ngocontext = useContext(NgoContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("place");
  const [searchResultTitle, setSearchResultTitle] = useState("People arround ");
  const [diameter, setDiameter] = useState(10);
  const [homelessList, setHomelessList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [currentSearchResultMode, setCurrentSearchResultMode] = useState(
    SEARCH_RESULT_MODES.MAIN
  );
  const [_topImages, setTopImages] = useState([""]);
  const modelRef = useRef(null);
  const [homelessMap, setHomelessMap] = useState({});
  const showModel = () => {
    modelRef.current.style.display = "flex";
  };

  const hideModel = () => {
    modelRef.current.style.display = "none";
  };

  //at first show the reports nearest to ngo

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
    const { homeless_list, topImages, homelessMap } = await fetchHomelessAsync({
      geo_location,
      diameter,
    });
    // alert(JSON.stringify(homeless_list));
    if (homeless_list) {
      setTopImages(topImages);
      setHomelessList(homeless_list);
    }
    // console.log(homeless_list);
    setHomelessMap(homelessMap);
  };
  useEffect(() => {
    loadInitialHomelessDataAsync();
    setSearchResultTitle("People near " + ngocontext.ngoDetails?.name);
  }, [ngocontext.ngoDetails]);

  const handleImageClick = (homeless) => {};
  const handleSearchAsync = async () => {
    if (filter == "place") {
      placeWiseSearchAsync();
    }
    if (filter == "people") {
    }
  };

  const placeWiseSearchAsync = async () => {
    const { homeless_list, msg, topImages, homelessMap } =
      await searchHomelessAsync({
        address: searchQuery,
        diameter,
      });
    if (!homeless_list && !topImages) {
      setTopImages(topImages);
      setSearchResultTitle("no results");
      setHomelessList([]);
      return;
    }
    setTopImages(topImages);
    setSearchResultTitle(msg);
    setHomelessList(homeless_list);
    setHomelessMap(homelessMap);
  };

  const getMarkers = (homeless_list) => {
    let _markers = [];
    homeless_list.forEach((h) => {
      _markers.push(h.geo_location);
    });
    console.log(_markers);
    return _markers;
  };
  useEffect(() => {
    setMarkers(getMarkers(homelessList));
  }, [homelessList]);
  const handleViewPhoto = () => {
    setCurrentSearchResultMode(SEARCH_RESULT_MODES.GALLERY);
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
        {currentSearchResultMode == SEARCH_RESULT_MODES.MAIN && (
          <SearchResultMain
            topImages={_topImages}
            heading={searchResultTitle}
            info={{ totalPeople: homelessList.length }}
            handleViewPhotoClick={handleViewPhoto}
          />
        )}
        {currentSearchResultMode == SEARCH_RESULT_MODES.GALLERY &&
          homelessList.length && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setCurrentSearchResultMode(SEARCH_RESULT_MODES.MAIN);
                }}
                className=" text-blue-600 "
              >
                &#8592; Back
              </button>
              <SearchResultGallery
                homelessList={homelessList}
                handleImageClick={handleImageClick}
                containerClass="mt-5"
                homelessMap={homelessMap}
              />
            </div>
          )}
        {}
      </div>
      <div className="flex-1 bg-blue-300 md:min-h-screen  shadow">
        <Map markers={markers} region={[markers[0]]} />
      </div>

      <SearchFilterModel
        diameter={diameter}
        setDiameter={setDiameter}
        showModel={showModel}
        hideModel={hideModel}
        modelRef={modelRef}
        onSelectFilter={(f) => setFilter(f)}
      />
    </div>
  );
}

const SearchFilterModel = ({
  diameter,
  setDiameter,
  showModel,
  hideModel,
  modelRef,
  onSelectFilter,
}) => {
  return (
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
            {/* <li
              className=" flex items-center  my-0  bg-white p-4 font-bold  shadow cursor-pointer hover:shadow-lg"
              onClick={() => {
                onSelectFilter("place");
              }}
            >
              <MdPlace className="text-lg text-green-500 mr-2" />
              <h2 className="text-blue-500"> Place Name</h2>
            </li>
            <li
              className=" flex items-center  my-0  bg-white p-4 font-bold  shadow cursor-pointer hover:shadow-lg"
              onClick={() => {
                onSelectFilter("person");
              }}
            >
              <MdPerson className="text-lg text-green-500 mr-2" />
              <h2 className="text-blue-500"> Person's Name</h2>
            </li> */}
          </ol>
          <div className="bg-white w-full px-2 py-8">
            <h2 className="font-bold">
              Diameter of area{" "}
              <span className="text-red-500">({diameter}km)</span>
            </h2>
            <input
              class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
              type="range"
              min="10"
              max="100"
              step="5"
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
  );
};
