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

import NoContent from './NoContent';
import ChannelSlots from './ChannelSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';
import PostDetails from './PostDetails';

class Channels extends Component {

  static propTypes = {
    connections: PropTypes.array,
    postSet: ImmutablePropTypes.map,
    posts: PropTypes.array,
    newMediaItem: ImmutablePropTypes.map,
    updatePost: PropTypes.func,
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
    const { postSet } = this.props;
    let postMessage;
    if (post && post.getIn(['properties', 'edited'])) {
      postMessage = post.get('message');
    } else {
      const channelName = `message_${post.get('connection_channel')}`;
      const channelMessages = postSet.getIn(['details', 'properties']).toJS();
      postMessage = channelMessages[channelName] || postSet.getIn(['details', 'message']);
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
    const { postSet, connections, posts, newMediaItem } = this.props;
    const { isDialogShown, currentPost, postMessage, postTime } = this.state;
    const hasContent = posts && Object.keys(posts).length && connections;
    const connection = connections && connections.filter((item) =>
      currentPost && item.connection_id === currentPost.get('connection_id'),
    )[0];
    const isBunchPosting = postSet.get('bunch_post_fetching');
    const currentMediaItems = (newMediaItem.type) ? [newMediaItem] : postSet.getIn(['details', 'media_items']).toJS();
    return (
      <Wrapper>
        <div className="left">
          <div className="title">Where to Post?</div>
          <PPButton
            label={
              <div>
                <span className="button-plus">+</span>
                <span className="button-title">Add Channel Slot</span>
              </div>
            }
            className="add-button"
            onClick={this.handleDialogToggle}
            primary
          />
          <div className="content">
            {hasContent ?
              <ChannelSlots
                posts={posts}
                connections={connections}
                handleClickTimestamp={this.handleClickTimestamp}
                handleRemoveSlot={this.handleRemoveSlot}
                currentPost={this.state.currentPost}
              />
            : <NoContent />
            }
          </div>
        </div>

        { hasContent && currentPost ?
          <div className="right">
            <PostDetails
              post={currentPost}
              postSet={postSet}
              postMessage={postMessage}
              postTime={postTime}
              connection={connection}
              handleMessageChange={this.handleMessageChange}
              handleMessageBlur={this.handleMessageBlur}
              handleRemoveSlot={this.handleRemoveSlot}
              handleDateChange={this.handleDateChange}
              newMediaItem={newMediaItem.toJS()}
            />
          </div>
        :
          null
        }

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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
