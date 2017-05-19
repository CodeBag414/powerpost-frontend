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
  };

  static defaultProps = {
    params: {},
  };

  state = {
    globalMessage: '',
    characterLimit: 140,
  };

  handleMessageChange = (value) => {
    const globalMessage = value;
    const characterLimit = 140 - globalMessage.length;
    this.setState({ globalMessage, characterLimit });
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
        />
        <Comments />
        <CommentInput user={user} postComment={(text) => postComment(postset_id, text)} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
