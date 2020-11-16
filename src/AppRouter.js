import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import App from "./App";
import Demo from "./Demo/Demo";

function AppRouter() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/App">App</Link>
          <Link to="/Demo/123">Demo</Link>
        </li>
      </ul>
      <Route path="/App" component={App} />
      <Route path="/Demo/:keyword" component={Demo} />
    </Router>
  );
}

export default AppRouter;
