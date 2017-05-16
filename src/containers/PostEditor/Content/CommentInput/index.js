import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'elements/atm.TextField';
import Wrapper from './Wrapper';

function CommentInput({ postComment, user }) {
  let inputTarget = null;

  const onKeyPress = (e) => {
    const code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13 && inputTarget) {
      postComment(inputTarget.value);
      inputTarget.value = '';
    }
  };

  const onChange = (e) => {
    if (!inputTarget) {
      inputTarget = e.target;
    }
  };

  return (
    <Wrapper>
      <img
        className="avatar"
        src={user && user.properties.thumb_url}
        alt=""
      />
      <div className="input" onKeyPress={onKeyPress}>
        <TextField onChange={onChange} />
      </div>
    </Wrapper>
  );
}

CommentInput.propTypes = {
  postComment: PropTypes.func,
  user: PropTypes.shape(),
};

export default CommentInput;
