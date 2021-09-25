import React, { useEffect, useRef } from "react";
import { MdPeople, MdLocationOn, MdPhotoLibrary } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi";
import { FaChartLine, FaMapMarkedAlt } from "react-icons/fa";
const SearchResultMain = ({
  topImages,
  heading,
  info: { totalPeople },
  handleViewPhotoClick,
  handleVisualizeClick,
  handleMapShowClick,
  diameter,
  days,
}) => {
  const imgRef = useRef(null);

  useEffect(() => {
    console.log("HEREE!!!!", topImages);
  }, []);
  return (
    <div className="w-full h-auto mt-2 rounded">
      <div className="w-full  max-h-64 overflow-hidden bg-red-500">
        <img
          src={topImages[0].url}
          ref={imgRef}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="py-4 flex items-center px-5 bg-white border">
        <div className="p-3 bg-blue-100 rounded-full mr-5">
          <MdLocationOn className="text-2xl text-blue-700" />
        </div>

        <div>
          <h1 className="text-xl text-blue-600 font-bold">{heading}</h1>
          <div className="text-black">Showing within {diameter} km and {days} days</div>
        </div>
      </div>
      <hr />
      <div className="w-full py-4 px-5 mt-2 flex items-center justify-content p-2 text-red-700 text-sm bg-white border">
        <div className="p-3 bg-red-100 rounded-full mr-5">
          <MdPeople className="text-2xl text-red-700" />
        </div>
        <div>
          <div className="text-lg">{totalPeople} Reports </div>
          <div className="text-black">Check reports by searching</div>
        </div>
      </div>
      <div className="flex justify-evenly my-4 items-center flex-col">
        {handleVisualizeClick && (
          <button
            onClick={handleVisualizeClick}
            className="bg-white border w-full py-4 px-5 flex items-center justify-between p-2 text-blue-700 hover:text-white hover:bg-blue-600 text-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-100 rounded-full mr-5">
                <FaChartLine className="text-2xl text-blue-700" />
              </div>
              <div>
                <div className="text-lg text-left">Visualize</div>
                <div className="text-black">View data in charts</div>
              </div>
            </div>

            <HiChevronRight size={30} />
          </button>
        )}
        {handleMapShowClick && (
          <button
            onClick={handleMapShowClick}
            className="bg-white border w-full py-4 px-5 flex items-center justify-between p-2 text-blue-700 hover:text-white hover:bg-blue-600 text-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-100 rounded-full mr-5">
                <FaMapMarkedAlt className="text-2xl text-blue-700" />
              </div>
              <div>
                <div className="text-lg text-left">Show Map </div>
                <div className="text-black">
                  Check reports on an interactive map
                </div>
              </div>
            </div>

            <HiChevronRight size={30} />
          </button>
        )}
      </div>
      <hr />
      <button
        onClick={handleViewPhotoClick}
        className="bg-white border w-full py-4 px-5 flex items-center justify-between p-2 text-yellow-700 hover:text-white hover:bg-yellow-600 text-sm"
      >
        <div className="flex">
          <div className="p-3 bg-yellow-100 rounded-full mr-5">
            <MdPhotoLibrary className="text-2xl text-yellow-700" />
          </div>
          <div>
            <div className="text-lg text-left">View Photos </div>
            <div className="text-black">Check reports by searching</div>
          </div>
        </div>

        <HiChevronRight size={30} />
      </button>
    </div>
  );
};

export default SearchResultMain;
