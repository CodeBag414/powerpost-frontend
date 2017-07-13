import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Heading from 'components/Heading';

import Wrapper from './Wrapper';
import Comment from './Comment';
import CommentInput from './CommentInput';

function Comments({ comments, deleteComment, postComment, postSetId, user }) {
  return (
    <Wrapper>
      <Heading title="Comments" border />
      <div className="comment-input">
        <CommentInput user={user} postComment={(text) => postComment(postSetId, text)} />
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

Comments.propTypes = {
  comments: ImmutablePropTypes.list,
  deleteComment: PropTypes.func,
  postComment: PropTypes.func,
  postSetId: PropTypes.string,
  user: PropTypes.shape(),
};

export default Comments;
