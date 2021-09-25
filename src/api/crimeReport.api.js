import {
  getAccessToken,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// function to submit crime report data to server
const submitCrimeReport = (
  setLoading,
  type,
  typeDescription,
  geoLocation,
  reverseGeocodingAddress,
  briefReport,
  media
) => {
  return fetch(`${ENDPOINT}/api/crime-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      typeDescription,
      geoLocation,
      reverseGeocodingAddress,
      briefReport,
      media,
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

export { submitCrimeReport };
