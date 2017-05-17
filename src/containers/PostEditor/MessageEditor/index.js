import React from 'react';

import Wrapper from './Wrapper';
import MessageToolbar from './MessageToolbar';
import MessageInput from './MessageInput';

function MessageEditor() {
  return (
    <Wrapper>
      <MessageToolbar />
      <MessageInput />
    </Wrapper>
  );
}

export default MessageEditor;
