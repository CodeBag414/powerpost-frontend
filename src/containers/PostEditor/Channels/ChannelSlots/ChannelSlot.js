import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ChannelSlotHeader from './ChannelSlotHeader';
import ChannelSlotTimestamp from './ChannelSlotTimestamp';

function ChannelSlot({ postItems, connection, handleClickTimestamp, handleRemoveSlot, currentPost, permissionClasses }) {
  return (
    <div className="channel-slot">
      <ChannelSlotHeader connection={connection} />
      {
        postItems.map((post) =>
          <ChannelSlotTimestamp
            post={post}
            handleClickTimestamp={handleClickTimestamp}
            handleRemoveSlot={handleRemoveSlot}
            currentPost={currentPost}
            permissionClasses={permissionClasses}
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
  handleRemoveSlot: PropTypes.func,
  currentPost: ImmutablePropTypes.map,
  permissionClasses: PropTypes.object,
};

export default ChannelSlot;
