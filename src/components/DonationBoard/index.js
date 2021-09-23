// component to display donation data
// donation data object example :

import React from "react";

import { FaHandHoldingHeart, FaHeart } from "react-icons/fa";

function DonationBoard({ donations, showImage }) {
  return (
    <div className="flex flex-col w-full p-2 rounded">
      <div className="flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold">
        Donations <FaHeart className="text-pink-500 mx-1" />
      </div>

      {/* details */}
      {donations.map((donation) => {
        return (
          <div key={donation._id}>
            <div
              className="flex flex-wrap py-3 w-full items-center text-gray-500"
              id="donation-line"
            >
              <FaHandHoldingHeart className="text-pink-500 mx-2" />
              {/* profile image */}
              <span className="h-8 w-8 mx-2 rounded-full bg-gray-500">
                <a href={`/general/profile/${donation.donor._id}`}>
                  <img
                    className="h-full rounded-full"
                    src={donation.donor.profile_pic || ""}
                    alt="mini_profile"
                  />
                </a>
              </span>
              <div className="flex flex-col">
                {/* name */}
                <a href={`/general/profile/${donation.donor._id}`}>
                  <span className="font-bold flex mr-1 text-blue-500">
                    {donation.donor_name}
                  </span>
                </a>
                <div>
                  donated
                  {/* type */}
                  <span className="mx-1 text-black font-semibold">
                    {donation.type}
                  </span>
                  to
                  {/* ngo */}
                  <a
                    className="text-blue-500 ml-1"
                    href={`ngo/profile/${donation.ngo._id}`}
                  >
                    {donation.ngo.name}
                  </a>
                </div>
              </div>
            </div>

            {/* images */}
            {showImage ? (
              <div className="flex mb-2">
                {donation.media_urls.map((item, index) => {
                  return (
                    <img
                      className="h-24 mx-1"
                      key={index}
                      src={item.url}
                      alt="donationphotos"
                    />
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DonationBoard;
