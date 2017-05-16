import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
  fetchPostSetRequest,
  updatePostSetRequest,
} from '_common/actions';

import {
  makeSelectUser,
  selectGroupUsers,
} from 'containers/App/selectors';

import {
  fetchGroupUsers,
} from 'containers/App/actions';

import {
  postCommentRequest,
  deleteCommentRequest,
  fetchComments,
} from 'containers/PostEditor/actions';

import {
  makeSelectComments,
  makeSelectInProgress,
  selectPostSet,
} from 'containers/PostEditor/selectors';

import Wrapper from './Wrapper';
import Sidebar from './Sidebar';
import Comments from './Comments';
import Comment from './Comment';
import CommentInput from './CommentInput';
import UserAssignment from './UserAssignment';
import Tags from './Tags';

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
    postSet: PropTypes.object,
    groupUsers: PropTypes.object,
    getComments: PropTypes.func,
    fetchPostSet: PropTypes.func,
    updatePostSet: PropTypes.func,
    fetchGroupUsers: PropTypes.func,
  };

  static defaultProps = {
    params: {},
  };
  componentWillMount() {
    const { params: { account_id, postset_id } } = this.props;
    this.props.getComments(postset_id);
    this.props.fetchPostSet({
      id: postset_id,
    });
    const payload = { accountId: account_id };
    this.props.fetchGroupUsers(payload);
  }

  render() {
    const { postComment, deleteComment, comments, user, pending, postSet, groupUsers, updatePostSet } = this.props;
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
        <Sidebar>
          <UserAssignment
            isFetching={groupUsers.isFetching || postSet.get('isFetching')}
            postSet={postSet.get('details').toJS()}
            assignee={postSet.getIn(['details', 'user_assignments', 0])}
            users={groupUsers.details ? groupUsers.details.groups_users : []}
            updatePostSet={updatePostSet}
          />
          <Tags />
        </Sidebar>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    getComments: (postSetId) => dispatch(fetchComments(postSetId)),
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
    fetchGroupUsers: (payload) => dispatch(fetchGroupUsers(payload)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  user: makeSelectUser(),
  pending: makeSelectInProgress(),
  postSet: selectPostSet(),
  groupUsers: selectGroupUsers(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
