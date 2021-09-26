import React from "react";

/**
 * Opens a Model containing two sliders for setting diameter and days
 * @param {
 * diameter: Number,
 * setDiameter: Callback(Number),
 * hideModel: Callback(void),
 * modelRef: React.useRef(),
 * days:Number,
 * setDays: Callback(NUmber)  }
 * @returns {JSX}
 */

const SearchFilterModel = ({
  diameter,
  setDiameter,
  hideModel,
  modelRef,
  days,
  setDays,
}) => {
  return (
    <div
      id="myModal"
      className="fixed hidden z-10000 left-0 top-0 w-full h-full bg-black bg-opacity-50  justify-center items-center py-10 bg-transparent"
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
          <ol className="w-full mx-2 mt-2 "></ol>
          <div className="bg-white w-full px-2 py-8">
            <h2 className="font-bold">
              Diameter of area :{" "}
              <span className="text-red-500">{diameter} km</span>
            </h2>
            <input
              class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full"
              type="range"
              min="1"
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

export default SearchFilterModel;
