/* eslint-disable no-restricted-syntax */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { differenceWith, isEqual } from 'lodash';

import { getConnectionForPost } from 'utils/connections';

import Wrapper from './Wrapper';
import TimeSlot from './TimeSlot';

class TimeSlots extends React.Component {
  componentDidMount() {
    const { currentPost, posts, handleClickTimestamp } = this.props;
    if (!currentPost && posts && posts.length) {
      handleClickTimestamp(posts[0]);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { posts } = this.props;
    if (nextProps.posts.length !== posts.length) { // added or removed
      let newPostItem;
      if (!posts) { // there were no previous posts
        newPostItem = nextProps.posts[0];
      } else if (nextProps.posts.length > posts.length) { // new posts added
        const newPosts = differenceWith(nextProps.posts, posts, isEqual);
        newPostItem = newPosts[0];
      } else if (nextProps.posts.length < posts.length) { // one post deleted
        const deletedPostItem = differenceWith(posts, nextProps.posts, isEqual)[0];
        const indexToChoose = Math.min(posts.indexOf(deletedPostItem), nextProps.posts.length - 1);
        newPostItem = nextProps.posts[indexToChoose];
      }
      if (newPostItem) this.props.handleClickTimestamp(newPostItem);
    } else { // the length is the same, but there might be an updated post
      const updatedPost = differenceWith(nextProps.posts, posts, isEqual)[0];

      // an updated post found
      if (updatedPost) this.props.handleClickTimestamp(updatedPost);
    }
  }

  render() {
    const { posts, connections, handleClickTimestamp, handleRemoveSlot, currentPost, permissionClasses } = this.props;
    return (
      <Wrapper>
        {
          posts.map((post) => {
            const connection = getConnectionForPost(connections, post);
            if (!connection || connection.channel === 'wordpress') return null;

            return (<TimeSlot
              connection={connection}
              currentPost={currentPost}
              handleClickTimestamp={handleClickTimestamp}
              handleRemoveSlot={handleRemoveSlot}
              permissionClasses={permissionClasses}
              post={post}
            />);
          })
        }
      </Wrapper>
    );
  }
}

TimeSlots.propTypes = {
  currentPost: ImmutablePropTypes.map,
  posts: PropTypes.array,
  connections: PropTypes.array,
  handleClickTimestamp: PropTypes.func,
  handleRemoveSlot: PropTypes.func,
  permissionClasses: PropTypes.object,
};

export default TimeSlots;
