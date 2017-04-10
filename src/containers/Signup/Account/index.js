import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { registerRequest } from 'containers/App/actions';
import { makeSelectAuthError, selectAuth } from 'containers/App/selectors';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

class SignupAccount extends Component {
  static propTypes = {
    saveFormData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: '',
        error: '',
      },
      email: {
        value: '',
        error: '',
      },
      phone: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
      confirmPassword: {
        value: '',
        error: '',
      },
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.saveFormData({
      display_name: this.state.name.value,
      email: this.state.email.value,
      password: this.state.password.value,
    });
  }

  onFieldChange = (ev) => {
    let { name, value } = ev.target;
    let error;

    switch (name) {
      case 'password':
        if (value !== this.state.confirmPassword.value) {
          error = 'Password does not match';
        }
        break;
        // return this.setState({
        //   password: {
        //     value,
        //   },
        //   confirmPassword: {
        //     value: this.state.confirmPassword.value,
        //     error,
        //   },
        // });
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
    });
  }

  render() {
    return (
      <div>
        <Title>Become a Power Publisher</Title>
        <Center>Create more content. Reach more people. Generate more leads.</Center>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '40px' }}>
          <PPTextField
            type="text"
            name="name"
            hintText="Example Name"
            floatingLabelText="Name"
            value={this.state.name.value}
            errorText={this.state.name.error}
            onChange={this.onFieldChange}
          />
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
            type="text"
            name="phone"
            hintText="Optional"
            floatingLabelText="Phone Number"
            rightLabelText="Optional"
            value={this.state.phone.value}
            errorText={this.state.phone.error}
            onChange={this.onFieldChange}
          />
          <PPTextField
            type="password"
            name="password"
            hintText="6+ Characters"
            floatingLabelText="Password"
            value={this.state.password.value}
            errorText={this.state.password.error}
            onChange={this.onFieldChange}
          />
          <PPTextField
            type="password"
            name="confirmPassword"
            hintText="6+ Characters"
            floatingLabelText="Confirm Password"
            value={this.state.confirmPassword.value}
            errorText={this.state.confirmPassword.error}
            onChange={this.onFieldChange}
          />
          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Sign Up" primary /></Center>
          <Center style={{ marginTop: '30px' }}>By clicking Sign Up, I accept PowerPost's&nbsp;<PPLink to="/terms">Licence Terms</PPLink></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    register: (name, email, password) => dispatch(registerRequest({ name, email, password })),
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupAccount);
