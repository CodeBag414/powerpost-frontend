import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { registerRequest } from 'containers/App/actions';
import { makeSelectAuthError, selectAuth } from 'containers/App/selectors';

import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import CenterText from 'elements/atm.CenterText';

import theme from 'theme';

class SignupVerification extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div style={{ marginTop: '150px' }}>
        <Title>Great Job Name</Title>
        <CenterText style={{ marginTop: '40px' }}>Just one more thing! We have emailed an activation link to
          &nbsp;<span style={{ color: theme.primaryColor }}>email@gmail.com</span>. Please click on the link to activate your account and start creating content today.
        </CenterText>
        <Center style={{ marginTop: '40px' }}>Can't find your activation email?</Center>
        <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Sign Up" primary /></Center>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupVerification);
