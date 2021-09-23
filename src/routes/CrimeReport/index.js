// page to report crimes

import React, { useState, useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import {
  CRIME_TYPES,
  MAX_PHOTO_LIMIT_CRIME_REPORT,
} from "../../constants/crimeReport.constants";
import imageSizeReducer from "../../utils/imageSizeReducer";
import { submitCrimeReport } from "../../api/crimeReport.api";
import LocationPicker from "../../components/LocationPicker";
import { getCurrentGeoLocationAsync } from "../../utils/location";

import { FaHome, FaPeopleCarry } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

// links for the navbar
const NavbarLinks = [
  { icon: <FaHome className="text-base" />, name: "Home", link: "/" },
  {
    icon: <MdPersonAdd className="text-base" />,
    name: "Report Homeless",
    link: "/general/report-homeless",
  },
  {
    icon: <FaPeopleCarry className="text-base" />,
    name: "Donate",
    link: "/general/donate",
  },
];

function ReportCrime() {
  const history = useHistory();

  const [geoLocation, setGeoLocation] = useState({
    latitude: 26.7459721,
    longitude: 94.2463553,
  });
  const [reverseGeocodingAddress, setReverseGeocodingAddress] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState(CRIME_TYPES[0]);
  const [typeDesc, setTypeDesc] = useState("");
  const [report, setReport] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to handle if new files are selected
  const handleFileSelection = (e) => {
    if (loading) return;
    let files = e.target.files;

    if (files)
      // reduce size and store them in media
      imageSizeReducer(files, setMedia, MAX_PHOTO_LIMIT_CRIME_REPORT);
  };

  // function to submit data to server using tha api call
  const submitHandler = async () => {
    // validate
    if (address.length < 1) {
      toast.error("Address cannot be empty");
      return;
    } else if (report.length < 1) {
      toast.error("Report cannot be empty");
      return;
    }

    setLoading(true);
    try {
      // call api function
      const result = await toast.promise(
        submitCrimeReport(
          setLoading,
          type,
          typeDesc,
          { ...geoLocation, address },
          reverseGeocodingAddress,
          report,
          media
        ),
        {
          pending: "Uploading data",
          success: "Successfully uploaded",
          error: "Oops! Something went wrong",
        }
      );
    } catch (err) {
      toast.error(err);
    }
    // send the user back to home page
    history.replace("/");
  };

  useEffect(() => {
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

  const cordinateChangeHandler = (center) => {
    setGeoLocation({
      latitude: parseFloat(center[1]),
      longitude: parseFloat(center[0]),
    });
  };

  const onRGCResponseHandler = (placeName) => {
    setReverseGeocodingAddress(placeName);
  };

  return (
    <>
      <UserNavbar NavbarLinks={NavbarLinks} />

      {/* main form */}
      <div className="min-w-screen flex flex-col md:flex-row-reverse justify-center">
        {/* map */}
        <div
          id="crime-report-map-container"
          className="md:w-2/3 md:h-screen h-96"
        >
          <LocationPicker
            region={[geoLocation.longitude, geoLocation.latitude]}
            onCordinateChange={cordinateChangeHandler}
            onRGCResponse={onRGCResponseHandler}
          />
        </div>

        {/* form */}
        <div
          id="crime-report-form-container"
          className="shadow-md md:w-1/3 p-3 m-3"
        >
          {/* crime address */}
          <div className="flex flex-col pb-2">
            <label className="text-gray-400 text-sm">Address :</label>
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={"rounded p-2 w-full border-2 border-gray-200"}
            />
          </div>

          {/* crime type */}
          <div className="flex pb-3 pt-2 item-center">
            <label for="select-gender" className="text-gray-400 text-sm">
              Crime type :&nbsp;
            </label>
            <select
              id="select-gender"
              name="gender"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white text-sm"
              disabled={loading}
            >
              {CRIME_TYPES.map((item, index) => (
                <option className="bg-white" read key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* crime type description */}
          <div className="flex flex-col pb-2">
            <label className="text-gray-400 text-sm">
              A brief description on the type of crime :
            </label>
            <input
              disabled={loading}
              className="border-2 p-2 border-gray-100 rounded"
              value={typeDesc}
              onChange={(e) => setTypeDesc(e.target.value)}
              placeholder="Type here..."
            />
          </div>

          {/* brief report on the crime */}
          <div className="flex flex-col pb-2">
            <label className="text-gray-400 text-sm">
              A brief description on the crime :
            </label>
            <textarea
              disabled={loading}
              type="number"
              className="border-2 p-2 resize-none border-gray-100 rounded"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Type here..."
            />
          </div>

          {/* photos associated with the crime */}
          {/* show images preview if any */}
          {media.length > 0 && (
            <div className="my-2 p-3 flex overflow-x-scroll">
              {media.map((item, index) => {
                return (
                  <img className="m-1" key={index} src={item} alt="previews" />
                );
              })}
            </div>
          )}
          {/* upload/capture images */}
          {media.length < MAX_PHOTO_LIMIT_CRIME_REPORT && (
            <>
              <label
                for="file-upload"
                className="flex justify-center cursor-pointer items-center text-gray-700 border-2 h-20 border-dotted my-2 p-3"
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
          <span className="text-sm mx-3 text-gray-600">
            * A maximum of {MAX_PHOTO_LIMIT_CRIME_REPORT} images can be uploaded
            at once
          </span>
          <br />
          <span className="text-sm mx-3 text-gray-600">
            * Your identity will be completely anonymous
          </span>

          {/* button to upload data */}
          <button
            onClick={submitHandler}
            className={
              "flex w-full justify-center items-center text-white rounded  focus:bg-blue-700 p-3 text-lg bg-blue-500"
            }
          >
            Submit
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ReportCrime;
