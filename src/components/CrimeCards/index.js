import React from "react";

const CrimeCards = ({ body, crimeType, title, place }) => {
  return (
    <div className="bg-white shadow my-2 p-4">
      <div className="py-2">
        <h2 className="font-bold">{title}</h2>
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
