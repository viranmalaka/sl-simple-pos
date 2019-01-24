import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './components/login';

import AuthenticatedComponent from './components/authenticated';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>

          <div>
            <Switch>
              <Redirect from="/" to="/login" exact={true} />
              <Route path="/login" component={Login}></Route>
              <Route path="/user" component={AuthenticatedComponent}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

