import React from "react";
import { FaCrown, FaHeart } from "react-icons/fa";

function TopContributors({ contributors }) {
  return (
    <div className="flex flex-col w-full h-full p-2 rounded">
      <div className="flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold">
        Top Contributors <FaHeart className="text-pink-500 mx-1" />
      </div>

      {contributors.length < 1 && <span className="p-3">No Data yet 😭</span>}

      {/* contributors */}
      {contributors.map((contributor, index) => {
        return (
          <div key={contributor._id}>
            <div className="flex flex-wrap py-3 w-full items-center text-gray-500">
              <FaCrown className="text-red-600 mx-2" />
              <span>{index + 1}</span>
              {/* profile image */}
              <span className="h-8 w-8 mx-2 rounded-full bg-gray-500">
                <a href={`/general/profile/${contributor._id}`}>
                  <img
                    className="h-full rounded-full"
                    src={contributor.profile_pic || ""}
                    alt="mini_profile"
                  />
                </a>
              </span>
              <div className="flex flex-col">
                {/* name */}
                <a href={`/general/profile/${contributor._id}`}>
                  <span className="font-bold flex mr-1 text-blue-500">
                    {contributor.name}
                  </span>
                </a>

                <div className="text-red-500">
                  {contributor.contribution_points}{" "}
                  <span className="text-gray-500">contribution points</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopContributors;
