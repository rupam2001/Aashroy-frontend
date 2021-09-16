import { getAccessToken, getRefreshToken } from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// reports homeless and returns the created data _id
function reportHomeless(setLoading) {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  fetch(`${ENDPOINT}/general-user/report-homeless`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken} ${refreshToken}`,
    },
    body: JSON.stringify({}),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw res;
    })
    .then((data) => {})
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}

export { reportHomeless };
