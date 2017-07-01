import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Card from '../Card';

import Wrapper from './Wrapper';

function renderItem(item) {
  const image = (item.getIn(['properties', 'thumb_url'])) ||
    item.getIn(['properties', 'picture']);
  const mediaType = item.get('type');
  let iconName = '';

  switch (mediaType) {
    case 'link':
      iconName = 'fa fa-link';
      break;
    case 'video':
      iconName = 'fa fa-video-camera';
      break;
    case 'image':
      iconName = 'fa fa-picture-o';
      break;
    case 'file':
      iconName = 'fa fa-text-o';
      break;
    case 'document':
      iconName = 'fa fa-file-text-o';
      break;
    default:
      iconName = 'fa fa-file-text-o';
      break;
  }

  return image ? <img role="presentation" src={image} /> : <i className={iconName} />;
}

function ContentHub({ mediaItems, path }) {
  return (
    <Card
      title="Content Hub"
      description="Recently added content."
      link={path}
    >
      <Wrapper>
        {mediaItems && mediaItems.map((item) =>
          <div className="item">{renderItem(item)}</div>
        )}
      </Wrapper>
    </Card>
  );
}

ContentHub.propTypes = {
  mediaItems: ImmutablePropTypes.list,
  path: PropTypes.string,
};

export default ContentHub;
