import React from 'react';
import PropTypes from 'prop-types';

import MultiLineInput from 'components/MultiLineInput';

import Wrapper from './Wrapper';
import MessageToolbar from './MessageToolbar';

function MessageEditor({ message, handleMessageChange, characterLimit }) {
  return (
    <Wrapper>
      <MessageToolbar characterLimit={characterLimit} />
      <MultiLineInput
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
