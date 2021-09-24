// contains all api to retrieve donation data to display

import { ENDPOINT } from "../constants/global.constants";

const getDonationData = (skip, limit) => {
  return fetch(`${ENDPOINT}/donation-board/${skip}/${limit}`, {
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
      return data;
    })
    .catch((err) => console.log(err));
};

const getTopContributors = () => {
  return fetch(`${ENDPOINT}/donation-board/top-contributors`, {
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
      return data;
    })
    .catch((err) => console.log(err));
};

export { getDonationData, getTopContributors };
