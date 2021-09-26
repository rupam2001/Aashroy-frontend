import React, { useContext, useEffect, useRef, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { MdFilterList, MdPlace, MdPerson } from "react-icons/md";
import { BsFilter } from "react-icons/bs";
import { NgoContext } from "../../../contexts/ngo.context";
import { getCurrentGeoLocationAsync } from "../../../utils/location";
import {
  fetchHomelessAsync,
  getHomelessPersonAsync,
  searchHomelessAsync,
  searchHomelessPeopleAsync,
} from "../../../api/homeless.api";
import "./style.css";
import SearchResultGallery from "../../../components/SeachResultGallery";
import SearchResultMain from "../../../components/SearchResultMain";
import Map from "../../../components/Map";
import HomelessPerson from "../../../components/HomelessPerson";
import SearchFilterModel from "../../../components/SearchFilterModal";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function NgoHomeLess() {
  const SEARCH_RESULT_MODES = {
    MAIN: "main",
    GALLERY: "gallery",
    PERSONS: "persons",
  };

  const [homelessPersons, setHomelessPersons] = useState([]);
  const [days, setDays] = useState(1);
  const ngocontext = useContext(NgoContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("place");
  const [searchResultTitle, setSearchResultTitle] = useState("People arround ");
  const [diameter, setDiameter] = useState(20);
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
      days,
    });
    // alert(JSON.stringify(homeless_list));
    if (homeless_list) {
      setTopImages(topImages);
      console.log(topImages);
      setHomelessList(homeless_list);
      setSearchResultTitle("Near " + ngocontext.ngoDetails?.name);
    }
    // console.log(homeless_list);
    setHomelessMap(homelessMap);
  };
  useEffect(() => {
    loadInitialHomelessDataAsync();
    setSearchResultTitle("People near " + ngocontext.ngoDetails?.name);
  }, [ngocontext.ngoDetails]);

  const handleImageClick = async (homeless) => {
    const { _id } = homeless;
    const { homeless_person, notfound } = await getHomelessPersonAsync({ _id });

    if (notfound) {
      return;
    }
    console.log(homeless_person);
    setHomelessPersons(homeless_person);
    setCurrentSearchResultMode(SEARCH_RESULT_MODES.PERSONS);
  };
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
    const { homeless_list, msg, topImages, homelessMap } =
      await searchHomelessAsync({
        address: searchQuery,
        diameter,
        days,
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
      _markers.push({ ...h.geo_location, media_url: h.media_url });
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
      <div className="md:flex-initial md:w-1/3 bg-gray-100 md:min-h-screen flex flex-col items-center py-4 px-4 h-1/3 md:overflow-y-auto">
        <div className="flex w-full items-center h-auto sticky top-0">
          <SearchBar
            placeholder="Search by Location"
            onChange={(text) => {
              setSearchQuery(text);
            }}
            onSearchClick={() => {
              handleSearchAsync();
            }}
            containerClass="flex-1 rounded"
            value={searchQuery}
          />
          <div className="md:ml-2 p-2 bg-white shadow rounded cursor-pointer text-blue-500 hover:bg-blue-500 hover:text-white transition duration-100">
            <BsFilter className="text-4xl " onClick={showModel} />
          </div>
        </div>
        {currentSearchResultMode == SEARCH_RESULT_MODES.MAIN && (
          <SearchResultMain
            diameter={diameter}
            days={days}
            topImages={_topImages}
            heading={searchResultTitle}
            info={{ totalPeople: homelessList.length }}
            handleViewPhotoClick={handleViewPhoto}
          />
        )}
        {currentSearchResultMode == SEARCH_RESULT_MODES.GALLERY && (
          <div className="mt-4">
            <button
              onClick={() => {
                setCurrentSearchResultMode(SEARCH_RESULT_MODES.MAIN);
              }}
              className=" text-blue-600 "
            >
              &#8592; Back
            </button>

            {homelessList.length > 0 ? (
              <SearchResultGallery
                homelessList={homelessList}
                handleImageClick={handleImageClick}
                containerClass="mt-5"
                homelessMap={homelessMap}
              />
            ) : null}
          </div>
        )}
        {currentSearchResultMode == SEARCH_RESULT_MODES.PERSONS && (
          <div className="w-full mt-5">
            <div className="px-2">
              <button
                onClick={() => {
                  setCurrentSearchResultMode(SEARCH_RESULT_MODES.GALLERY);
                }}
                className=" text-blue-600 "
              >
                &#8592; Back
              </button>
              <h2 className="text-gray-500 font-bold pt-4 pb-2">
                Peoples in this report:{" "}
              </h2>
              <hr />
              {homelessPersons &&
                homelessPersons.map((hp) => <HomelessPerson {...hp} />)}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 bg-blue-300 md:min-h-screen  shadow">
        {markers.length > 0 ? (
          <Map
            markers={markers}
            region={[markers[0].longitude, markers[0].latitude]}
            customPopup={customPopup}
          />
        ) : (
          <Map region={[94.2463553, 26.7459721]} />
        )}
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

const customPopup = (marker) =>
  `<div><img src="${marker.media_url[0].url}" width=300/><h2 class="text-center mt-4 font-bold"> ${marker.address}</h2></div>`;
