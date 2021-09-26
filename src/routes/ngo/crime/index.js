import React, { useContext, useEffect, useRef, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import { BsFilter } from "react-icons/bs";
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
import SearchFilterModel from "../../../components/SearchFilterModal";

/**
 *
 * Handles Crime Reports
 * fetches crimes according to the filter
 * displays it with JSX
 */

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
  const [_topImages, setTopImages] = useState([""]); // top images to display in the main search result
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
      setSearchResultTitle("Crimes near " + ngocontext.ngoDetails?.name);
    }
    console.log(crime_list);
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
      console.log(h);
      _markers.push({
        ...h.geo_location,
        type: h.type,
        type_description: h.type_description,
        media_url: h.media_urls,
      });
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
          <div className="w-full">
            <SearchResultMain
              diameter={diameter}
              days={days}
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
                  date={crime.date}
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
            regionColor="#ff000075"
            customPopup={customPopup}
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

const customPopup = (marker) =>
  `<div><img src="${marker.media_url[0].url}" width=300 class="mb-2"/><h3 class="font-bold">${marker.address}</h3><h6 class="text-red-700 font-bold"">${marker.type}</h6><small>${marker.type_description}</small> </div>`;
