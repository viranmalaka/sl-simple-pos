import React from 'react';
import { login } from '../actions/userActions'
import { connect } from 'react-redux';
import { Button, Form, Grid, Message } from 'semantic-ui-react'

class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  submit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password).then(() => {
      this.props.history.push('/orders-list');
    });

  }

  handleInputs = (e, key) => {
    let s = {}
    s[key] = e.target.value;
    this.setState(s);
  }

  messageHTML = () => {
    return this.props.user.loginError ? (
      <Message negative>
        <Message.Header>Error</Message.Header>
        <p>{this.props.user.loginError.error.message}</p>
      </Message>
    ) : '';
  }

  render() {
    return (
      <div className="ui container">
        <Grid>
          <Grid.Column width="5"></Grid.Column>
          <Grid.Column width="6">
            <Form style={{ paddingTop: '100px' }} onSubmit={this.submit}>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Username' id='username' onChange={(e) => { this.handleInputs(e, 'username') }} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" id='password' onChange={(e) => { this.handleInputs(e, 'password') }} />
              </Form.Field>
              <Button fluid type='submit' color="green">Submit</Button>
            </Form>

            {this.messageHTML()}

          </Grid.Column>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);