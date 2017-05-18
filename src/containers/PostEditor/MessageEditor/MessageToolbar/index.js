import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import ToolbarButton from './ToolbarButton';
import Divider from './Divider';
import LimitIndicator from './LimitIndicator';

function MessageToolbar({ characterLimit }) {
  return (
    <Wrapper>
      <ToolbarButton width={53}><i className="fa fa-database" /></ToolbarButton>
      <Divider />
      <ToolbarButton width={30} marginLeft={12}><i className="fa fa-upload" /></ToolbarButton>
      <ToolbarButton width={30} marginRight={12}><i className="fa fa-link" /></ToolbarButton>
      <Divider />
      <LimitIndicator className={characterLimit < 0 && 'negative'}>{characterLimit}</LimitIndicator>
    </Wrapper>
  );
}

MessageToolbar.propTypes = {
  characterLimit: PropTypes.number,
};

export default MessageToolbar;
