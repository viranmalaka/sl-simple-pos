import React, { Component } from 'react';
import './App.css';
import TopNavBar from "./components/navbar";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login';
import OrderList from "./components/OrderList";
import ItemList from "./components/itemList";

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>

          <div>
            <TopNavBar></TopNavBar>
            <div className="ui container">
              <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/orders-list" component={OrderList}></Route>
                <Route path="/items-list" component={ItemList}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

