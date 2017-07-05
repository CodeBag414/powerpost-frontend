import React, { PropTypes } from 'react';
import ReactLoading from 'react-loading';

import theme from 'theme';

import Wrapper from './Wrapper';

const Loading = ({ type, color, opacity }) => (
  <Wrapper opacity={opacity}>
    <ReactLoading type={type || 'spin'} color={color || theme.primaryColor} />
  </Wrapper>
);

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
};

Loading.defaultProps = {
  type: '',
  color: '',
  opacity: 0.9,
};

export default Loading;
