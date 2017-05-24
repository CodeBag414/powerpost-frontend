import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoPlayer from 'react-player';
import renderHTML from 'react-render-html';

const Image = styled.img`
  height: auto;
  width: 100%;
  display: block;
  margin: 0 auto;
`;

const LinkTitle = styled.div`
  color: #424647;
  font-size: 15px;
  font-weight: bold;
  line-height: 16px;
  text-align: left;
  margin-top: 20px;
  font-family: Lato;
`;

const LinkDescription = styled.div`
  font-size: 12px;
  color: #424647;
  text-align: left;
  margin-top: 7px;
  line-height: 16px;
  font-family: Lato;
`;

const LinkUrl = styled.div`
  text-transform: uppercase;
  text-align: left;
  color: #8C9496;
  font-family: Lato;
  font-size: 10px;
  font-weight: bold;
  line-height: 12px;
  margin-top: 16px;
`;

const showContent = (items) => {
  const contents = [];
  items.map((item) => {
    const type = item.get('type');
    let media = <div />;

    switch (type) {
      case 'image':
        media = (<Image src={item.getIn(['properties', 'thumb_url'])} />);
        break;
      case 'video':
        media = (<VideoPlayer
          style={{ margin: '0 auto' }}
          width={'initial'}
          height={'initial'}
          url={item.getIn(['properties', 'source_url'])} controls
        />);
        break;
      case 'link':
        media = (<div>
          <Image src={item.getIn(['properties', 'thumb_url'])} />
          <LinkTitle>{item.getIn(['properties', 'description'])}</LinkTitle>
          <LinkDescription>{item.getIn(['properties', 'caption'])}</LinkDescription>
          <LinkUrl>{item.getIn(['properties', 'link'])}</LinkUrl></div>);
        break;
      case 'blog':
        media = (<div>
          <LinkTitle>{item.getIn(['properties', 'caption'])}</LinkTitle>
          <LinkDescription>{item.getIn(['properties', 'title'])}</LinkDescription>
          {renderHTML(item.getIn(['properties', 'html']))}
        </div>);
        break;
      default:
        media = <Image src={item.getIn(['properties', 'thumb_url'])} />;
        break;
    }
    return contents.push(media);
  });

  return contents;
};

function MediaItemPreview({ mediaItems }) {
  return (
    <div>{mediaItems && showContent(mediaItems)}</div>
  );
}

MediaItemPreview.propTypes = {
  mediaItems: PropTypes.arrayOf(PropTypes.shape()),
};

export default MediaItemPreview;
