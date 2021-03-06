import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MenuItem } from 'react-toolbox/lib/menu';

import Popup from 'containers/Calendar/CalendarSidebar/Popup';

import MultiLineInput from 'components/MultiLineInput';
import MultiLineInputMentions from 'components/MultiLineInputMentions';
import Preview from 'components/Preview';

import Spinner from 'elements/atm.Spinner';

import Wrapper from './Wrapper';
import MessageToolbar from './MessageToolbar';

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

class MessageEditor extends Component {
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
    const {
      message,
      isProcessing,
      handleMessageChange,
      handleMessageBlur,
      characterLimit,
      openFilePicker,
      mediaItem,
      removeMediaItem,
      openEditor,
      pushToLibrary,
      accountId,
      postSetId,
      openLinkDialog,
      openMediaLibrary,
      urls,
      shortenUrl,
      convertUrl,
      currentChannel,
      permissionClasses,
      isMentionsInput,
      availableFBChannel,
      openAddBlog,
    } = this.props;
    const { menuVisible } = this.state;
    return (
      <Wrapper>
        <MessageToolbar
          characterLimit={characterLimit}
          openFilePicker={openFilePicker}
          openAddBlog={openAddBlog}
          pushToLibrary={pushToLibrary}
          accountId={accountId}
          postSetId={postSetId}
          openLinkDialog={openLinkDialog}
          openMediaLibrary={openMediaLibrary}
          urls={urls}
          shortenUrl={shortenUrl}
          convertUrl={convertUrl}
          mediaItem={mediaItem}
          currentChannel={currentChannel}
          permissionClasses={permissionClasses}
        />
        {
          isMentionsInput ?
            <MultiLineInputMentions
              availableFBChannel={availableFBChannel}
              handleMessageChange={handleMessageChange}
              handleMessageBlur={handleMessageBlur}
              message={message}
              placeholder="What do you want to say?"
            />
            :
              <MultiLineInput
                handleMessageChange={handleMessageChange}
                highlightFocus={currentChannel === -1}
                message={message}
                onBlur={handleMessageBlur}
                placeholder="What do you want to say?"
              />
        }
        {isProcessing &&
          <Spinner />
        }

        {/* Media item */}
        {currentChannel === -1 && mediaItem.media_item_id && !isProcessing &&
        <ItemWrapper>
          <IMenu className={`fa fa-ellipsis-h ${permissionClasses.addContentControl}`} onClick={this.handleShowPopup} />
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
          <Preview item={mediaItem} />
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
  isProcessing: PropTypes.bool,
  openFilePicker: PropTypes.func,
  removeMediaItem: PropTypes.func,
  mediaItem: PropTypes.shape(),
  openEditor: PropTypes.func,
  pushToLibrary: PropTypes.func,
  postSetId: PropTypes.string,
  accountId: PropTypes.string,
  openMediaLibrary: PropTypes.func,
  openLinkDialog: PropTypes.func,
  urls: PropTypes.array,
  shortenUrl: PropTypes.func,
  convertUrl: PropTypes.func,
  currentChannel: PropTypes.number,
  permissionClasses: PropTypes.object,
  isMentionsInput: PropTypes.bool,
  availableFBChannel: PropTypes.string,
  openAddBlog: PropTypes.func,
};

export default MessageEditor;
