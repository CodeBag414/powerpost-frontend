import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Heading({ title, expand, isExpanded }) {
  return (
    <Wrapper>
      <div className="title">{title}</div>
      {
        expand &&
        <div className="expand-icon">
          <i className="fa fa-chevron-up" aria-hidden="true" onClick={() => expand(!isExpanded)} />
        </div>
      }
    </Wrapper>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  expand: PropTypes.func,
  isExpanded: PropTypes.bool,
};

export default Heading;
