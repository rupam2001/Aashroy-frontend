import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import Cookies from "js-cookie";
import {
  fetchUserDetails,
  updateUserData,
  fetchDonationDetails,
} from "../../api/general_user.api";
import GeneralUserProfileCard from "../../components/GeneralUserProfileCard";
import GeneralUserDonationCard from "../../components/GeneralUserDonationCard";

import { FaHistory } from "react-icons/fa";
import { toast } from "react-toastify";

function GeneralUser() {
  const [userData, setUserData] = useState({
    name: "",
    profile_pic: "",
    email: "",
    contribution_points: 0,
  });
  const [donations, setDonations] = useState([]);

  // function to call the update api call
  const requestUpdate = async (name) => {
    // validate data
    if (name.length < 1) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      // update
      await toast.promise(updateUserData(name), {
        pending: "Uploading data",
        success: "Successfully uploaded",
        error: "Oops! Something went wrong",
      });

      setUserData((p) => {
        let newP = { ...p };
        newP.name = name;
        return newP;
      });
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // bring userdata from backend
        const fetchedUserDetails = await fetchUserDetails();
        setUserData(fetchedUserDetails);

        // bring donation details
        const tempDon = await fetchDonationDetails(0, 1000);
        setDonations(tempDon.donations);
      } catch (err) {
        toast.error("Something went wrong");
      }
    })();
  }, []);

  useEffect(() => {
    // store the changes in userdata in Cookie
    Cookies.set("general_user_data", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserLayout>
      <div
        id="user_profile"
        className="m-3 flex flex-col justify-center items-center"
      >
        {userData && (
          <GeneralUserProfileCard
            requestUpdate={requestUpdate}
            userData={userData}
          />
        )}

        {/* donations */}
        <div className="w-full md:w-1/2 flex items-center py-3 px-4 mt-4 bg-blue-500 text-white rounded-full font-semibold text-md">
          <FaHistory className="mx-2" /> Donation History
        </div>
        {donations.map((donation, index) => {
          return <GeneralUserDonationCard key={index} donation={donation} />;
        })}
      </div>
    </UserLayout>
  );
}

export default GeneralUser;
