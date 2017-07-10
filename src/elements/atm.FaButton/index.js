import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';

export default function FaButton({
  faIcon,
  label,
  bgColor,
  fontColor,
  active,
  onClick,
}) {
  return (
    <Wrapper active={active} bgColor={bgColor} fontColor={fontColor} onClick={onClick}>
      <i className={`fa ${faIcon}`} />
      <span>{label}</span>
    </Wrapper>
  );
}

FaButton.propTypes = {
  faIcon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

FaButton.defaultProps = {
  active: false,
};
