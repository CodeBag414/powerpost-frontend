import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router';

import Logo from './CornerNavLogo.png';

const Wrapper = styled(Link)`
  display: block;
  width: 60px;
  height: 100%;
  background-color: ${(props) => props.theme.primaryColor}
  float: left;
  
  img {
    height: 100%;
    width: 60px;
  }
`;

const PPLogo = () => {
  return(
    <Wrapper to="/">
      <img src={Logo} />
    </Wrapper>
  );
};

export default PPLogo;