import {
  getAccessToken,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// function to submit crime report data to server
const submitCrimeReport = (setLoading) => {
  return fetch(`${ENDPOINT}/crime-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
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
