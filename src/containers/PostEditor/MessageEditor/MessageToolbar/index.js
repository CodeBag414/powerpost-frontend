import React from 'react';

import Wrapper from './Wrapper';
import ToolbarButton from './ToolbarButton';
import Divider from './Divider';
import LimitIndicator from './LimitIndicator';

function MessageToolbar() {
  return (
    <Wrapper>
      <ToolbarButton width={53}><i className="fa fa-database" /></ToolbarButton>
      <Divider />
      <ToolbarButton width={30} marginLeft={12}><i className="fa fa-upload" /></ToolbarButton>
      <ToolbarButton width={30} marginRight={12}><i className="fa fa-link" /></ToolbarButton>
      <Divider />
      <LimitIndicator>140</LimitIndicator>
    </Wrapper>
  );
}

export default MessageToolbar;
