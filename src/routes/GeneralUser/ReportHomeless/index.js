import React, { useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import TextField from "../../../components/TextField";
import imageSizeReducer from "../../../utils/imageSizeReducer";
import { HOMELESS_REPORT_PHOTO_LIMIT } from "../../../constants/generalUserForm.constants";
import { FaArrowAltCircleRight, FaFileUpload } from "react-icons/fa";
import { reportHomeless } from "../../../api/reportHomeless.api";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function ReportHomeless() {
  const history = useHistory();

  const [media, setMedia] = useState([]);
  const [address, setAddress] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
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

  return (
    <UserLayout>
      <div
        id="report-container"
        className="flex flex-col lg:justify-evenly lg:flex-row-reverse h-full w-full lg:items-center"
      >
        <div
          id="map-container"
          className="bg-gray-700 h-60 lg:h-full w-full text-white"
        >
          {/* contains map */}
          Map
        </div>
        <div id="report-form-container" className="flex flex-col lg:w-1/3">
          <h1 className="text-blue-500 rounded m-3 mt-0 p-3 text-lg font-bold">
            Report Homeless
          </h1>

          {/* address field */}
          <TextField
            state={[address, setAddress]}
            placeholder="Address"
            containerClass="m-3"
          />

          {/* show images preview if any */}
          {media.length > 0 && (
            <div className="m-3 p-1 flex overflow-x-scroll">
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
                className="flex justify-center cursor-pointer items-center text-gray-700 border-2 h-20 border-dotted m-3 p-3"
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
            * A maximum of {HOMELESS_REPORT_PHOTO_LIMIT} images can be uploaded
            at once
          </span>

          {/* next button */}
          <button
            onClick={submitHandler}
            className="flex justify-center items-center text-white rounded bg-blue-500 focus:bg-blue-700 m-3 p-3 text-lg"
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
