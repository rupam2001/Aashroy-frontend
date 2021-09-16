import React, { useState, useEffect } from "react";
import UserLayout from "../../../layouts/UserLayout";
import TextField from "../../../components/TextField";
import imageSizeReducer from "../../../utils/imageSizeReducer";
import { HOMELESS_REPORT_PHOTO_LIMIT } from "../../../constants/generalUserForm.constants";

import { useHistory } from "react-router-dom";

function ReportHomeless() {
  const history = useHistory();

  const [media, setMedia] = useState([]);
  const [address, setAddress] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleFileSelection = (e) => {
    // function to handle if new files are selected
    let files = e.target.files;

    if (files)
      // reduce size and store them in media
      imageSizeReducer(files, setMedia, HOMELESS_REPORT_PHOTO_LIMIT);
  };

  const submitHandler = () => {
    // submits the form and froward to user to the additional data form
    // submit form and receive the parent id
    // const parentId =
    // forward with reference to parent
    // history.push('/general/report-homeless/additional-info', {parentId: parentId})
  };

  return (
    <UserLayout>
      <div
        id="report-container"
        className="flex flex-col lg:justify-evenly lg:flex-row-reverse w-screen h-screen"
      >
        <div
          id="map-container"
          className="bg-gray-700 h-1/2 lg:h-full w-full text-white"
        >
          Map
        </div>
        <div id="report-form-container" className="flex flex-col lg:w-2/4">
          <h1 className="text-blue-500 rounded m-3 p-3 text-lg font-bold">
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
              <input
                type="file"
                className="shadow-md px-4 py-3 border-dotted m-3 p-3"
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
            className="flex justify-center items-center text-white rounded bg-blue-500 m-3 p-3 text-lg"
          >
            Next&nbsp;
          </button>
        </div>
      </div>
    </UserLayout>
  );
}

export default ReportHomeless;
