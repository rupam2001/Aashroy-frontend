// card to display data of general user and also to edit them
import React, { useState } from "react";

import { FaEdit } from "react-icons/fa";

function GeneralUserProfileCard({ requestUpdate, userData }) {
  const [userName, setUserName] = useState("");
  const [canEdit, setCanEdit] = useState(false);

  // ui state
  const [displayTooltip, setDisplayTooltip] = useState(false);

  return (
    <div className="relative p-3 w-full shadow-md flex flex-col md:w-1/2 md:flex-row-reverse md:justify-between items-center">
      {/* edit button */}
      {!canEdit && (
        <button
          onClick={() => setCanEdit(true)}
          className="absolute float-right right-0 top-0 m-3 text-xl text-blue-500"
        >
          <FaEdit />
        </button>
      )}

      {/* // */}
      <div
        id="user_profile_picture"
        className="border-2 border-gray-300 h-32 w-32 md:mr-14 rounded"
      >
        <img
          src={userData.profile_pic}
          alt="user_profile"
          className="w-full h-full"
        />
      </div>
      <div id="user_profile_details" className="p-3 relative">
        <h2 className="text-blue-400 font-semibold text-2xl pb-3">
          Profile Details
        </h2>

        {/* email */}
        <div className="">
          <span className="text-sm text-gray-400">Email :&nbsp;</span>
          <span className="">{userData.email}</span>
        </div>

        {/* name */}
        <div className="">
          <span className="text-sm text-gray-400">Name :&nbsp;</span>
          {canEdit ? (
            <input
              value={userName}
              className="px-1 bg-gray-200"
              onChange={(e) => setUserName(e.target.value)}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>

        {/* points */}
        <div>
          <span
            className="text-sm text-gray-400"
            onMouseOver={() => {
              setDisplayTooltip(true);
            }}
            onMouseLeave={() => {
              setDisplayTooltip(false);
            }}
          >
            Contribution points :&nbsp;
          </span>
          <span className="text-red-400 font-bold">
            {userData.contribution_points}
          </span>
        </div>
        <span
          className={`text-xs absolute top-0 w-40 left-0 bg-blue-50 rounded-md p-2 ${
            displayTooltip ? "opacity-100" : "opacity-0"
          } `}
        >
          Reporting homeless gives you 5 points, giving additional information
          and donation completion gives you 10 and 20 points respectively.
        </span>

        {/* submit and cancel buttons */}
        {canEdit && (
          <div className="p-3 flex flex-row justify-center">
            <button
              onClick={() => setCanEdit(false)}
              className="flex justify-center items-center border-2 border-blue-400 text-blue-500 rounded bg-white focus:bg-blue-700 focus:text-white m-1 px-2 py-1"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setCanEdit(false);
                requestUpdate(userName);
              }}
              className="flex justify-center items-center text-white rounded bg-blue-500 focus:bg-blue-700 m-1 px-2 py-1"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneralUserProfileCard;
