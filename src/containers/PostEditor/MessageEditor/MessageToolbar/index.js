import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'elements/atm.Tooltip';

import Wrapper from './Wrapper';
import ToolbarButton from './ToolbarButton';
import Divider from './Divider';
import LimitIndicator from './LimitIndicator';

const TooltipToolbarButton = Tooltip(ToolbarButton);

function MessageToolbar({ characterLimit, openFilePicker, openLinkDialog, openMediaLibrary, urls, shortenUrl, convertUrl, mediaItem, currentChannel }) {
  return (
    <Wrapper currentChannel={currentChannel}>
      {currentChannel === -1 ?
        <div>
          <TooltipToolbarButton tooltip="Open Content Library" tooltipDelay={200} width={30} marginLeft={12} onClick={openMediaLibrary}><i className="fa fa-folder-o" /></TooltipToolbarButton>
          <TooltipToolbarButton tooltip="Upload Content" tooltipDelay={200} width={30} marginLeft={12} onClick={openFilePicker}><i className="fa fa-upload" /></TooltipToolbarButton>
          <TooltipToolbarButton tooltip="Insert Link" tooltipDelay={200} width={30} marginRight={12} marginLeft={12} onClick={openLinkDialog}><i className="fa fa-link" /></TooltipToolbarButton>
          <Divider />
          {urls && urls.length && !mediaItem.media_item_id ?
            <ToolbarButton width={115} onClick={convertUrl} fontSize={10}>Convert URL to link</ToolbarButton>
          :
            null
          }
          {urls && urls.length && !mediaItem.media_item_id ?
            <Divider />
          :
            null
          }
          {urls && urls.length ?
            <ToolbarButton width={75} onClick={shortenUrl} fontSize={10}>Shorten URL</ToolbarButton>
          :
            null
          }
          {urls && urls.length ?
            <Divider />
          :
            null
          }
        </div>
      :
        <div>
          {/* TODO: Add channel specific toolbar buttons here */}
        </div>
      }
      <LimitIndicator className={characterLimit < 0 && 'negative'}>{characterLimit}</LimitIndicator>
    </Wrapper>
  );
}

MessageToolbar.propTypes = {
  characterLimit: PropTypes.number,
  openFilePicker: PropTypes.func,
  openLinkDialog: PropTypes.func,
  openMediaLibrary: PropTypes.func,
  urls: PropTypes.array,
  shortenUrl: PropTypes.func,
  convertUrl: PropTypes.func,
  mediaItem: PropTypes.shape(),
  currentChannel: PropTypes.number,
};

export default MessageToolbar;
