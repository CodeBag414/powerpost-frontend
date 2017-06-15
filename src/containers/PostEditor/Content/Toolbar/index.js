import React from 'react';
import PropTypes from 'prop-types';
import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';
import Title from './Title';
import HR from './HR';

function MessageToolbar({ openFilePicker, openLinkDialog, openMediaLibrary, hidden }) {
  return (
    <Wrapper hidden={hidden}>
      <Title>Add Content</Title>
      <HR />
      <Button onClick={openFilePicker} icon={<i className="fa fa-arrow-circle-up" style={{ color: 'rgb(232, 28, 100)' }} />} style={{ border: 'none' }} label="Upload New" />
      <Button onClick={openMediaLibrary} icon={<i className="fa fa-folder-o" style={{ color: 'rgb(232, 28, 100)' }} />} style={{ border: 'none' }} label="Via Content Library" />
      <Button onClick={openLinkDialog} icon={<i className="fa fa-link" style={{ color: 'rgb(232, 28, 100)' }} />} style={{ border: 'none' }} label="Insert Link" />
    </Wrapper>
  );
}

MessageToolbar.propTypes = {
  openFilePicker: PropTypes.func,
  openLinkDialog: PropTypes.func,
  openMediaLibrary: PropTypes.func,
  hidden: PropTypes.bool,
};

export default MessageToolbar;
