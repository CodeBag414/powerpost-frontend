import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PPButton from 'elements/atm.Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';

import NoContent from './NoContent';
import TimeSlots from './TimeSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';
import PostDetails from './PostDetails';

class Schedule extends Component {
  static propTypes = {
    accountConnections: PropTypes.array,
    connections: PropTypes.array,
    newMediaItem: ImmutablePropTypes.map,
    permissionClasses: PropTypes.object,
    availableFBChannel: PropTypes.string,
    postSet: ImmutablePropTypes.map,
    posts: PropTypes.array,
    createBunchPosts: PropTypes.func,
    updatePost: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { posts } = props;
    const currentPost = posts && posts.length && posts[0];

    this.state = {
      currentPost,
      isDialogShown: false,
      postMessage: this.constructPostMessage(currentPost),
      postTime: currentPost && currentPost.schedule_time,
    };
  }

  constructPostMessage = (post) => {
    const { postSet, connections } = this.props;
    let postMessage;
    if (post && post.properties && post.properties.edited) {
      postMessage = post.message;
    } else {
      let channelMessage;
      if (post) {
        let channelName = '';
        if (post.connection_channel) {
          channelName = `message_${post.connection_channel}`;
        } else if (post.connection_id) {
          const connection = connections.filter((item) =>
            item.connection_id === post.connection_id,
          )[0];
          channelName = `message_${connection.channel}`;
        }
        const channelMessages = postSet.getIn(['data', 'properties']).toJS();
        channelMessage = channelMessages[channelName];
      }
      postMessage = channelMessage || postSet.getIn(['data', 'message']);
    }
    return postMessage;
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  handleClickTimestamp = (post) => {
    this.setState({
      currentPost: post,
      postMessage: this.constructPostMessage(post),
      postTime: post && post.schedule_time,
    });
  }

  handleDateChange = (date) => {
    const { updatePost } = this.props;
    const { currentPost } = this.state;

    const newDate = new Date(date).getTime() / 1000;
    this.setState({
      postTime: newDate,
    });

    const newPost = {
      ...currentPost,
      schedule_time: newDate,
    };
    updatePost(newPost);
  }

  handleMessageChange = (value) => {
    this.setState({
      postMessage: value,
    });
  }

  handleMessageBlur = () => {
    const { updatePost } = this.props;
    const { currentPost, postMessage } = this.state;

    const newPost = {
      ...currentPost,
      message: postMessage,
      properties: {
        edited: true,
      },
    };
    updatePost(newPost);
  }

  handleRemoveSlot = (postToDelete) => {
    const { updatePost } = this.props;
    const newPost = {
      ...postToDelete,
      status: '0',
    };
    updatePost(newPost);
  }

  render() {
    const { postSet, accountConnections, connections, posts, newMediaItem, permissionClasses, availableFBChannel, createBunchPosts } = this.props;
    const { isDialogShown, currentPost, postMessage, postTime } = this.state;
    const hasContent = posts && posts.length;
    const connection = connections && connections.filter((item) =>
      currentPost && item.connection_id === currentPost.connection_id,
    )[0];
    const requesting = postSet.get('requesting');
    const currentMediaItems = (newMediaItem.type) ? [newMediaItem] : postSet.getIn(['data', 'media_items']).toJS();

    return (
      <Wrapper>
        <div className="schedule-button-row">
          <div className={`title ${permissionClasses.postScheduleButton}`}>Where to Post?</div>
          <PPButton
            label={
              <div>
                <span className="button-plus">+</span>
                <span className="button-title">Schedule</span>
              </div>
            }
            className={`add-button ${permissionClasses.postScheduleButton}`}
            onClick={this.handleDialogToggle}
            primary
          />
        </div>
        <div className="columns">
          <div className="left">
            {!!hasContent &&
              <div className="sort-by-header">Sort By: Schedule Time</div>
            }
            {hasContent ?
              <TimeSlots
                posts={posts}
                connections={connections}
                handleClickTimestamp={this.handleClickTimestamp}
                handleRemoveSlot={this.handleRemoveSlot}
                currentPost={this.state.currentPost}
                permissionClasses={permissionClasses}
              />
              : <NoContent />
            }
          </div>
          <div className="right">
            {!!(hasContent && currentPost) &&
              <PostDetails
                post={fromJS(currentPost)}
                postSet={postSet}
                postMessage={postMessage}
                postTime={postTime}
                connection={connection}
                handleMessageChange={this.handleMessageChange}
                handleMessageBlur={this.handleMessageBlur}
                handleRemoveSlot={this.handleRemoveSlot}
                handleDateChange={this.handleDateChange}
                newMediaItem={newMediaItem.toJS()}
                permissionClasses={permissionClasses}
                availableFBChannel={availableFBChannel}
              />
            }
          </div>
        </div>
        <AddChannelSlotDialog
          active={isDialogShown}
          connections={accountConnections}
          handleDialogToggle={this.handleDialogToggle}
          mediaItems={currentMediaItems}
          postSet={postSet}
          createBunchPosts={createBunchPosts}
        />
        {requesting && <div className="overlay" />}
      </Wrapper>
    );
  }
}

export default Schedule;
