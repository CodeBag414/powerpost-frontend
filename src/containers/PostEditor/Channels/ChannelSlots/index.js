import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Wrapper from './Wrapper';

function ChannelSlots({ postSet }) {
  return (
    <Wrapper>
      {
        postSet.getIn(['details', 'posts']).map((post) =>
          <div key={post.get('post_id')}>{post.get('post_id')}</div>
        )
      }
    </Wrapper>
  );
}

ChannelSlots.propTypes = {
  postSet: ImmutablePropTypes.map,
};

export default ChannelSlots;
