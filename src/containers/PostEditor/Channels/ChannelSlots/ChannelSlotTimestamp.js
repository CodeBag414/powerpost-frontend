import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import PPButton from 'elements/atm.Button';

function ChannelSlotTimestamp({ post, handleClickTimestamp, currentPost }) {
  return (
    <div className="slot-timestamp">
      <PPButton className={currentPost === post && 'active'} onClick={() => handleClickTimestamp(post)}>
        {
          post.get('status') !== '5' && post.get('schedule_time')
          ? moment.unix(post.get('schedule_time')).format('MMMM D, YYYY [at] hh:mma')
          : 'Post when ready'
        }
      </PPButton>
    </div>
  );
}

ChannelSlotTimestamp.propTypes = {
  post: ImmutablePropTypes.map,
  currentPost: ImmutablePropTypes.map,
  handleClickTimestamp: PropTypes.func,
};

export default ChannelSlotTimestamp;
