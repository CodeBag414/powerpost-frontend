import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const getStyledComment = (comment) =>
  comment.split('@').map((cm1, index) =>
    <span key={index}>
      <span className={index ? 'person-link' : ''}>
        {`${index ? '@' : ''}${cm1.split(' ')[0]}`}
      </span>
      <span>
        {` ${cm1.split(' ').slice(1).join(' ')}`}
      </span>
    </span>
  );

function Comment({ comment }) {
  const avatar = comment.getIn(['user', 'properties', 'thumb_url']);
  const name = comment.getIn(['user', 'display_name']);
  const time = comment.getIn(['creation_time']);
  const text = comment.getIn(['text']);
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
        <div className="comment">{getStyledComment(text)}</div>
      </div>
    </Wrapper>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape(),
};

export default Comment;
