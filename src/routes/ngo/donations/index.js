import React, { useState, useEffect } from "react";
import NgoLayout from "../../../layouts/ngo.layout";
import {
  fetchDonations,
  acceptDonation,
  markDonationReceived,
} from "../../../api/ngoDonation.api";
import NGODonationCard from "../../../components/NGODonationCard";

import { toast } from "react-toastify";

function NGODonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to handle accept button press
  const acceptHandler = async (donationId, index) => {
    if (loading) return;

    setLoading(true);

    try {
      // call api function
      await toast.promise(acceptDonation(setLoading, donationId), {
        pending: "Uploading data",
        success: "Successfully uploaded",
        error: "Oops! Something went wrong",
      });

      setDonations((p) => {
        let newP = [...p];
        newP[index].is_accepted_by_ngo = true;
        return newP;
      });
    } catch (err) {
      toast.error(err);
    }
  };

  // function to handle receive button press
  const receiveHandler = async (donationId, index) => {
    if (loading) return;

    setLoading(true);

    try {
      // call api function
      await toast.promise(markDonationReceived(setLoading, donationId), {
        pending: "Uploading data",
        success: "Successfully uploaded",
        error: "Oops! Something went wrong",
      });

      setDonations((p) => {
        let newP = [...p];
        newP[index].is_donation_received = true;
        return newP;
      });
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    // fetch donations of the NGO
    (async () => {
      const resData = await fetchDonations(0, 1000);
      console.log(resData.donations);
      setDonations(resData.donations || []);
    })();
  }, []);

  return (
    <NgoLayout>
      <div className="w-full h-full flex flex-col p-3 items-center">
        {donations.map((donation, index) => {
          return (
            <div key={index} className="w-full mb-2 flex flex-col items-center">
              <NGODonationCard donation={donation} />

              {/* buttons */}
              <div className="w-full flex p-2 lg:w-2/3">
                {!donation.is_accepted_by_ngo && (
                  <button
                    onClick={() => acceptHandler(donation._id, index)}
                    disabled={loading}
                    className="bg-blue-500 focus:bg-blue-600 text-white p-2 rounded"
                  >
                    Accept Donation
                  </button>
                )}

                {donation.is_accepted_by_ngo && !donation.is_donation_received && (
                  <button
                    onClick={() => receiveHandler(donation._id, index)}
                    disabled={loading}
                    className="bg-green-500 focus:bg-green-600 text-white p-2 rounded"
                  >
                    Mark Donation as Received
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </NgoLayout>
  );
}

export default NGODonations;
