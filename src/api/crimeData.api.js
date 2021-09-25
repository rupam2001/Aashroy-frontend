import { ENDPOINT } from "../constants/global.constants";
import {
  getAccessTokenNGO,
  getRefreshTokenNgo,
  handlePostFetchingNgo,
} from "../utils/storage";

async function fetchCrimesAsync({ geo_location, diameter, days }) {
  try {
    diameter = 50;
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshTokenNgo();
    const res = await fetch(ENDPOINT + "/api/crime/data/get/locationwise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ geo_location, diameter, days }),
    }).then((r) => r.json());

    handlePostFetchingNgo(res);

    return res;
  } catch (error) {
    return { crime_list: null };
  }
}

async function searchCrimesAsync({ address, diameter, days }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshTokenNgo();
    const res = await fetch(ENDPOINT + "/api/crime/data/get/addresswise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ address, diameter, days }),
    }).then((r) => r.json());

    handlePostFetchingNgo(res);

    return res;
  } catch (error) {
    return {
      crime_list: [],
      topImages: [{ url: "https://i.stack.imgur.com/y9DpT.jpg" }],
      msg: "No results",
    };
  }
}
async function searchCrimesPeopleAsync({ person, diameter }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshTokenNgo();
    const res = await fetch(ENDPOINT + "/api/crime/data/get/addresswise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ person, diameter }),
    }).then((r) => r.json());

    handlePostFetchingNgo(res);

    return res;
  } catch (error) {
    return {
      crime_person_list: [],
      msg: "No results",
    };
  }
}

export { fetchCrimesAsync, searchCrimesAsync, searchCrimesPeopleAsync };
