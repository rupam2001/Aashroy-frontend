import axios from "axios";
import { getAccessToken, getRefreshToken } from "../utils/storage";
import { ENDPOINT } from "../constants/global.constants";

// reports homeless and returns the created data _id
function reportHomeless() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  axios
    .post(`${ENDPOINT}/general-user/report-homeless`)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
}
