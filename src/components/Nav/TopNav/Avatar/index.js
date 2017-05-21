import React from 'react';

import Wrapper from './Wrapper';

const Avatar = ({ children, onClick }) => (<Wrapper onClick={ onClick }>
  { children }
</Wrapper>);

Avatar.propTypes = {
  children: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func,
};

export default Avatar;
