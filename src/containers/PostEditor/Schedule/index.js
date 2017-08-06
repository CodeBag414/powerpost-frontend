import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PPButton from 'elements/atm.Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectConnections,
} from 'containers/Main/selectors';

import { selectNewMediaItem } from 'containers/PostEditor/selectors';

import { getMediaTypeAndItem } from 'utils/media';

import PostPreview from 'containers/PostEditor/PostPreview';

import NoContent from './NoContent';
import ChannelSlots from './ChannelSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';

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
    const currentPost = Object.keys(posts).length && posts[Object.keys(posts)[0]][0];

    this.state = {
      currentPost,
      isDialogShown: false,
      postMessage: this.constructPostMessage(currentPost),
      postTime: currentPost && currentPost.get('schedule_time'),
    };
  }

  constructPostMessage = (post) => {
    const { postSet, connections } = this.props;
    let postMessage;
    if (post && post.getIn(['properties', 'edited'])) {
      postMessage = post.get('message');
    } else {
      let channelMessage;
      if (post) {
        let channelName = '';
        if (post.get('connection_channel')) {
          channelName = `message_${post.get('connection_channel')}`;
        } else if (post.get('connection_id')) {
          const connection = connections.filter((item) =>
            item.connection_id === post.get('connection_id'),
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
      postTime: post && post.get('schedule_time'),
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
      ...currentPost.toJS(),
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
      ...currentPost.toJS(),
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
      ...postToDelete.toJS(),
      status: '0',
    };
    updatePost(newPost, 'bunch_post');
  }

  render() {
    const { postSet, connections, posts, newMediaItem, permissionClasses, availableFBChannel } = this.props;
    const { isDialogShown, currentPost, postMessage, postTime } = this.state;
    const hasContent = posts && Object.keys(posts).length && connections;
    const connection = connections && connections.filter((item) =>
      currentPost && item.connection_id === currentPost.get('connection_id'),
    )[0];
    const isBunchPosting = postSet.get('bunch_post_fetching');
    const currentMediaItems = (newMediaItem.type) ? [newMediaItem] : postSet.getIn(['details', 'media_items']).toJS();

    const { type, mediaItem } = getMediaTypeAndItem(newMediaItem, postSet);
    const postSetId = postSet.getIn(['details', 'post_set_id']);

    return (
      <Wrapper>
        <div className="left">
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
          {hasContent ?
            <ChannelSlots
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
          {(!!hasContent && currentPost) &&
            <PostPreview
              mediaItem={mediaItem}
              post={currentPost}
              postMessage={postMessage}
              postSetId={postSetId}
              postTime={postTime}
              connection={connection}
              postSet={postSet}
              type={type}
              title="Preview"
            />
          }
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
