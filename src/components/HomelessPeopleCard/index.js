//
// component to display and take input for homeless people
//

import React from "react";
import { GENDERS, AGE_GROUPS } from "../../constants/generalUserForm.constants";
import imageSizeReducer from "../../utils/imageSizeReducer";

import { FaArrowRight, FaFileUpload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function HomelesssPeopleCard({
  canEdit,
  name,
  setName,
  gender,
  setGender,
  ageGroup,
  setAgeGroup,
  photo,
  setPhoto,
  index,
  deleteHandler,
}) {
  const handleFileSelection = (e) => {
    // function to handle if new files are selected
    let files = e.target.files;

    if (files)
      // reduce size and store them in media
      imageSizeReducer(files, setPhoto, 1);
  };

  return (
    <div
      className={
        "relative border-2 mb-3 rounded w-full md:max-w-2xl lg:max-w-5xl lg:min-h-64 p-3 flex flex-col lg:flex-row-reverse lg:justify-evenly lg:items-center" +
        (canEdit ? " border-blue-300" : " border-gray-200")
      }
    >
      {/* delete button */}
      {!canEdit && (
        <button
          onClick={() => deleteHandler(index)}
          className=" absolute z-10 top-0 right-0"
        >
          <MdDeleteForever className="text-red-500 text-3xl" />
        </button>
      )}

      <div id="photo-container-addform" className="">
        {/* upload file or if exist - display it */}
        {photo.length > 0 ? (
          <div className="flex justify-center">
            <img className="m-1" src={photo} alt="previews" />
          </div>
        ) : (
          canEdit && (
            <>
              <label
                for="file-upload"
                className="lg:w-full flex justify-center cursor-pointer items-center text-gray-700 border-2 h-20 border-dotted border-gray-400 rounded p-3"
              >
                Upload a Photo&nbsp;
                <FaFileUpload />
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                placeholder="photo"
                accept="image/*"
                onChange={handleFileSelection}
                max="10"
              />
            </>
          )
        )}
      </div>

      <div id="other-details-container-addform" className="lg:w-1/3">
        {/* name */}
        <input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={
            "rounded px-4 py-3 w-full my-3" +
            (canEdit ? " shadow-md" : " border-2 border-gray-200")
          }
          readOnly={!canEdit}
        />

        {/* gender */}
        <div
          className={
            "flex p-3 w-full rounded mb-3" +
            (canEdit ? " shadow-md" : " border-2 border-gray-200")
          }
        >
          <label
            for="select-gender"
            className="flex items-center w-full text-blue-700"
          >
            {canEdit ? "Select Gender" : "Gender"}&nbsp;
            <FaArrowRight className="text-sm" />
          </label>
          <select
            id="select-gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-white"
            disabled={!canEdit}
          >
            {GENDERS.map((item, index) => (
              <option className="bg-white" read key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* ageGroup */}
        <div
          className={
            "flex p-3 w-full rounded mt-3" +
            (canEdit ? " shadow-md" : " border-2 border-gray-200")
          }
        >
          <label
            for="age-group"
            className="flex items-center w-full text-blue-700"
          >
            {canEdit ? "Select Age Group" : "Age Group"}&nbsp;
            <FaArrowRight className="text-sm" />
          </label>
          <select
            id="age-group"
            name="age-group"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className=""
            disabled={!canEdit}
          >
            {AGE_GROUPS.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HomelesssPeopleCard);
