import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Wrapper from './Wrapper';
import ChannelSlot from './ChannelSlot';

function ChannelSlots({ postSet, connections, handleClickTimestamp, currentPost }) {
  const postsArray = postSet.getIn(['details', 'posts']);
  const posts = {};
  postsArray.map((post) => {
    if (!posts[post.get('connection_id')]) posts[post.get('connection_id')] = [];
    posts[post.get('connection_id')].push(post);
    return true;
  });
  return (
    <Wrapper>
      {
        Object.keys(posts).map((connectionId) => {
          const postItems = posts[connectionId];
          const connection = connections.filter((item) =>
            item.connection_id === connectionId,
          )[0];

          if (!connection) return null;

          return (
            <ChannelSlot postItems={postItems} connection={connection} handleClickTimestamp={handleClickTimestamp} currentPost={currentPost} />
          );
        })
      }
    </Wrapper>
  );
}

ChannelSlots.propTypes = {
  postSet: ImmutablePropTypes.map,
  currentPost: ImmutablePropTypes.map,
  connections: PropTypes.array,
  handleClickTimestamp: PropTypes.func,
};

export default ChannelSlots;
