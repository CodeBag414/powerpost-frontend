import React from 'react';
import PropTypes from 'prop-types';

import MediaItemPreview from 'components/MediaItemPreview';

import Wrapper from './Wrapper';

function PostContent({ creationTime, message, mediaItems }) {
  return (
    <Wrapper className="col-md-8">
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px' }}>
        <div className="time">{creationTime}</div>
        <div className="description">{message}</div>
        <div className="mediaContent">
          <MediaItemPreview mediaItems={mediaItems} />
        </div>
      </div>
    </Wrapper>
  );
}

PostContent.propTypes = {
  creationTime: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  mediaItems: PropTypes.arrayOf(PropTypes.shape),
};

export default PostContent;
