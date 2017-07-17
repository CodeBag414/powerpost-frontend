import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import Wrapper from './Wrapper';
import theme from './theme.scss';

const Indicator = ({ isProcessing }) => {
  if (isProcessing) {
    return (
      <Wrapper>
        <ProgressBar type="linear" mode="indeterminate" theme={theme} />
      </Wrapper>
    );
  }
  return <div></div>;
};

Indicator.propTypes = {
  isProcessing: PropTypes.bool,
};

export default Indicator;
