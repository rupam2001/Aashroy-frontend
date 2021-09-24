import React, { useContext, useEffect, useRef, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { MdFilterList, MdPlace, MdPerson } from "react-icons/md";
import { NgoContext } from "../../../contexts/ngo.context";
import { getCurrentGeoLocationAsync } from "../../../utils/location";
import "./style.css";
import SearchResultGallery from "../../../components/SeachResultGallery";
import SearchResultMain from "../../../components/SearchResultMain";
import Map from "../../../components/Map";
import {
  fetchCrimesAsync,
  searchCrimesAsync,
} from "../../../api/crimeData.api";
import CrimeCards from "../../../components/CrimeCards";
import TableWrapper from "../../../components/TableWrapper";
import { crimeColumn } from "../../../constants/table.constants";
import Table from "../../../components/Table";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function NgoCrimeReportView() {
  const SEARCH_RESULT_MODES = {
    MAIN: "main",
    GALLERY: "gallery",
  };
  const [showDataVis, setDataVis] = useState(false);
  const ngocontext = useContext(NgoContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("place");
  const [searchResultTitle, setSearchResultTitle] = useState("People arround ");
  const [diameter, setDiameter] = useState(10);
  const [crimeList, setCrimeList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [currentSearchResultMode, setCurrentSearchResultMode] = useState(
    SEARCH_RESULT_MODES.MAIN
  );
  const [_topImages, setTopImages] = useState([""]);
  const [days, setDays] = useState(7);
  const modelRef = useRef(null);
  const [crimeMap, setCrimeMap] = useState({});
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
    const { crime_list, topImages, crimeMap } = await fetchCrimesAsync({
      geo_location,
      diameter,
      days,
    });
    // alert(JSON.stringify(crime_list));
    if (crime_list) {
      setTopImages(topImages);
      setCrimeList(crime_list);
    }
    // console.log(crime_list);
    setCrimeMap(crimeMap);
  };
  useEffect(() => {
    loadInitialHomelessDataAsync();
    setSearchResultTitle("Crimes near " + ngocontext.ngoDetails?.name);
  }, [ngocontext.ngoDetails]);

  const handleImageClick = (homeless) => {};
  const handleSearchAsync = async () => {
    if (searchQuery == "") {
      loadInitialHomelessDataAsync();

      return;
    }
    if (filter == "place") {
      placeWiseSearchAsync();
    }
    if (filter == "people") {
    }
  };

  const placeWiseSearchAsync = async () => {
    const { crime_list, msg, topImages, crimeMap } = await searchCrimesAsync({
      address: searchQuery,
      diameter,
      days,
    });
    if (!crime_list && !topImages) {
      setTopImages(topImages);
      setSearchResultTitle("no results");
      setCrimeList([]);
      return;
    }
    setTopImages(topImages);
    setSearchResultTitle(msg);
    setCrimeList(crime_list);
    setCrimeMap(crimeMap);
  };

  const getMarkers = (crime_list) => {
    let _markers = [];
    crime_list.forEach((h) => {
      _markers.push(h.geo_location);
    });
    console.log(_markers);
    return _markers;
  };
  useEffect(() => {
    setMarkers(getMarkers(crimeList));
  }, [crimeList]);
  const handleViewPhoto = () => {
    setCurrentSearchResultMode(SEARCH_RESULT_MODES.GALLERY);
  };
  const handleVisualizeClick = () => {
    setDataVis(true);
  };
  return (
    <div className="flex md:flex-row flex-col-reverse h-screen">
      <div className=" shadow md:flex-initial md:flex-1 md:w-1/3 bg-gray-100 md:min-h-screen flex flex-col items-center py-4 px-4 h-1/3 md:overflow-y-auto">
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
          <div>
            <SearchResultMain
              topImages={_topImages}
              heading={searchResultTitle}
              info={{ totalPeople: crimeList.length }}
              handleViewPhotoClick={handleViewPhoto}
              handleVisualizeClick={handleVisualizeClick}
              handleMapShowClick={() => {
                setDataVis(false);
              }}
            />
            <div>
              {crimeList.map((crime) => (
                <CrimeCards
                  body={crime.brief_report}
                  title={crime.type}
                  crimeType={crime.type_description}
                  place={crime.reverse_geocoding_address}
                />
              ))}
            </div>
          </div>
        )}
        {/* {currentSearchResultMode == SEARCH_RESULT_MODES.MAIN && */}

        {currentSearchResultMode == SEARCH_RESULT_MODES.GALLERY &&
          crimeList.length && (
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
                crimeList={crimeList}
                handleImageClick={handleImageClick}
                containerClass="mt-5"
                homelessMap={crimeMap}
              />
            </div>
          )}
        {}
      </div>
      <div
        className={
          !showDataVis
            ? "flex-1 md:min-h-screen shadow overflow-hidden"
            : "flex-1 md:min-h-screen shadow overflow-scroll"
        }
      >
        {!showDataVis && markers.length != 0 && (
          <Map
            markers={markers}
            region={[markers[0].longitude, markers[0].latitude]}
            regionColor="#ff6969"
          />
        )}
        <div className=" md:h-screen md:w-full ">
          {showDataVis && (
            <TableWrapper data={crimeList} columns={crimeColumn} />
          )}
        </div>
      </div>

      <SearchFilterModel
        diameter={diameter}
        setDiameter={setDiameter}
        showModel={showModel}
        hideModel={hideModel}
        modelRef={modelRef}
        onSelectFilter={(f) => setFilter(f)}
        days={days}
        setDays={setDays}
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
  days,
  setDays,
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
              max="500"
              step="5"
              value={diameter}
              onChange={(e) => {
                setDiameter(e.target.value);
              }}
              title={diameter}
            />
          </div>
          <div className="bg-white w-full px-2 py-8">
            <h2 className="font-bold">Last {days} Days </h2>
            <input
              class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
              type="range"
              min="1"
              max="100"
              step="1"
              value={days}
              onChange={(e) => {
                setDays(e.target.value);
              }}
              title={days}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
