import React from "react";
import { Menu, Button, Checkbox } from 'semantic-ui-react'
import { toggleSidebar, changePath, showAllOrders } from '../actions/uiActions';
import { initAuthRequest, logout } from '../actions/userActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TopNavBar extends React.Component {

  componentDidMount() {
    this.props.initAuth();
  }

  onLogButton = () => {
    if(this.props.user.login) {
      this.props.logoutUser();
    } 
  }

  onShowAllOrders = (e, d) => {
    this.props.showAllOrders(d.checked);
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item active={this.props.ui.path === 'orders'}>
            <Link to="/user/orders-list" onClick={() => { this.props.changePath('orders') }}>Order List</Link>
          </Menu.Item>
          <Menu.Item active={this.props.ui.path === 'items'}>
            <Link to="/user/items-list" onClick={() => { this.props.changePath('items') }}>Item List</Link>
          </Menu.Item>
          <Menu.Item position="right">
            <Checkbox onChange={this.onShowAllOrders} style={{backgroundColor: '#757575', padding: '2px'}} label="Show All Orders"></Checkbox>
          </Menu.Item>
          <Menu.Item>
              <Button color="blue">
                <Link to='/login' onClick={this.onLogButton} className="">{this.props.user.login ? 'Log Out' : 'Log In'}</Link>
              </Button>
          </Menu.Item>
        </Menu>

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    },
    changePath: (url) => dispatch(changePath(url)),
    initAuth: () => dispatch(initAuthRequest()),
    logoutUser: () => dispatch(logout()),
    showAllOrders: (b) => dispatch(showAllOrders(b))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);