import { ENDPOINT } from "../constants/global.constants";
import {
  getAccessToken,
  getAccessTokenNGO,
  getRefreshToken,
  handlePostFetching,
  handlePostFetchingNgo,
} from "../utils/storage";

async function getNGOAsync({ id }) {
  try {
    const res = await fetch(ENDPOINT + "/api/ngo/public/get/" + id, {
      method: "GET",
    }).then((r) => r.json());

    return res;
  } catch (error) {
    return { ngo: null };
  }
}

async function getNearestNGOSAsync({ diameter, geo_location }) {
  /**
   * retruns the nearest ngo within the diameter
   * diameter:-1 selects the default diameter in the server
   * geo_location: set the center of the search circle to this  (must contain latitude and longitude)
   */
  try {
    // const bearer =
    //   "bearer " + getAccessTokenNGO()
    //     ? getAccessTokenNGO()
    //     : getAccessToken() + " " + getRefreshToken();

    const res = await fetch(ENDPOINT + "/api/ngo/public/nearest/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: bearer,
      },
      body: JSON.stringify({ diameter, geo_location }),
    }).then((r) => r.json());

    // handlePostFetchingNgo(res);

    return res;
  } catch (error) {
    return { ngo: null };
  }
}

async function searchNGOSAsync(searchQuery, skip, limit) {
  try {
    // const bearer =
    //   "bearer " + getAccessTokenNGO()
    //     ? getAccessTokenNGO()
    //     : getAccessToken() + " " + getRefreshToken();

    const res = await fetch(ENDPOINT + "/api/ngo/public/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: bearer,
      },
      body: JSON.stringify({ searchQuery, skip, limit }),
    }).then((r) => r.json());

    // handlePostFetchingNgo(res);

    return res;
  } catch (error) {
    return { ngos: null };
  }
}

export { getNGOAsync, getNearestNGOSAsync, searchNGOSAsync };
