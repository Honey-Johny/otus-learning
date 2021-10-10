import Home from "./layouts/home/home";
import City from "./layouts/cityPage/city"

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:city" render={({match}) => (
                <City city={match.params.city}/>
            )}>
            </Route>

          </Switch>
        </div>

      </Router>
  );
}
