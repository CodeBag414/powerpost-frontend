import React from 'react';
import PropTypes from 'prop-types';

import MultiLineInput from 'components/MultiLineInput';
import MediaItemPreview from 'components/MediaItemPreview';
import { fromJS } from 'immutable';
import Wrapper from './Wrapper';
import MessageToolbar from './MessageToolbar';
import Popup from 'containers/Calendar/CalendarSidebar/Popup';
import { MenuItem } from 'react-toolbox/lib/menu';
import styled from 'styled-components';
import Spinner from 'elements/atm.Spinner';

const CustomMenuItem = styled(MenuItem)`
  width: 170px;
  height: 36px;

  i {
    color: #8C9496;
  }

  span {
    flex-grow: 0;
  }

  &:hover {
    background: #E81C64 !important;
    i {
      color: white !important;
    }
    div {
      color: white !important;
    }
  }
`;

const MenuItemCaption = styled.div`
  color: #8C9496;
  margin-left: 10px;
`;

const ItemWrapper = styled.div`
  position: relative;
  padding: 5px;
  
`;

const IMenu = styled.i`
  position: absolute;
  right: 20px;
  top: 10px;
  border: white solid 1px;
  padding: 5px;
  border-radius: 4px;
  background: lightgray;
  cursor: pointer;
`;

class MessageEditor extends React.Component {
  state = {
    menuVisible: false,
  };

  handleHidePopup = () => {
    this.setState({ menuVisible: false });
  }

  handleShowPopup = () => {
    this.setState({
      menuVisible: true,
    });
  }
  
  render() {
    const { message, isProcessing, handleMessageChange,handleMessageBlur, characterLimit, openFilePicker, mediaItem, removeMediaItem, openEditor, pushToLibrary, accountId, postSetId, openLinkDialog, openMediaLibrary } = this.props;
    const { menuVisible } = this.state;
    return (
    <Wrapper>
      <MessageToolbar characterLimit={characterLimit} openFilePicker={openFilePicker} pushToLibrary={pushToLibrary} accountId={accountId} postSetId={postSetId} openLinkDialog={openLinkDialog} openMediaLibrary={openMediaLibrary} />
      <MultiLineInput
        message={message}
        handleMessageChange={handleMessageChange}
        onBlur={handleMessageBlur}
      />
      {isProcessing && 
        <Spinner />
      }
      {mediaItem.media_item_id && !isProcessing &&
      <ItemWrapper>
      <IMenu className="fa fa-ellipsis-h" onClick={this.handleShowPopup} />
        {menuVisible &&
          <Popup onOutsideClick={this.handleHidePopup}>
            <CustomMenuItem onClick={removeMediaItem} >
              <i className="fa fa-trash" />
              <MenuItemCaption>Remove</MenuItemCaption>
            </CustomMenuItem>
            <CustomMenuItem onClick={() => openEditor(mediaItem)}>
              <i className="fa fa-edit" />
              <MenuItemCaption>Edit</MenuItemCaption>
            </CustomMenuItem>
          </Popup>
        }
        <MediaItemPreview mediaItems={fromJS([mediaItem])} />
      </ItemWrapper>
      }
    </Wrapper>
  );
  }
}

MessageEditor.propTypes = {
  message: PropTypes.string,
  handleMessageChange: PropTypes.func,
  handleMessageBlur: PropTypes.func,
  characterLimit: PropTypes.number,
};

export default MessageEditor;
