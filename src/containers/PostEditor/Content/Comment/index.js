import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const getStyledComment = (comment) =>
  comment.split('@').map((cm1, index) =>
    <span>
      <span className={index ? 'person-link' : ''}>
        {`${index ? '@' : ''}${cm1.split(' ')[0]}`}
      </span>
      <span>
        {` ${cm1.split(' ').slice(1).join(' ')}`}
      </span>
    </span>
  );

function Comment({ comment: { avatar, name, time, comment } }) {
  return (
    <Wrapper>
      <img
        className="avatar"
        src={avatar}
        alt=""
      />
      <div className="content">
        <div className="heading">
          <div className="name">{name}</div>
          <div className="time">{time}</div>
        </div>
        <div className="comment">{getStyledComment(comment)}</div>
      </div>
    </Wrapper>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape(),
};

export default Comment;
