import React, { PropTypes } from 'react';

import LeftPane from 'components/LeftPane';
import RightPane from 'components/RightPane';
import imgLogo from 'assets/images/logo.png';

import Wrapper from './Wrapper';
import Topbar from './Topbar';
import FormWrapper from './FormWrapper';

const Login = ({ children }) => (
  <Wrapper>
    <LeftPane signup={false}>
      <img src={imgLogo} alt="Logo" />
      <div style={{ position: 'absolute', left: 0, bottom: '160px' }}>
        <div style={{ marginTop: '10px', fontSize: '3.5rem', lineHeight: 1.1 }}>
          Join the Brand<br />
          Publishing Revolution
        </div>
        <div style={{ marginTop: '15px', fontSize: '1.5rem' }}>
          PowerPost Delivers Software And Services To<br />
          Transform Your Brand Into A Power Publisher.
        </div>
      </div>
    </LeftPane>
    <RightPane>
      <Topbar />
      <FormWrapper>
        { children }
      </FormWrapper>
    </RightPane>
  </Wrapper>
);

Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
