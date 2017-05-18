import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import MessageToolbar from './MessageToolbar';
import MessageInput from './MessageInput';

function MessageEditor({ message, handleMessageChange, characterLimit }) {
  return (
    <Wrapper>
      <MessageToolbar characterLimit={characterLimit} />
      <MessageInput
        message={message}
        handleMessageChange={handleMessageChange}
      />
    </Wrapper>
  );
}

MessageEditor.propTypes = {
  message: PropTypes.string,
  handleMessageChange: PropTypes.func,
  characterLimit: PropTypes.number,
};

export default MessageEditor;
