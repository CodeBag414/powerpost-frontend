import React from 'react';
import { Link } from 'react-router';

import SimpleButton from 'elements/atm.SimpleButton';
import theme from 'theme';

import Wrapper from './Wrapper';

const Topbar = () => (<Wrapper color={theme.textColor}>
  Don&#39;t have an account? <Link className="" to="/signup/account?PP01-PRO-MO" style={{ marginLeft: '40px' }}><SimpleButton color={theme.textColor}>Get Started</SimpleButton></Link>
</Wrapper>);

export default Topbar;
