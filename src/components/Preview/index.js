import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-player';
import styled from 'styled-components';
import renderHTML from 'react-render-html';

import Wrapper from './Wrapper';

const Image = styled.img`
  max-width: 100%;
  height: auto;
  width: auto;
  max-height: 100%;
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
  margin-top: 15px;
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

const Preview = ({ item }) => {
  const type = item.type;

  let image = '';
  switch (type) {
    case 'link':
      image = item.properties.picture;
      break;
    case 'image':
      image = item.properties.thumb_url || item.properties.source_url;
      break;
    case 'video':
    case 'blog':
    default:
      image = '';
      break;
  }

  return (
    <Wrapper>
      {type === 'video' &&
        <div>
          <LinkTitle style={{ marginBottom: '10px' }}>{item.properties.filename}</LinkTitle>
          <VideoPlayer
            style={{ margin: '0 auto' }}
            width={'initial'}
            height={'initial'}
            url={item.properties.source_url}
            controls
            playing
          />
        </div>
      }
      {type === 'link' &&
        <div>
          <Image src={image} />
          <LinkTitle>{item.properties.title}</LinkTitle>
          <LinkDescription>{item.properties.description}</LinkDescription>
          <LinkUrl>{item.properties.link}</LinkUrl>
        </div>
      }
      {type === 'image' && <Image src={image} />}
      {type === 'blog' && renderHTML(item.properties.html)}
    </Wrapper>
  );
};

Preview.propTypes = {
  item: PropTypes.shape(),
};

export default Preview;
