/**
 * Contains api functions for Ngo details component
 */

import { ENDPOINT } from "../constants/global.constants";
import {
  getAccessToken,
  getRefreshToken,
  handlePostFetching,
} from "../utils/storage";

async function updateNgoBasicInfoAsync({ name, email, phone, about, website }) {
  /**
   * @param {name: String, email: String, phone: Number, about: String, website: String}
   * @return {name: String, email: String, phone: Number, about: String, website: String} which are updated accordingly
   */
  try {
    const bearer = "bearer " + getAccessToken() + " " + getRefreshToken();
    const res = await fetch(ENDPOINT + "/ngo/updatebasic", {
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
    const res = await fetch(ENDPOINT + "/ngo/addnewphoto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ imageBase64 }),
    }).then((r) => r.json());

    handlePostFetching(res);
    return res;
  } catch (error) {
    return null;
  }
}

export { updateNgoBasicInfoAsync, addNewPhotoAsync };