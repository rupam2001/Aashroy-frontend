/**
 * Contains API functions related to authentication
 *
 */

import { ENDPOINT } from "../constants/global.constants";

async function GeneralUserLoginAsync({ tokenId }) {
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

export { GeneralUserLoginAsync };
