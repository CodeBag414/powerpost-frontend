import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Wrapper from './Wrapper';

function ExpandCollapseButton({ sidebarExpanded, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <i className={classnames('fa', sidebarExpanded ? 'fa-chevron-right' : 'fa-chevron-left')} />
    </Wrapper>
  );
}

ExpandCollapseButton.propTypes = {
  sidebarExpanded: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ExpandCollapseButton;
