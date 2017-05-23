import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Wrapper from './Wrapper';
import ChannelSlot from './ChannelSlot';

function ChannelSlots({ posts, connections, handleClickTimestamp, currentPost }) {
  return (
    <Wrapper>
      {
        Object.keys(posts).map((connectionId) => {
          const postItems = posts[connectionId];
          const connection = connections.filter((item) =>
            item.connection_id === connectionId,
          )[0];

          if (!connection || postItems.length === 0) return null;

          return (
            <ChannelSlot postItems={postItems} connection={connection} handleClickTimestamp={handleClickTimestamp} currentPost={currentPost} />
          );
        })
      }
    </Wrapper>
  );
}

ChannelSlots.propTypes = {
  currentPost: ImmutablePropTypes.map,
  posts: PropTypes.array,
  connections: PropTypes.array,
  handleClickTimestamp: PropTypes.func,
};

export default ChannelSlots;
