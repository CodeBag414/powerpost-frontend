import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IconButton } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import Tooltip from 'react-toolbox/lib/tooltip';

const IconButtonTooltip = Tooltip(IconButton);

const Wrapper = styled.div`
  width: 250px;
  border-radius: 4px;
  background: #FFFFFF;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
  display: inline-block;
  margin: 15px;
  position: relative;
  float: left;
`;

const Footer = styled.div`
  height: 48px;
  width: 250px;
  padding: 10px;
`;

const Title = styled.div`
  font-family: Lato-Bold;
  font-size: 13px;
  color: #616668;
  letter-spacing: 0;
  width: 80%;
  text-align: left;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis; 
`;

const Icon = styled.div`
  width: 20%;
  text-align: right;
  float: right;
`;

const CoverImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
`;

const ImageContainer = styled.div`
  width: 250px;
  height: calc(252px - 48px + 25px);
  text-align: center;
`;

const ActionBar = styled.div`
  width: 100%;
  text-align: right;
`;

const MediaItem = (props) => {
  console.log(props.mediaItem);
  const coverImage = props.mediaItem.properties.thumb_url || '';
  const mediaType = props.mediaItem.type;
  const creationTime = props.mediaItem.creation_time;
  const title = props.mediaItem.properties.title || props.mediaItem.properties.filename || props.mediaItem.properties.description;
  let icon = 'photo';
  if (props.mediaItem.type === 'link') {
    icon = 'link';
  } else if (props.mediaItem.type === 'video') {
    icon = 'videocam';
  } else if (props.mediaItem.type === 'blog') {
    icon = 'description';
  }
  if ( props.mediaItem.status === 0) {
    return;
  }
  
  return(
    <Wrapper>
      <ImageContainer>
        <CoverImage src={coverImage} />
      </ImageContainer>
      <Footer>
        <Title>{title}</Title>
        <Icon><FontIcon value={icon} /></Icon>
      </Footer>
      <ActionBar>
        <IconButtonTooltip icon='remove_red_eye' tooltip="View" onClick={() => props.openPreview(props.mediaItem)} />
        <IconButtonTooltip icon='add' tooltip="Add to post" />
        <IconButtonTooltip icon='delete_forever' tooltip="Delete" onClick={() => props.onDelete(props.mediaItem.media_item_id)} />
      </ActionBar>
    </Wrapper>
  );
};

export default MediaItem;