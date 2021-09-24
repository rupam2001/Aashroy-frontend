import React, { useEffect, useRef } from "react";
import { MdPeople, MdLocationOn, MdPhotoLibrary } from "react-icons/md";
import { FaChartLine, FaMapMarkedAlt } from "react-icons/fa";
const SearchResultMain = ({
  topImages,
  heading,
  info: { totalPeople },
  handleViewPhotoClick,
  handleVisualizeClick,
  handleMapShowClick,
}) => {
  const imgRef = useRef(null);

  useEffect(() => {}, []);
  return (
    <div className="w-full h-auto bg-white mt-2">
      <div className="w-full  max-h-64 overflow-hidden bg-red-500 ">
        <img
          src={topImages[0].url}
          ref={imgRef}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="py-4 flex items-center">
        <MdLocationOn className="text-2xl text-red-500 " />
        <h1 className="text-2xl text-blue-600 font-bold">{heading}</h1>
      </div>
      <hr />
      <div className="flex justify-evenly my-4 items-center">
        <div className="flex flex-col items-center">
          <MdPeople className="md:text-3xl  text-blue-600" />
          <p className="text-xs text-blue-600">Reports {totalPeople}</p>
        </div>
        <div>
          <button
            onClick={handleViewPhotoClick}
            className="flex md:flex-row flex-col  items-center justify-content md:border-2 border-0 p-2 rounded-3xl border-blue-500 text-blue-600 hover:text-white hover:bg-blue-600 text-sm"
          >
            <MdPhotoLibrary />
            <span className="ml-1 text-xs"> View Photos</span>
          </button>
        </div>
        <div>
          {handleVisualizeClick && (
            <button
              onClick={handleVisualizeClick}
              className="flex md:flex-row flex-col  items-center justify-content md:border-2 border-0 p-2 rounded-3xl border-blue-500 text-blue-600 hover:text-white hover:bg-blue-600 text-sm"
            >
              <FaChartLine />
              <span className="ml-1 text-xs"> Visualize</span>
            </button>
          )}
        </div>
        <div>
          {handleMapShowClick && (
            <button
              onClick={handleMapShowClick}
              className="flex md:flex-row flex-col  items-center justify-content md:border-2 border-0 p-2 rounded-3xl border-blue-500 text-blue-600 hover:text-white hover:bg-blue-600 text-sm"
            >
              <FaMapMarkedAlt />
              <span className="ml-1 text-xs">Show Map</span>
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SearchResultMain;
