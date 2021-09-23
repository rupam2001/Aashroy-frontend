import React from "react";

import { FaDonate } from "react-icons/fa";

function GeneralUserDonationCard({ donation }) {
  // returns donation status
  const statusChecker = () => {
    if (!donation.is_accepted_by_ngo) return "not accepted yet";
    else if (donation.is_accepted_by_ngo && !donation.is_donation_received)
      return "accepted but not received yet";
    else if (donation.is_accepted_by_ngo && donation.is_donation_received)
      return "donation received";
  };
  return (
    <div className=" w-full p-3 my-2 shadow-md lg:w-1/2 lg:p-5">
      {/* header */}
      <div className="text-gray-500 flex flex-wrap items-center">
        <FaDonate className="mr-2 text-green-500" />
        <span className="uppercase mr-1 text-black">{donation.type}</span>
        <span className="mr-1">donation to</span>
        <a className="text-blue-500" href={`ngo/profile/${donation.ngo._id}`}>
          {donation.ngo.name}
        </a>
      </div>

      {/* name */}
      <div className="my-2 text-gray-500 text-sm">
        <span>Donated as : </span>
        <span className="text-black">{donation.donor_name}</span>
      </div>

      {/* donation details */}
      <div className="my-2 text-gray-500">
        {/* dimensions */}
        <div className=" text-sm">Details of donation : </div>
        <div className="flex flex-wrap my-1">
          <div className="flex items-center">
            <span className="mr-1 text-sm">Length :</span>
            <span className="mr-1 text-black font-semibold">
              {donation.dimensions[0]},
            </span>
          </div>

          <div className="flex items-center">
            <span className="mr-1 text-sm">Width :</span>
            <span className="mr-1 text-black font-semibold">
              {donation.dimensions[1]},
            </span>
          </div>

          <div className="flex items-center">
            <span className="mr-1 text-sm">Height :</span>
            <span className="mr-1 text-black font-semibold">
              {donation.dimensions[2]}
            </span>
          </div>
        </div>
        {/* weight */}
        <span className="mr-1 text-sm">Weight :</span>
        <span className="mr-1 text-black font-semibold">{donation.weight}</span>
      </div>

      {/* status */}
      <div className="text-gray-500 my-2">
        <span className="text-sm mr-1">Status :</span>
        <span className="uppercase text-green-500">{statusChecker()}</span>
      </div>
    </div>
  );
}

export default GeneralUserDonationCard;
