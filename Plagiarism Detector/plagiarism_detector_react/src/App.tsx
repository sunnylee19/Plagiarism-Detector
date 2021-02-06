import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePageComponent from './Components/HomePageComponent';
import SummaryReportPageComponent from './Components/SummaryReportPageComponent';
import SummaryFilePageComponent from './Components/SummaryFilePageComponent';
import { Switch, Router, Route } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import history from '../src/History.js';

/**
 * App component for routing.
 */
function App() {
  return (
    <div>

      <Router history={history}>
        <Switch>
          <Route path="/report/:id" component={SummaryReportPageComponent} />
          <Route path="/summary" component={SummaryFilePageComponent} />
          <Route path="/" exact component={HomePageComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
