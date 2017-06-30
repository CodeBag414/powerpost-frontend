import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import Logo from 'components/Nav/TopNav/powerpost_logo.png';

const Wrapper = styled.a`
  display: block;
  height: 100%;
  float: left;
  line-height: 60px;
  margin-left: 15px;
`;

const PPLogo = (props) =>
  <Wrapper href="https://www.powerpost.digital" {...props}>
    <img src={Logo} alt="PowerPost Logo" />
  </Wrapper>;

export default PPLogo;
