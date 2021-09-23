import React, { useEffect, useState } from "react";
import Map from "../Map";
import { FaMapMarkerAlt } from "react-icons/fa";
import { reverseGeocode } from "../../api/reverseGeocoding.api";
import "./style.css";

const LocationPicker = ({ region, onCordinateChange, onRGCResponse }) => {
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    onCordinateChange(center);
    (async () => {
      const place_name = await reverseGeocode(center);
      onRGCResponse(place_name);
    })();
  }, [center]);

  return (
    <div className="h-full w-full relative">
      <div className="pointer-events-none absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FaMapMarkerAlt size={40} color="red" className="mb-9" />
      </div>
      <Map region={region} center={[center, setCenter]} />
    </div>
  );
};

export default LocationPicker;
