import { ENDPOINT } from "../constants/global.constants";
import {
  getAccessTokenNGO,
  getRefreshTokenNgo,
  handlePostFetchingNgo,
} from "../utils/storage";

async function fetchHomelessAsync({ geo_location, diameter, days }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshTokenNgo();
    const res = await fetch(ENDPOINT + "/api/homeless/data/get/locationwise", {
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
    return { homeless_list: null };
  }
}

async function searchHomelessAsync({ address, diameter, days }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshTokenNgo();
    const res = await fetch(ENDPOINT + "/api/homeless/data/get/addresswise", {
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
      homeless_list: [],
      topImages: [{ url: "https://i.stack.imgur.com/y9DpT.jpg" }],
      msg: "No results",
    };
  }
}
async function searchHomelessPeopleAsync({ person, diameter }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshTokenNgo();
    const res = await fetch(ENDPOINT + "/api/homeless/data/get/addresswise", {
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
      homeless_person_list: [],
      msg: "No results",
    };
  }
}

async function getHomelessPersonAsync({ _id }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshTokenNgo();
    const res = await fetch(ENDPOINT + "/api/homeless/data/get/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ _id }),
    }).then((r) => r.json());

    handlePostFetchingNgo(res);

    return res;
  } catch (error) {
    return {};
  }
}

export {
  fetchHomelessAsync,
  searchHomelessAsync,
  searchHomelessPeopleAsync,
  getHomelessPersonAsync,
};
