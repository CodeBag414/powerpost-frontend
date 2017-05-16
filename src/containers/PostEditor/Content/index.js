import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { postCommentRequest } from 'containers/PostEditor/actions';
import { makeSelectComments } from 'containers/PostEditor/selectors';
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
    comments: ImmutablePropTypes.list,
    params: PropTypes.shape(),
    user: PropTypes.shape(),
  };

  static defaultProps = {
    params: {},
  };

  render() {
    const { postComment, comments, user } = this.props;
    const { params: { postset_id } } = this.props;
    return (
      <Wrapper>
        <Comments />
        <CommentInput user={user} postComment={(text) => postComment(postset_id, text)} />
        {
          comments.map((comment) =>
            <Comment key={comment.get('comment_id')} comment={comment} />
          )
        }
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
  };
}

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
  user: makeSelectUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
