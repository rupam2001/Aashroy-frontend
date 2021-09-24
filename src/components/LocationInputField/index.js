import React, { useEffect, useState } from "react";
import LocationPicker from "../LocationPicker";
import { getCurrentGeoLocationAsync } from "../../utils/location";
import { HiOutlineLocationMarker, HiOutlineMap } from "react-icons/hi";
import TextField from "../TextField";

const LocationInputField = ({
  containerClass,
  onCordinateChange,
  onRGCResponse,
}) => {
  const [address, setAddress] = useState("");
  const [geoLocation, setGeoLocation] = useState([94.2463553, 26.7459721]);

    useEffect(() => {
      onRGCResponse(address);
    }, [address]);

    useEffect(() => {
      onCordinateChange(geoLocation);
    }, [geoLocation]);

  useEffect(() => {
    (async () => {
      // obtain geo location
      const location = await getCurrentGeoLocationAsync();
      setGeoLocation([location.coords.longitude, location.coords.latitude]);
    })();
  }, []);

  const cordinateChangeHandler = (center) => {
    setGeoLocation([parseFloat(center[0]), parseFloat(center[1])]);
  };

  const updateAddress = (text) => setAddress(text);

  return (
    <div className={`rounded shadow-md w-full bg-white ${containerClass}`}>
      <div className="flex py-3">
        <div className="flex justify-center flex-col pl-4 pr-3 select-none">
          <HiOutlineLocationMarker size={16} color="grey" />
        </div>
        <div className="px-4">Location</div>
      </div>
      <div className="h-60">
        <LocationPicker
          region={geoLocation}
          onCordinateChange={cordinateChangeHandler}
          onRGCResponse={updateAddress}
        />
      </div>
      <TextField
        head={<HiOutlineMap size={16} color="grey" />}
        placeholder="Address"
        state={[address, setAddress]}
        noShadow={true}
      />
    </div>
  );
};

export default LocationInputField;
