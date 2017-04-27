import React from 'react';

import Wrapper from './Wrapper';

const Header = ({ children }) => (<Wrapper>
  { children }
</Wrapper>);

Header.propTypes = { children: React.PropTypes.string.isRequired };

export default Header;
