// conatins all api of handling donations of an NGO

import {
  getAccessTokenNGO,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// get donations of the NGO
const fetchDonations = (skip, limit) => {
  const accessToken = getAccessTokenNGO();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/api/ngo/donation/our-donation/${skip}/${limit}`, {
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

// function to accept donation request
const acceptDonation = (setLoading, donationId) => {
  const accessToken = getAccessTokenNGO();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/api/ngo/donation/accept-donation`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    body: JSON.stringify({
      donationId,
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

// function to mark donation received
const markDonationReceived = (setLoading, donationId) => {
  const accessToken = getAccessTokenNGO();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/api/ngo/donation/received-donation`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    body: JSON.stringify({
      donationId,
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

export { acceptDonation, markDonationReceived, fetchDonations };
