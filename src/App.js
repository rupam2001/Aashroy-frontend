import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./contexts/auth.context";
import GeneralUserLogin from "./routes/generalUserLogin";
import NGORegistration from "./routes/ngo/registration";
import NGOLogin from "./routes/ngo/login";
import TestComponent from "./routes/test";

import Landing from "./routes/landing";
import NgoHome from "./routes/ngo/home";
import { NgoContext } from "./contexts/ngo.context";
import NgoProfile from "./routes/ngo/profile";
// global arrayContainer:true, SliderInstance:true, DomObjects:true, document, Slider

function App() {
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
        <Route path="/general/login" component={GeneralUserLogin} />
        <Route path="/ngo/registration" component={NGORegistration} />
        <Route path="/ngo/login" component={NGOLogin} />
        <Route path="/testing" component={TestComponent} />
        <Route path="/ngo/home" component={NgoHome} />
        <Route
          path="/ngo/profile/:id"
          render={(props) => <NgoProfile {...props} />}
        />
      </Switch>
      <RouteManager />
    </Router>
  );
}

function AuthSecureRoutes() {
  /**
   * Place all the secure routes here
   */
  const authcontext = useContext(AuthContext);
  if (!authcontext.isLoggedIn) return <></>;
  return (
    <Router>
      <Switch></Switch>
    </Router>
  );
}

const RouteManager = () => {
  const history = useHistory();
  const ngocontext = useContext(NgoContext);
  const location = useLocation();
  useEffect(() => {
    if (ngocontext.isLoggedIn) {
      if (
        location.pathname == "/ngo/login" ||
        location.pathname == "/ngo/registration"
      ) {
        history.push("/ngo/home");
      }
    }
  }, [ngocontext.isLoggedIn]);

  return <></>;
};

export default App;
