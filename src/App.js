import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./contexts/auth.context";
import { getAccessToken, getRefreshToken } from "./utils/storage";

import GeneralUser from "./routes/GeneralUser";
import GeneralUserLogin from "./routes/GeneralUser/GeneralUserLogin";
import ReportHomeless from "./routes/GeneralUser/ReportHomeless";
import ReportAdditionalInfo from "./routes/GeneralUser/ReportAdditionalInfo";
import Donate from "./routes/GeneralUser/Donate";

import ReportCrime from "./routes/CrimeReport";

import NGOLogin from "./routes/ngo/login";
import TestComponent from "./routes/test";

import NGORegistration from "./routes/ngo/registration";
import About from "./routes/AboutPage";
import Landing from "./routes/landing";
import NgoHome from "./routes/ngo/home";
import { NgoContext } from "./contexts/ngo.context";
import NgoProfile from "./routes/ngo/profile";
import Contact from "./routes/ContactPage";
import NgoList from "./routes/ngo/list";
import NgoHomeLess from "./routes/ngo/homeless";
import NgoCrimeReportView from "./routes/ngo/crime";

console.warn = () => {};
console.error = () => {};

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
        <Route path="/report-crime" component={ReportCrime} />
        <Route path="/ngo/login" component={NGOLogin} />
        <Route path="/testing" component={TestComponent} />
        <Route path="/ngo/home" component={NgoHome} />
        <Route path="/ngo/homeless" component={NgoHomeLess} />
        <Route path="/ngo/crime" component={NgoCrimeReportView} />

        <Route
          path="/ngo/profile/:id"
          render={(props) => <NgoProfile {...props} />}
        />
        <Route path="/about-us" component={About} />
        <Route path="/contact-us" component={Contact} />
        <Route path="/ngo/list" component={NgoList} />
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
        <Route
          path="/general/report-homeless/additional-info"
          exact
          component={ReportAdditionalInfo}
        />
        <Route path="/general/donate/:ngoId" exact component={Donate} />
      </Switch>
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
    } else if (location.pathname == "/ngo/homeless") {
      // history.push("/ngo/login");
    }
  }, [ngocontext.isLoggedIn]);

  return <></>;
};

export default App;
