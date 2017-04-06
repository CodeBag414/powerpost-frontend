import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';

import { registerRequest } from 'containers/App/actions';
import { makeSelectAuthError, selectAuth } from 'containers/App/selectors';

import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

import Wrapper from './Wrapper';
import FormWrapper from './FormWrapper';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import Topbar from './Topbar';

class Signup extends Component {
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

    if (this.state.validPassword) {
      this.props.register(this.state.nameValue, this.state.emailValue, this.state.passwordValue);
    } else {
      this.setState({ errorText: 'Passwords do not match' });
    }
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
      <Wrapper>
        <LeftPane />
        <RightPane>
          <Topbar />
          <FormWrapper>
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
          </FormWrapper>
        </RightPane>
      </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
