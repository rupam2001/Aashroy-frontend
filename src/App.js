import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./contexts/auth.context";
import { getAccessToken, getRefreshToken } from "./utils/storage";

import GeneralUser from "./routes/GeneralUser";
import GeneralUserLogin from "./routes/GeneralUser/GeneralUserLogin";
import ReportHomeless from "./routes/GeneralUser/ReportHomeless";

import NGORegistration from "./routes/ngo/registration";

import Landing from "./routes/landing";
// global arrayContainer:true, SliderInstance:true, DomObjects:true, document, Slider

function App() {
  const authcontext = useContext(AuthContext);
  useEffect(() => {
    if (getAccessToken() != null && getRefreshToken() != null)
      authcontext.setIsLoggedIn(true);
  }, []);

  return (
    <div>
      <GlobalRoutes />
      <AuthSecureRoutes />
    </div>
  );
}

function GlobalRoutes() {
  /**
   * Place all the insecure (XD) routes here
   */
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/general/login" exact component={GeneralUserLogin} />
        <Route path="/ngo/registration" component={NGORegistration} />
      </Switch>
    </Router>
  );
}

function AuthSecureRoutes() {
  /**
   * Place all the secure routes here
   */
  const authcontext = useContext(AuthContext);
  // if (!authcontext.isLoggedIn) return <></>;
  return (
    <Router>
      <Switch>
        <Route path="/general" exact component={GeneralUser} />
        <Route
          path="/general/report-homeless"
          exact
          component={ReportHomeless}
        />
      </Switch>
    </Router>
  );
}

export default App;
