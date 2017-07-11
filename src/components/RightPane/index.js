import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';

const RightPane = ({ children }) => (
  <Wrapper>
    { children }
  </Wrapper>
);

RightPane.propTypes = {
  children: PropTypes.node,
};

export default RightPane;
