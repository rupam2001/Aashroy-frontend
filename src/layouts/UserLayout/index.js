import React, { useContext, useEffect } from "react";
import styles from "./style.module.css";
import { AuthContext } from "../../contexts/auth.context";
import { getAccessToken, getRefreshToken } from "../../utils/storage";

import { useHistory, useLocation } from "react-router-dom";

function UserLayout({ children }) {
  const location = useLocation();
  const history = useHistory();
  const authcontext = useContext(AuthContext);

  useEffect(() => {
    // checks if user has already logged in
    // if not sent him to login page with the location as state
    // that he currently intended to go
    if (
      getAccessToken() == null &&
      getRefreshToken() == null &&
      location.pathname != "/general/login"
    ) {
      history.replace("/general/login", { forwardTo: location.pathname });
      history.go(0);
    }
  }, [authcontext.isLoggedIn]);

  return <div className={`${styles.container} `}>{children}</div>;
}

export default UserLayout;
