import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PPButton from 'elements/atm.Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectAccountConnections,
} from 'containers/Main/selectors';

import {
  selectPostSet,
} from 'containers/PostEditor/selectors';

import NoContent from './NoContent';
import ChannelSlots from './ChannelSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';
import PostDetails from './PostDetails';

class Channels extends Component {

  static propTypes = {
    postSet: ImmutablePropTypes.map,
    connections: PropTypes.array,
  };

  state = {
    isDialogShown: false,
    currentPost: null,
    message: '',
  };

  componentWillReceiveProps(nextProps) {
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

  render() {
    const { postSet, connections } = this.props;
    const { isDialogShown, currentPost, currentPostConnection } = this.state;
    const posts = postSet.getIn(['details', 'posts']);
    const hasContent = posts && posts.size;
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
                ? <ChannelSlots postSet={postSet} connections={connections} handleClickTimestamp={this.handleClickTimestamp} currentPost={this.state.currentPost} />
                : <NoContent />
            }
          </div>
        </div>

        { hasContent && currentPost &&
          <div className="right">
            <PostDetails post={currentPost} connection={currentPostConnection} handleMessageChange={this.handleMessageChange} handleMessageBlur={this.handleMessageBlur} />
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
  connections: makeSelectAccountConnections(),
  postSet: selectPostSet(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
