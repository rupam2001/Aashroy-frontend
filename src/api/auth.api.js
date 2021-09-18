/**
 * Contains API functions related to authentication
 *
 */

import { ENDPOINT } from "../constants/global.constants";

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

export { GeneralUserLoginAsync, ngoLoginAsync };
