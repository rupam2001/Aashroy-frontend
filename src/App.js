import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthContext } from './contexts/auth.context';

import Landing from './routes/landing'

function App() {
  return (
    <div>
      <GlobalRoutes/>
      <AuthSecureRoutes/>
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
      </Switch>
    </Router>
  )
}

function AuthSecureRoutes() {
  /**
   * Place all the secure routes here
   */
  const authcontext = useContext(AuthContext)
  if(!authcontext.isLoggedIn) return <></>
  return (
    <Router>
      <Switch>
      </Switch>
    </Router>
  )
}





export default App;
