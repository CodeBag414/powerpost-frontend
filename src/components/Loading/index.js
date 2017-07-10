import React, { PropTypes } from 'react';
import ReactLoading from 'react-loading';

import theme from 'theme';

import Wrapper from './Wrapper';

const Loading = ({ type, color, opacity, showIndicator }) => (
  <Wrapper opacity={opacity}>
    {
      showIndicator ? <ReactLoading type={type || 'spin'} color={color || theme.primaryColor} /> : null
    }
  </Wrapper>
);

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  showIndicator: PropTypes.bool,
};

Loading.defaultProps = {
  type: '',
  color: '',
  opacity: 0.9,
  showIndicator: true,
};

export default Loading;
