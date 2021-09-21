/**
 * Contains API functions related to authentication
 *
 */

import { ENDPOINT } from "../constants/global.constants";
import { getRefreshToken } from "../utils/storage";

async function GeneralUserLoginAsync({ tokenId }) {
  /**
   * @param {tokenId: String}  from Oauth Google
   * @return {access_token: String, userData: Object, refresh_token: String}
   */
  try {
    const { access_token, userData, refresh_token } = await fetch(
      ENDPOINT + "/auth/generaluser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId }),
      }
    ).then((r) => r.json());

    return { access_token, userData, refresh_token };
  } catch (error) {
    return { access_token: null, userData: null, refresh_token: null };
  }
}

async function ngoLoginAsync({ email, password }) {
  /**
   * @param {email: String, password: String}
   * @return {access_token: String, ngoData: Object, refresh_token: String}
   */
  try {
    const { access_token, ngoData, refresh_token } = await fetch(
      ENDPOINT + "/auth/ngo/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    ).then((r) => r.json());
    return { access_token, ngoData, refresh_token };
  } catch (error) {
    return { access_token: null, ngoData: null, refresh_token: null };
  }
}
async function ngoRegisterAsync({
  email,
  password,
  name,
  phone,
  website,
  about,
  location,
}) {
  /**
   *
   */
  try {
    const { success, msg } = await fetch(ENDPOINT + "/auth/ngo/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
        phone,
        website,
        about,
        location,
      }),
    }).then((r) => r.json());

    return { success, msg, error: false };
  } catch (error) {
    return { success: false, msg: null, error: true };
  }
}
async function ngoSignOutAsync({}) {
  /**
   *
   */
  try {
    const { success } = await fetch(ENDPOINT + "/auth/ngo/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: getRefreshToken() }),
    }).then((r) => r.json());

    return { success };
  } catch (error) {
    return { success: false };
  }
}

export {
  GeneralUserLoginAsync,
  ngoLoginAsync,
  ngoRegisterAsync,
  ngoSignOutAsync,
};
