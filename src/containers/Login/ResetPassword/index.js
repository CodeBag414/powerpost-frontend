import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cookie from 'react-cookie';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';

import {
  resetPassword,
} from './actions';
import {
  selectResetPassword,
} from './selectors';

class ResetPassword extends Component {
  static propTypes = {
    resetPassword: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      password: {
        value: '',
        error: '',
      },
      confirmPassword: {
        value: '',
        error: '',
      },
      error: null,
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.error) {
      const user = cookie.load('user');

      this.props.resetPassword({
        ...user,
        password: this.state.password.value,
      });
    }
  }

  onFieldChange = (ev) => {
    const { name, value } = ev.target;
    let error;

    switch (name) {
      case 'password':
        if (value !== this.state.confirmPassword.value) {
          error = 'Password does not match';
        }
        return this.setState({
          password: {
            value,
          },
          confirmPassword: {
            value: this.state.confirmPassword.value,
            error,
          },
          error,
        });
      case 'confirmPassword':
        if (value !== this.state.password.value) {
          error = 'Password does not match';
        }
        break;
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
    return (
      <div>
        <Title>Please enter a new password below</Title>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '70px' }}>
          <PPTextField
            type="password"
            name="password"
            hintText="Password"
            floatingLabelText="New Password"
            value={this.state.password.value}
            errorText={this.state.password.error}
            onChange={this.onFieldChange}
          />
          <PPTextField
            type="password"
            name="confirmPassword"
            hintText="Re-enter Password"
            floatingLabelText="Confirm New Password"
            value={this.state.confirmPassword.value}
            errorText={this.state.confirmPassword.error}
            onChange={this.onFieldChange}
          />

          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Reset Password" primary disabled={!!this.state.error} /></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (payload) => dispatch(resetPassword(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  resetPasswordResult: selectResetPassword,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
