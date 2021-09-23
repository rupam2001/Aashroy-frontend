import React, { useEffect, useState } from "react";
import Map from "../Map";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationPicker = ({ region }) => {
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    console.log(center);
  }, [center]);

  return (
    <div className="h-screen w-screen relative">
      <div className="pointer-events-none w-40 h-40  absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FaMapMarkerAlt size={40} color="red" />
      </div>
      <Map region={region} center={[center, setCenter]} />
    </div>
  );
};

export default LocationPicker;
