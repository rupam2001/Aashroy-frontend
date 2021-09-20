import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import Cookies from "js-cookie";
import { fetchUserDetails, updateUserData } from "../../api/general_user.api";
import GeneralUserProfileCard from "../../components/GeneralUserProfileCard";

import { toast } from "react-toastify";

function GeneralUser() {
  const [userData, setUserData] = useState({
    name: "",
    profile_pic: "",
    email: "",
    contribution_points: 0,
  });

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
      </div>
    </UserLayout>
  );
}

export default GeneralUser;
