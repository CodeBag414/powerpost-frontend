import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PPButton from 'elements/atm.Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectConnections,
} from 'containers/App/selectors';

import NoContent from './NoContent';
import ChannelSlots from './ChannelSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';
import PostDetails from './PostDetails';

class Channels extends Component {

  static propTypes = {
    postSet: ImmutablePropTypes.map,
    posts: PropTypes.array,
    connections: PropTypes.array,
    updatePost: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { posts, connections } = props;
    const currentPost = posts[Object.keys(posts)[0]][0];
    const connection = connections.filter((item) =>
      item.connection_id === currentPost.get('connection_id'),
    )[0];
    this.state = {
      currentPost,
      currentPostConnection: connection,
      isDialogShown: false,
      message: '',
    };
  }

  componentWillReceiveProps(/* nextProps */) {
    // const { currentPost } = this.state;
    // if (currentPost.get('message') === nextProps.post.get('message') || currentPost.isEmpty()) {
    //   this.setState({
    //     currentPost: nextProps.post,
    //   });
    // }
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  handleClickTimestamp = (post, connection) => {
    this.setState({
      currentPost: post,
      currentPostConnection: connection,
    });
  }

  handleMessageChange = () => {
  }

  handleMessageBlur = () => {
  }

  handleRemoveSlot = (postToDelete) => {
    const { updatePost } = this.props;
    const newPost = {
      ...postToDelete.toJS(),
      status: 0,
    };
    updatePost(newPost);
  }

  render() {
    const { postSet, connections, posts } = this.props;
    const { isDialogShown, currentPost, currentPostConnection } = this.state;
    const hasContent = posts && Object.keys(posts).length;
    const isBunchPosting = postSet.get('bunch_post_fetching');
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
            {
              hasContent
                ? <ChannelSlots posts={posts} connections={connections} handleClickTimestamp={this.handleClickTimestamp} currentPost={this.state.currentPost} />
                : <NoContent />
            }
          </div>
        </div>

        { hasContent && currentPost &&
          <div className="right">
            <PostDetails post={currentPost} connection={currentPostConnection} handleMessageChange={this.handleMessageChange} handleMessageBlur={this.handleMessageBlur} handleRemoveSlot={this.handleRemoveSlot} />
          </div>
        }

        <AddChannelSlotDialog
          handleDialogToggle={this.handleDialogToggle}
          active={isDialogShown}
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
  connections: selectConnections(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
