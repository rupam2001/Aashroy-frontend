import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Landing from './routes/landing'

function App() {
  return (
    <div>
      <GlobalRoutes/>
    </div>
  );
}




function GlobalRoutes() {
  /**
   * Place all the routes here
   */
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
      </Switch>
    </Router>
  )
}

export default App;
