/**
 * Contains api functions for Ngo details component
 */

import { ENDPOINT } from "../constants/global.constants";
import {
  getAccessToken,
  getAccessTokenNGO,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";

async function updateNgoBasicInfoAsync({ name, email, phone, about, website }) {
  /**
   * @param {name: String, email: String, phone: Number, about: String, website: String}
   * @return {name: String, email: String, phone: Number, about: String, website: String} which are updated accordingly
   */
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/ngo/details/updatebasic", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      body: JSON.stringify({ name, email, phone, about, website }),
    }).then((r) => r.json());

    handlePostFetching(res);
    return res;
  } catch (error) {
    return null;
  }
}

async function addNewPhotoAsync({ imageBase64 }) {
  /**
   * @param {imageBase64: String}  base64 Image String
   * @return {url: String, media_type: String} which are updated accordingly
   */
  try {
    const bearer = "bearer " + getAccessToken() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/ngo/details/addnewphoto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ image: imageBase64 }),
    }).then((r) => r.json());

    handlePostFetching(res);
    return res;
  } catch (error) {
    return { newMediaList: null };
  }
}
async function getNGODataAsync() {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/ngo/details/getdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    }).then((r) => r.json());

    handlePostFetching(res);
    return res;
  } catch (error) {
    return { ngo: null };
  }
}

async function addNewMembeNgoAsync({ name, role, profile_pic, about }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/ngo/details/addmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ name, role, profile_pic, about }),
    }).then((r) => r.json());

    handlePostFetching(res);

    return res;
  } catch (error) {
    return { members: null };
  }
}
async function removeMembeNgoAsync({ _id }) {
  try {
    const bearer = "bearer " + getAccessTokenNGO() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/ngo/details/deletemember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ _id }),
    }).then((r) => r.json());

    handlePostFetching(res);

    return res;
  } catch (error) {
    return { members: null };
  }
}

export {
  updateNgoBasicInfoAsync,
  addNewPhotoAsync,
  getNGODataAsync,
  addNewMembeNgoAsync,
  removeMembeNgoAsync,
};
