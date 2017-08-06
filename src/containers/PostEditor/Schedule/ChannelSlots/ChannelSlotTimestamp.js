/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import classnames from 'classnames';

import PPButton from 'elements/atm.Button';

function ChannelSlotTimestamp({ post, currentPost, handleClickTimestamp, handleRemoveSlot, permissionClasses }) {
  return (
    <div className={classnames('slot-timestamp', { active: currentPost === post })}>

      <PPButton className={currentPost === post && 'active'} onClick={() => handleClickTimestamp(post)}>
        {
          post.get('status') !== '5' && post.get('schedule_time')
          ? moment.unix(post.get('schedule_time')).format('MMMM D, YYYY [at] hh:mma')
          : 'Post when ready'
        }
      </PPButton>
      <i className={`fa fa-trash ${permissionClasses.timeSlotDelete}`} onClick={() => handleRemoveSlot(post)} />
    </div>
  );
}

ChannelSlotTimestamp.propTypes = {
  post: ImmutablePropTypes.map,
  currentPost: ImmutablePropTypes.map,
  handleClickTimestamp: PropTypes.func,
  handleRemoveSlot: PropTypes.func,
  permissionClasses: PropTypes.object,
};

export default ChannelSlotTimestamp;
