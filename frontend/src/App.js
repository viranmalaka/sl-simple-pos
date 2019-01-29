import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './components/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthenticatedComponent from './components/authenticated';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Redirect from="/" to="/login" exact />
              <Route path="/login" component={Login}></Route>
              <Route path="/user" component={AuthenticatedComponent}></Route>
            </Switch>
          </div>
        </Router>
        <ToastContainer hideProgressBar />
      </div>
    );
  }
}

