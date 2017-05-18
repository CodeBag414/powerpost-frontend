import React from 'react';
import PropTypes from 'prop-types';

import PPInput from 'elements/atm.Input';

import Wrapper from './Wrapper';

import theme from './styles.scss';

function MessageInput({ message, handleMessageChange }) {
  return (
    <Wrapper>
      <PPInput
        multiline
        type="text"
        hint="Write something here"
        name="messageInput"
        value={message}
        onChange={handleMessageChange}
        theme={theme}
      />
    </Wrapper>
  );
}

MessageInput.propTypes = {
  message: PropTypes.string,
  handleMessageChange: PropTypes.func,
};

export default MessageInput;
