import React, { PropTypes } from 'react';
import Wrapper from './Wrapper';
import styled from 'styled-components';
import FontIcon from 'react-toolbox/lib/font_icon';

const Image = styled.img`
  max-width: 100%;
  height: auto;
  width: auto;
  max-height: 100%;
`;

const ImageWrapper = styled.div`
  text-align: center;
`;

const Title = styled.span`
  display: inline-block;
  vertical-align: top;
  font-size: 18px;
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis;
  width: 90%;
`;

const LinkTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis;
  color: #424647;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
`;

const LinkDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis;
  font-size: 12px;
   color: #424647;
   text-align: left;
   margin-bottom: 10px;
`;

const LinkUrl = styled.div`
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow:    ellipsis;
  text-transform: uppercase;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  color: #8C9496;
`;

const Preview = (props) => {
  console.log(props.item);
  const title = props.item.properties.title || props.item.properties.filename || props.item.properties.description;
  const titleWithType = `${title} (${props.item.type})`;
  let icon = 'photo';
  if (props.item.type === 'link') {
    icon = 'link';
  } else if (props.item.type === 'video') {
    icon = 'videocam';
  } else if (props.item.type === 'blog') {
    icon = 'description';
  }
  
  let image = '';
  if (props.item.type === 'image' || props.item.type === 'link') {
    image = props.item.properties.thumb_url;
  }
  
  return(
    <Wrapper>
      <div style={{height: '24px', marginBottom: '10px'}}>
      <FontIcon value={icon} /><Title>{titleWithType}</Title>
      </div>
      <ImageWrapper>
        {props.item.type === 'video' && 
          <video width='100%' height='auto' controls>
          <source src={props.item.properties.source_url} type="video/mp4" />
          </video>
        }
        {props.item.type !== 'video' && 
          <Image src={image} /> 
        }
        {props.item.type == 'link' &&
          <div>
            <LinkTitle>{props.item.properties.description}</LinkTitle>
            <LinkDescription>{props.item.properties.caption}</LinkDescription>
            <LinkUrl>{props.item.properties.link}</LinkUrl>
          </div>
        }
      </ImageWrapper>
    </Wrapper>
  );
};

Preview.propTypes = {
  item: PropTypes.object,
};

export default Preview;
