import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import Wrapper from './Wrapper';

function Item({ post }) {
  const title = post.get('title') || 'Untitled';
  const creationTime = post.get('creation_time');
  const time = moment(creationTime * 1000).format('M/D');

  return (
    <Wrapper>
      <div>{time}</div><span>{title}</span>
    </Wrapper>
  );
}

Item.propTypes = {
  post: ImmutablePropTypes.map,
};

export default Item;
