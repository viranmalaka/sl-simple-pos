import React from 'react';
import { login } from '../actions/userActions'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import OrderList from "./OrderList";
import ItemList from "./itemList";
import OrderDetails from "./orderDetails";
import TopNavBar from "./navbar";
import { AuthInit } from '../http-handler';

class AuthenticatedComponent extends React.Component {

  componentWillMount() {
    AuthInit();
  }

  render() {
    return (
      <div>
        <TopNavBar></TopNavBar>
        <div className="ui container">
          <Switch>
            <Route path="/user/orders-list" component={OrderList}></Route>
            <Route path="/user/items-list" component={ItemList}></Route>
            <Route path="/user/order/:id" component={OrderDetails}></Route>
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);