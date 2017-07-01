import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';

function Section({ status, children }) {
  const title = status === 'review' ? 'Latest In Review' : 'Latest Drafts';
  const iconName = status === 'review' ? 'fa-check-square-o' : 'fa-pencil';
  const icon = <i className={`fa ${iconName}`} />;

  return (
    <Wrapper>
      <div className="header">
        {icon}<span>{title}</span>
      </div>
      {children}
    </Wrapper>
  );
}

Section.propTypes = {
  status: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
