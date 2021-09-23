import React, { useState, useEffect } from "react";
import UserLayout from "../../../layouts/UserLayout";
import TextField from "../../../components/TextField";
import imageSizeReducer from "../../../utils/imageSizeReducer";
import { HOMELESS_REPORT_PHOTO_LIMIT } from "../../../constants/generalUserForm.constants";
import { FaArrowAltCircleRight, FaFileUpload } from "react-icons/fa";
import { reportHomeless } from "../../../api/reportHomeless.api";
import { getCurrentGeoLocationAsync } from "../../../utils/location";
import Map from "../../../components/Map";
import LocationPicker from "../../../components/LocationPicker";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function ReportHomeless() {
  const history = useHistory();

  const [media, setMedia] = useState([]);
  const [address, setAddress] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [geoLocation, setGeoLocation] = useState({
    latitude: 26.7459721,
    longitude: 94.2463553,
  });
  const [reverseGeocodingAddress, setReverseGeocodingAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileSelection = (e) => {
    if (loading) return;
    // function to handle if new files are selected
    let files = e.target.files;

    if (files)
      // reduce size and store them in media
      imageSizeReducer(files, setMedia, HOMELESS_REPORT_PHOTO_LIMIT);
  };

  const submitHandler = async () => {
    // data validation
    if (media.length < 1) {
      toast.error("At least one image has to be included.");
      return;
    }

    // submits the form and froward to user to the additional data form
    // submit form and receive the parent id
    setLoading(true);

    const parentId = await toast.promise(
      reportHomeless(
        setLoading,
        numberOfPeople,
        { ...geoLocation, address },
        reverseGeocodingAddress,
        media
      ),
      {
        pending: "Uploading data",
        success: "Successfully uploaded",
        error: "Oops! Something went wrong",
      }
    );

    // forward with reference to parent
    history.push("/general/report-homeless/additional-info", {
      parentId: parentId,
    });
  };

  useEffect(() => {
    console.log("awaiting location");
    (async () => {
      // obtain geo location
      const location = await getCurrentGeoLocationAsync();
      console.log(location);
      setGeoLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    console.log(geoLocation);
  }, [geoLocation]);

  const cordinateChangeHandler = (center) => {
    setGeoLocation({
      latitude: parseFloat(center[1]),
      longitude: parseFloat(center[0]),
    });
  };

  return (
    <UserLayout>
      <div
        id="report-container"
        className="flex flex-col lg:justify-evenly lg:flex-row-reverse h-full w-full"
      >
        <div id="map-container" className=" h-96 lg:h-screen w-full text-white">
          {/* contains map */}
          <div className="h-full bg-red-100">
            <LocationPicker
              region={[geoLocation.longitude, geoLocation.latitude]}
              onCordinateChange={cordinateChangeHandler}
            />
          </div>
        </div>
        <div id="report-form-container" className="flex flex-col lg:w-1/3 p-3">
          <h1 className="text-blue-500 rounded m-3 mt-0 p-3 text-lg font-bold">
            Report Homeless
          </h1>

          {/* address field */}
          <label className="text-gray-400 text-sm">Address : </label>
          <TextField
            state={[address, setAddress]}
            placeholder="Address"
            containerClass=""
          />

          {/* number of people */}
          <div className="flex flex-col pb-2 my-3">
            <label className="text-gray-400 text-sm">Number of people : </label>
            <input
              disabled={loading}
              type="number"
              min="0"
              className="shadow-md p-3 rounded outline-none"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
            />
          </div>

          {/* show images preview if any */}
          {media.length > 0 && (
            <div className=" p-1 flex overflow-x-scroll">
              {media.map((item, index) => {
                return (
                  <img className="m-1" key={index} src={item} alt="previews" />
                );
              })}
            </div>
          )}

          {/* upload/capture images */}
          {media.length < HOMELESS_REPORT_PHOTO_LIMIT && (
            <>
              <label
                for="file-upload"
                className="flex justify-center cursor-pointer items-center text-gray-700 border-2 h-20 border-dotted my-3 p-3"
              >
                Upload photos&nbsp;
                <FaFileUpload />
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                placeholder="photo"
                multiple
                accept="image/*"
                onChange={handleFileSelection}
                max="10"
              />
            </>
          )}
          <span className="text-sm text-gray-600">
            * A maximum of {HOMELESS_REPORT_PHOTO_LIMIT} images can be uploaded
            at once
          </span>

          {/* next button */}
          <button
            onClick={submitHandler}
            className="flex justify-center items-center text-white rounded bg-blue-500 focus:bg-blue-700 my-3 p-3 text-lg"
            disabled={loading}
          >
            Next&nbsp;
            <FaArrowAltCircleRight className="text-md" />
          </button>
        </div>
      </div>
    </UserLayout>
  );
}

export default ReportHomeless;
