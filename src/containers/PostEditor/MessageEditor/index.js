import React from 'react';
import PropTypes from 'prop-types';

import MultiLineInput from 'components/MultiLineInput';

import Wrapper from './Wrapper';
import MessageToolbar from './MessageToolbar';

function MessageEditor({ message, handleMessageChange,handleMessageBlur, characterLimit, openFilePicker }) {
  return (
    <Wrapper>
      <MessageToolbar characterLimit={characterLimit} openFilePicker={openFilePicker} />
      <MultiLineInput
        message={message}
        handleMessageChange={handleMessageChange}
        onBlur={handleMessageBlur}
      />
    </Wrapper>
  );
}

MessageEditor.propTypes = {
  message: PropTypes.string,
  handleMessageChange: PropTypes.func,
  handleMessageBlur: PropTypes.func,
  characterLimit: PropTypes.number,
};

export default MessageEditor;
