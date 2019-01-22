import React from "react";
import { connect } from "react-redux";

import { setName } from "../actions/userActions";

class Test extends React.Component {
  render() {
    return (
      <div className="container">
        <button className="ui button" onClick={() => this.props.setName("Anna")}>
          Button
        </button>
        <h1>{this.props.user.name}</h1>
        {JSON.stringify(this.props.ui)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    ui: state.ui
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
