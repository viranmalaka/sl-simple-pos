import React from "react";
import { Menu, Icon, Button, Dropdown } from 'semantic-ui-react'
import { toggleSidebar } from '../actions/uiActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TopNavBar extends React.Component {
  render() {
    return (
      <div className="">
        <Menu inverted>
          <Dropdown item icon='sidebar' simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link className="menu-item" to="/orders-list">Order List</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="menu-item" to="/items-list">Item List</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item position="right">
            <Link to="/login">
              <Button color="blue">
                Login
            </Button>
            </Link>
          </Menu.Item>
        </Menu>

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => {
      console.log('here');
      dispatch(toggleSidebar());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);