import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from "immutable";
import Preview from 'components/Preview';

import Wrapper from './Wrapper';

function PostContent({ creationTime, message, mediaItems }) {
  let item;
  if (mediaItems.length === 0) {
    item = {type: 'empty'};
  } else {
    item = mediaItems.toJS()[0];
  }
  return (
    <Wrapper className="col-md-8">
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px' }}>
        <div className="time">{creationTime}</div>
        <div className="description">{message}</div>
        <div className="mediaContent">
          <Preview item={item} toggled={true} />
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
