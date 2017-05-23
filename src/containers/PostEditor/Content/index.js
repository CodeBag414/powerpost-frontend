import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
  updatePostSetRequest,
} from 'containers/App/actions';

import {
  makeSelectUser,
} from 'containers/App/selectors';

import {
  postCommentRequest,
  deleteCommentRequest,
} from 'containers/PostEditor/actions';

import {
  makeSelectComments,
  makeSelectInProgress,
  selectPostSet,
} from 'containers/PostEditor/selectors';

import Wrapper from './Wrapper';
import MessageEditor from '../MessageEditor';
import Comments from './Comments';
import Comment from './Comment';
import CommentInput from './CommentInput';

class Content extends Component {

  static propTypes = {
    postComment: PropTypes.func,
    deleteComment: PropTypes.func,
    comments: ImmutablePropTypes.list,
    params: PropTypes.shape(),
    user: PropTypes.shape(),
    pending: PropTypes.bool,
    postSet: PropTypes.object,
    updatePostSet: PropTypes.func,
  };

  static defaultProps = {
    params: {},
  };

  state = {
    globalMessage: '',
    characterLimit: 140,
  };

  componentWillReceiveProps({ postSet }) {
    const newMessage = postSet.getIn(['details', 'message']);
    if (newMessage === this.state.globalMessage || this.props.postSet.get('details').isEmpty()) {
      this.setState({ globalMessage: newMessage });
    }
  }

  handleMessageChange = (value) => {
    const globalMessage = value;
    const characterLimit = 140 - globalMessage.length;
    this.setState({ globalMessage, characterLimit });
  }

  handleMessageBlur = () => {
    const { updatePostSet, postSet } = this.props;
    const { globalMessage } = this.state;
    updatePostSet({
      ...postSet.get('details').toJS(),
      id: postSet.getIn(['details', 'post_set_id']),
      message: globalMessage,
    });
  }

  render() {
    const { postComment, deleteComment, comments, user, pending } = this.props;
    const { globalMessage, characterLimit } = this.state;
    const { params: { postset_id } } = this.props;
    return (
      <Wrapper pending={pending}>
        <MessageEditor
          message={globalMessage}
          characterLimit={characterLimit}
          handleMessageChange={this.handleMessageChange}
          handleMessageBlur={this.handleMessageBlur}
        />
        <Comments />
        <div className="comment-input">
          <CommentInput user={user} postComment={(text) => postComment(postset_id, text)} />
        </div>
        {
          comments.map((comment) =>
            <Comment
              key={comment.get('comment_id')}
              comment={comment}
              removable={user.user_id === comment.getIn(['user', 'user_id'])}
              remove={deleteComment}
            />
          )
        }
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  user: makeSelectUser(),
  pending: makeSelectInProgress(),
  postSet: selectPostSet(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
