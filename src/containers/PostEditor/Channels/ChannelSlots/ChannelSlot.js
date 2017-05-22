import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ChannelSlotHeader from './ChannelSlotHeader';
import ChannelSlotTimestamp from './ChannelSlotTimestamp';

function ChannelSlot({ postItems, connection, handleClickTimestamp, currentPost }) {
  return (
    <div className="channel-slot">
      <ChannelSlotHeader connection={connection} />
      {
        postItems.map((post) =>
          <ChannelSlotTimestamp
            post={post}
            handleClickTimestamp={(clickedPost) => handleClickTimestamp(clickedPost, connection)}
            currentPost={currentPost}
          />
        )
      }
    </div>
  );
}

ChannelSlot.propTypes = {
  postItems: PropTypes.array,
  connection: PropTypes.object,
  handleClickTimestamp: PropTypes.func,
  currentPost: ImmutablePropTypes.map,
};

export default ChannelSlot;
