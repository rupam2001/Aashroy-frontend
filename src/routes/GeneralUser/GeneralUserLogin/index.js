import React, { useEffect, useContext } from "react";
import GoogleSignIn from "../../../components/googleSignIn.component.js";
import { getAccessToken, getRefreshToken } from "../../../utils/storage";

import { AuthContext } from "../../../contexts/auth.context";
import { FcGoogle } from "react-icons/fc";
import { useHistory, useLocation } from "react-router-dom";

function GeneralUserLogin({}) {
  const location = useLocation();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // checks if user has logged in
    // if yes then sent him to the location he intended to go
    // if that doesn't exist
    // sent him to user profile page
    if (getAccessToken() != null && getRefreshToken() != null) {
      if (location.state && location.state.forwardTo) {
        history.replace(location.state.forwardTo);
        history.go(0);
      } else {
        history.replace("/general");
        history.go(0);
      }
    }
  }, [authContext.isLoggedIn]);

  return (
    <div className="justify-center items-center flex flex-col min-h-screen min-w-max">
      <img
        className="w-2/3 md:w-auto"
        src={
          "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?size=338&ext=jpg"
        }
        alt="login"
      />
      <GoogleSignIn
        children={
          <button className="flex flex-row items-center text-blue-700 border-black border-2 p-3 rounded hover:border-gray-500">
            Sign In with Google &nbsp; <FcGoogle />
          </button>
        }
      />
    </div>
  );
}

export default React.memo(GeneralUserLogin);
