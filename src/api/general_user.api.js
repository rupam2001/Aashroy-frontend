import {
  getAccessToken,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// route to fetch user details to display on profile
const fetchUserDetails = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/api/general-user/profile-details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw res;
    })
    .then((data) => {
      handlePostFetching(data);
      return data["0"];
    })
    .catch((err) => console.log(err))
    .finally(() => {});
};

// route to fetch user details to display on public profile
const fetchPublicUserDetails = (id) => {
  return fetch(`${ENDPOINT}/api/general-user/profile-details/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw res;
    })
    .then((data) => {
      return data["0"];
    })
    .catch((err) => console.log(err))
    .finally(() => {});
};

// update user data
const updateUserData = (newName) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/api/general-user/profile-details`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    body: JSON.stringify({
      name: newName,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw res;
    })
    .then((data) => {
      handlePostFetching(data);
      return data;
    })
    .catch((err) => console.log(err))
    .finally(() => {});
};

// route to fetch donation details of user
const fetchDonationDetails = (skip, limit) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return fetch(
    `${ENDPOINT}/api/general-user/donation/my-donations/${skip}/${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken} ${refreshToken}`,
      },
    }
  )
    .then((res) => {
      if (res.ok) return res.json();
      else throw res;
    })
    .then((data) => {
      handlePostFetching(data);
      return data;
    })
    .catch((err) => console.log(err))
    .finally(() => {});
};

export {
  fetchUserDetails,
  updateUserData,
  fetchDonationDetails,
  fetchPublicUserDetails,
};
