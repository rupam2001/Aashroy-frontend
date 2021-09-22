import { ENDPOINT } from "../constants/global.constants";
import {
  getAccessTokenNGO,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";

async function fetchHomelessAsync({ geo_location, diameter }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/homeless/data/get/locationwise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ geo_location, diameter }),
    }).then((r) => r.json());

    handlePostFetching(res);

    return res;
  } catch (error) {
    return { homeless_list: null };
  }
}

async function searchHomelessAsync({ address, diameter }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/homeless/data/get/addresswise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ address, diameter }),
    }).then((r) => r.json());

    handlePostFetching(res);

    return res;
  } catch (error) {
    return { homeless_list: null };
  }
}

export { fetchHomelessAsync, searchHomelessAsync };
