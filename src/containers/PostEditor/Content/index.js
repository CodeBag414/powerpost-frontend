import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { postCommentRequest, deleteCommentRequest } from 'containers/PostEditor/actions';
import { makeSelectComments, makeSelectInProgress } from 'containers/PostEditor/selectors';
import { makeSelectUser } from 'containers/App/selectors';
import Comments from './Comments';
import Comment from './Comment';
import CommentInput from './CommentInput';
import Wrapper from './Wrapper';

/* const comments = [
  {
    id: 1,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7Ebla9_lEucRaCo8BKLE1eEsu0fmxyxDYtHmIVMEp0fX95Fs',
    name: 'Olivia Smith',
    time: '2 hrs ago',
    comment: 'I\'ll update the copy. @katiejansen can you replace the image with the close up shot of the two Rum Swizzles. Thanks!',
  },
  {
    id: 2,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK30k4bBK8fadg26VmfdOIbENRIWYaundUQiRGpKHbikRtrOaCuQ',
    name: 'Katie Green',
    time: '15 mins ago',
    comment: 'Sounds Good.',
  },
]; */

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

  render() {
    const { postComment, deleteComment, comments, user, pending } = this.props;
    const { params: { postset_id } } = this.props;
    return (
      <Wrapper pending={pending}>
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
  };
}

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  user: makeSelectUser(),
  pending: makeSelectInProgress(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
