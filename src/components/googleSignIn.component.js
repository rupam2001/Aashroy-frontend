import React, { useContext, useRef } from "react";
import GoogleLogin from "react-google-login";
import { GeneralUserLoginAsync } from "../api/auth.api";
import {
  OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URI,
} from "../constants/auth.constants";
import { AuthContext } from "../contexts/auth.context";
import { setAccessToken, setRefreshToken } from "../utils/storage";

export default function GoogleSignIn({ children }) {
  const googleSigninButtonRef = useRef(null);
  const authcontext = useContext(AuthContext);

  const responseSuccessGoogle = async (response) => {
    const { access_token, userData, refresh_token } =
      await GeneralUserLoginAsync({
        tokenId: response.tokenId,
      });

    if (!access_token) {
      alert("Something went wrong :(");
      return;
    }
    authcontext.setIsLoggedIn(true);
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    authcontext.setUserData(userData);
  };
  const responseErrorGoogle = (response) => {};
  return (
    <div>
      <GoogleLogin
        clientId={OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
        redirectUri={OAUTH_REDIRECT_URI}
        render={(renderProps) => (
          <div onClick={renderProps.onClick} ref={googleSigninButtonRef}>
            {children}
          </div>
        )}
      />
    </div>
  );
}
