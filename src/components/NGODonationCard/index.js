import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

function NGODonationCard({ donation }) {
  // returns donation status
  const statusChecker = () => {
    if (!donation.is_accepted_by_ngo) return "not accepted yet";
    else if (donation.is_accepted_by_ngo && !donation.is_donation_received)
      return "accepted but not received yet";
    else if (donation.is_accepted_by_ngo && donation.is_donation_received)
      return "donation received";
  };

  return (
    <div
      id="donation-card-container"
      className=" w-full p-3 my-2 shadow lg:w-2/3 lg:p-5"
    >
      {/* header */}
      <div className="flex items-center my-2">
        {/* profile pic */}
        <div className="h-10 w-10 flex justify-center items-center bg-gray-500 rounded-full">
          {donation.donor.profile_pic && donation.donor.profile_pic.length > 0 && (
            <a href={`/general/profile/${donation.donor._id}`}>
              <img
                src={donation.donor.profile_pic}
                alt="profile"
                className="rounded-full object-contain"
              />
            </a>
          )}
        </div>
        {/* name of the donor */}
        <div className="mx-2 font-semibold text-md">{donation.donor_name}</div>
      </div>

      {/* body */}
      <div className="text-gray-500 my-2">
        <span className="mr-1 text-sm">wants to donate :</span>
        {/* type */}
        <span className="font-semibold text-green-700 uppercase">
          {donation.type}
        </span>

        {/* dimensions */}
        <div className="mt-2 text-sm">Details of donation : </div>
        <div className="flex flex-wrap my-1">
          <div className="flex">
            <span className="mr-1">Length :</span>
            <span className="mr-1 text-black font-semibold">
              {donation.dimensions[0]},
            </span>
          </div>

          <div className="flex">
            <span className="mr-1">Width :</span>
            <span className="mr-1 text-black font-semibold">
              {donation.dimensions[1]},
            </span>
          </div>

          <div className="flex">
            <span className="mr-1">Height :</span>
            <span className="mr-1 text-black font-semibold">
              {donation.dimensions[2]}
            </span>
          </div>
        </div>

        {/* weight */}
        <span className="mr-1">Weight :</span>
        <span className="mr-1 text-black font-semibold">{donation.weight}</span>

        {/* contact number */}
        <div className="text-sm mt-2">Contact :</div>
        <a
          className="flex items-center text-blue-500 mb-2"
          href={`tel:${donation.contact_number}`}
        >
          <FaPhoneAlt className="text-blue-500 mr-2" />
          {donation.contact_number}
        </a>

        {/* status */}
        <span className="text-sm mr-1">Status :</span>
        <span className="uppercase">{statusChecker()}</span>
      </div>
    </div>
  );
}

export default NGODonationCard;
