import React, { useState, useEffect } from "react";
import { fetchPublicUserDetails } from "../../../api/general_user.api";

import { useParams } from "react-router-dom";
import { set } from "js-cookie";

function PublicProfile() {
  const { id } = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    // fetch the user data first
    (async () => {
      const data = await fetchPublicUserDetails(id);
      console.log(data);
      setUserData(data);
    })();
  }, []);
  return (
    <div className="p-3 w-full h-full flex flex-col items-center justify-center">
      <div className="p-2 md:w-1/2 shadow-md flex flex-col items-center">
        {userData && (
          <div className="p-2 ">
            <span className="text-3xl text-blue-500 font-bold">
              {userData.name}
            </span>
          </div>
        )}

        {userData && (
          <img
            className="my-2 h-40 w-40"
            src={userData.profile_pic}
            alt="profile"
          />
        )}

        {userData && (
          <div className="py-2">
            <span className="text-gray-500">Contribution Points : </span>
            <span className="text-xl">{userData.contribution_points}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicProfile;
