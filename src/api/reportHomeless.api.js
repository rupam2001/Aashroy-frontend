import {
  getAccessToken,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// reports homeless and returns the created data _id
function reportHomeless(
  setLoading,
  numberOfPeople,
  geoLocation,
  reverseGeocodingAddress,
  media
) {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/general-user/report-homeless`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    body: JSON.stringify({
      numberOfPeople,
      geoLocation,
      reverseGeocodingAddress,
      media,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw res;
    })
    .then((data) => {
      handlePostFetching(data);
      return data.recordId;
    })
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}

// used to submit the additional information about homeless people
function reportHomelessAddInfo(setLoading, data, parentId) {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return fetch(`${ENDPOINT}/general-user/report-homeless/additional-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    body: JSON.stringify({
      data,
      parentId,
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
    .finally(() => setLoading(false));
}

export { reportHomeless, reportHomelessAddInfo };
