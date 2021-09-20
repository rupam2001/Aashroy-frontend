import {
  getAccessToken,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// function to upload donation data to server
const submitDonationFormData = (
  setLoading,
  donorName,
  contactNumber,
  type,
  ngoId,
  media,
  dimensions,
  weight
) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/general-user/donation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    body: JSON.stringify({
      donorName,
      contactNumber,
      type,
      ngoId,
      media,
      dimensions,
      weight,
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
    .finally(() => {
      setLoading(false);
    });
};

// function to fetch NGO details to show in donation page
const fetchNGOdetails = (ngoId) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/general-user/donation/ngo-details/${ngoId}`, {
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
      return data;
    })
    .catch((err) => console.log(err))
    .finally(() => {});
};

export { fetchNGOdetails, submitDonationFormData };
