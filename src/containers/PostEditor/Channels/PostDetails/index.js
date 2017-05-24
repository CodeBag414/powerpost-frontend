import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import moment from 'moment';

import PPButton from 'elements/atm.Button';

import MultiLineInput from 'components/MultiLineInput';
import Wrapper from './Wrapper';

function PostDetails({ post, connection, handleRemoveSlot, handleChangeDate, handleMessageChange, handleMessageBlur }) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  return (
    <Wrapper>
      <div className="section-title">
        Schedule
        <PPButton className="remove-slot" onClick={() => handleRemoveSlot(post)}>
          Remove Slot
        </PPButton>
      </div>
      <div className="date-pickers">
        <div className="date-picker">
          <DatePicker minDate={minDate} value={moment.unix(post.get('schedule_time')).toDate()} onChange={handleChangeDate} />
        </div>
        <div className="time-picker">
          <TimePicker format="ampm" value={moment.unix(post.get('schedule_time')).toDate()} onChange={handleChangeDate} />
        </div>
      </div>
      <div className="section-title modify-content">
        Modify Content
      </div>
      <div className="channel-summary">
        <i className={connection.channel_icon} />
        <div className="summary-right">
          <span className="channel-name">{connection.display_name}</span>
          <span className="timestamp">{moment.unix(post.get('schedule_time')).format('MMMM D, YYYY [at] hh:mma')}</span>
        </div>
      </div>
      <MultiLineInput
        noPadding
        message={post.get('message')}
        handleMessageChange={handleMessageChange}
        onBlur={handleMessageBlur}
      />
    </Wrapper>
  );
}

PostDetails.propTypes = {
  post: ImmutablePropTypes.map,
  connection: PropTypes.object,
  handleChangeDate: PropTypes.func,
  handleMessageChange: PropTypes.func,
  handleMessageBlur: PropTypes.func,
  handleRemoveSlot: PropTypes.func,
};

export default PostDetails;