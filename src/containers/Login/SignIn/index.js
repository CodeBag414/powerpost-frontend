import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  loginRequest,
} from 'containers/App/actions';
import {
  makeSelectAuthError,
} from 'containers/App/selectors';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

class SignIn extends Component {
  static propTypes = {
    location: PropTypes.object,
    authError: PropTypes.string,
    login: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
      error: '',
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.error) {
      this.props.login(this.state.email.value, this.state.password.value);
    }
  }

  onFieldChange = (ev) => {
    const { name, value } = ev.target;
    let error;

    switch (name) {
      default:
        error = '';
    }

    this.setState({
      [name]: {
        value,
        error,
      },
      error,
    });
  }

  render() {
    const { authError } = this.props;
    if (authError) {
      alert('Login Failed. Try again!');
    }

    return (
      <div>
        <Title>Sign in to PowerPost</Title>
        <Center>Welcome Back! Enter in your account details below.</Center>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '40px' }}>
          <PPTextField
            type="email"
            name="email"
            hintText="example@name.example"
            floatingLabelText="Email"
            value={this.state.email.value}
            errorText={this.state.email.error}
            onChange={this.onFieldChange}
          />
          <PPTextField
            type="password"
            name="password"
            hintText="Enter your password"
            floatingLabelText="Password"
            value={this.state.password.value}
            errorText={this.state.password.error}
            onChange={this.onFieldChange}
          />

          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Sign In" primary disabled={!!this.state.error} /></Center>
          <Center style={{ marginTop: '30px' }}><PPLink to="/login/forgot-password">Forgot Password?</PPLink></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(loginRequest({ email, password })),
  };
}

const mapStateToProps = createStructuredSelector({
  authError: makeSelectAuthError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
