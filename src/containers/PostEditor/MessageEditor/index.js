import React from 'react';
import PropTypes from 'prop-types';

import MultiLineInput from 'components/MultiLineInput';

import Wrapper from './Wrapper';
import MessageToolbar from './MessageToolbar';

function MessageEditor({ message, handleMessageChange,handleMessageBlur, characterLimit, openFilePicker, mediaItem, removeMediaItem, openEditor, pushToLibrary, accountId, postSetId }) {
  return (
    <Wrapper>
      <MessageToolbar characterLimit={characterLimit} openFilePicker={openFilePicker} pushToLibrary={pushToLibrary} accountId={accountId} postSetId={postSetId} />
      <MultiLineInput
        message={message}
        handleMessageChange={handleMessageChange}
        onBlur={handleMessageBlur}
      />
      {mediaItem &&
      <div>{mediaItem.media_item_id}<button onClick={removeMediaItem}>Remove</button><button onClick={() => openEditor(mediaItem)}>Edit</button></div>
      }
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
