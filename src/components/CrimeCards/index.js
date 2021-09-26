import React from "react";
import moment from "moment";
/**
 *
 * @param {body: String, crimeType: String, title: String, place:String, date: Date in miliseconds}
 * @returns
 */

const CrimeCards = ({ body, crimeType, title, place, date }) => {
  return (
    <div className="bg-white shadow my-2 p-4">
      <div className="py-2">
        <div className="flex justify-between">
          <h2 className="font-bold">{title}</h2>
          <h3 className="text-xs italic text-blue-400 transform scale-75 md:scale-100">
            {moment(date).format("LLL")}
          </h3>
        </div>
        <p className="text-sm text-green-500">{place}</p>
      </div>
      <div className="py-2 text-red-400">
        <p>{crimeType}</p>
      </div>
      <div className="italic text-sm text-gray-500">
        <p>{body}</p>
      </div>
    </div>
  );
};

export default CrimeCards;
