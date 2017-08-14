import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PPButton from 'elements/atm.Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';

import {
  makeSelectConnections,
} from 'containers/Main/selectors';

import { selectNewMediaItem } from 'containers/PostEditor/selectors';

import NoContent from './NoContent';
import TimeSlots from './TimeSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';
import PostDetails from './PostDetails';

class Schedule extends Component {
  static propTypes = {
    connections: PropTypes.array,
    postSet: ImmutablePropTypes.map,
    posts: PropTypes.array,
    newMediaItem: ImmutablePropTypes.map,
    updatePost: PropTypes.func,
    permissionClasses: PropTypes.object,
    availableFBChannel: PropTypes.string,
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
        const channelMessages = postSet.getIn(['details', 'properties']).toJS();
        channelMessage = channelMessages[channelName];
      }
      postMessage = channelMessage || postSet.getIn(['details', 'message']);
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
    updatePost(newPost, 'bunch_post');
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
    updatePost(newPost, 'bunch_post');
  }

  handleRemoveSlot = (postToDelete) => {
    const { updatePost } = this.props;
    const newPost = {
      ...postToDelete,
      status: '0',
    };
    updatePost(newPost, 'bunch_post');
  }

  render() {
    const { postSet, connections, posts, newMediaItem, permissionClasses, availableFBChannel } = this.props;
    const { isDialogShown, currentPost, postMessage, postTime } = this.state;
    const hasContent = posts && posts.length;
    const connection = connections && connections.filter((item) =>
      currentPost && item.connection_id === currentPost.connection_id,
    )[0];
    const isBunchPosting = postSet.get('bunch_post_fetching');
    const currentMediaItems = (newMediaItem.type) ? [newMediaItem] : postSet.getIn(['details', 'media_items']).toJS();

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
          handleDialogToggle={this.handleDialogToggle}
          mediaItems={currentMediaItems}
        />
        {isBunchPosting && <div className="overlay" />}
      </Wrapper>
    );
  }
}

function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  connections: makeSelectConnections(),
  newMediaItem: selectNewMediaItem(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
