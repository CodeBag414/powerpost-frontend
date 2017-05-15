import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router';

import Logo from './CornerNavLogo.png';

const CustomLink = ({isAccountPath, ...rest}) => (
  <Link {...rest}>
    {rest.children}
  </Link>
);

const Wrapper = styled(CustomLink)`
  display: ${(props) => props.isAccountPath ? 'none' : 'block'};
  width: 60px;
  height: 100%;
  background-color: ${(props) => props.theme.primaryColor}
  float: left;
  
  img {
    height: 100%;
    width: 60px;
  }
`;

const PPLogo = (props) => {
  return(
    <Wrapper to="/" {...props}>
      <img src={Logo} />
    </Wrapper>
  );
};

export default PPLogo;