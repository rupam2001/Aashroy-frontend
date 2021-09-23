import React, { useEffect, useRef } from "react";
import { MdPeople, MdLocationOn } from "react-icons/md";
const SearchResultMain = ({
  topImages,
  heading,
  info: { totalPeople },
  handleViewPhotoClick,
  handleVisualizeClick,
}) => {
  const imgRef = useRef(null);

  useEffect(() => {}, []);
  return (
    <div className="w-full h-full  mt-2">
      <div className="w-full h-2/4 overflow-hidden">
        <img src={topImages[0].url} ref={imgRef} className="w-full h-auto" />
      </div>
      <div className="py-4 flex items-center">
        <MdLocationOn className="text-2xl text-red-500 " />
        <h1 className="text-2xl text-blue-600 font-bold">{heading}</h1>
      </div>
      <hr />
      <div className="flex justify-evenly my-4 items-center">
        <div className="flex flex-col items-center">
          <MdPeople className="text-3xl text-blue-600" />
          <p className="text-xs text-blue-600">Reported by {totalPeople}</p>
        </div>
        <div>
          <button
            onClick={handleViewPhotoClick}
            className="border-2 p-2 rounded-3xl border-blue-500 text-blue-600 hover:text-white hover:bg-blue-600 text-sm"
          >
            View Photos
          </button>
        </div>
        <div>
          {handleVisualizeClick && (
            <button
              onClick={handleVisualizeClick}
              className="border-2 p-2 rounded-3xl border-blue-500 text-blue-600 hover:text-white hover:bg-blue-600 text-sm"
            >
              Visualize
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SearchResultMain;
