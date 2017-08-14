import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import { getMediaTypeAndItem } from 'utils/media';

import DatePicker from 'elements/atm.DatePicker';
import TimePicker from 'elements/atm.TimePicker';

import MultiLineInput from 'components/MultiLineInput';
import MultiLineInputMentions from 'components/MultiLineInputMentions';

import PostPreview from 'containers/PostEditor/PostPreview';

import Wrapper from './Wrapper';
import LimitIndicator from './LimitIndicator';

function PostDetails({
  connection,
  handleDateChange,
  handleMessageBlur,
  handleMessageChange,
  handleRemoveSlot,
  newMediaItem,
  post,
  postSet,
  postMessage,
  postTime,
  permissionClasses,
  availableFBChannel,
}) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  const { type, mediaItem } = getMediaTypeAndItem(newMediaItem, postSet);
  const postSetId = postSet.getIn(['details', 'post_set_id']);

  const characterCount = 140 - (postMessage ? postMessage.length : 0);
  const status = post.get('status');
  const isPast = status === '2' || status === '3';
  const disableClass = isPast ? 'disabled' : '';

  if (!connection) return null;

  return (
    <Wrapper>
      <div className={`section-title modify-content ${permissionClasses.timeSlotMessage}`}>
        Customize Message
        {connection.channel === 'twitter' &&
          <LimitIndicator className={characterCount < 0 && 'negative'}>{characterCount}</LimitIndicator>
        }
      </div>
      {connection.channel === 'facebook' ?
        <MultiLineInputMentions
          hasBorder
          availableFBChannel={availableFBChannel}
          className={`${permissionClasses.timeSlotMessage} ${disableClass}`}
          handleMessageChange={handleMessageChange}
          handleMessageBlur={handleMessageBlur}
          message={postMessage}
        />
        :
          <MultiLineInput
            hasBorder
            className={`${permissionClasses.timeSlotMessage} ${disableClass}`}
            handleMessageChange={handleMessageChange}
            message={postMessage}
            onBlur={handleMessageBlur}
          />
      }
      <div className={`section-title schedule ${permissionClasses.modifyDateTime}`}>Modify Date & Time</div>
      <div className={`schedule-content ${permissionClasses.timeSlotSchedule}`}>
        {
          (!isPast && (
            status !== '5' ?
              <div className="date-pickers">
                <div className={`date-picker ${disableClass}`}>
                  <DatePicker minDate={minDate} value={moment.unix(postTime).toDate()} onChange={handleDateChange} />
                </div>
                <div className={`time-picker ${disableClass}`}>
                  <TimePicker format="ampm" value={moment.unix(postTime).toDate()} onChange={handleDateChange} />
                </div>
              </div>
            :
              <div className="post-upon-ready-placeholder">This post will be sent when the status is set to Ready.</div>
          )) || (
            status === '2' ?
              <div className="post-upon-ready-placeholder">This post was successfully published on this channel at SCHEDULE_TIME</div>
            :
              <div className="post-upon-ready-placeholder">There was a problem with publishing to this channel.</div>
          )
        }
        {!isPast &&
          <i className="fa fa-trash" onClick={() => handleRemoveSlot(post.toJS())} />
        }
      </div>
      <PostPreview
        mediaItem={mediaItem}
        post={post}
        postMessage={postMessage}
        postSetId={postSetId}
        postTime={postTime}
        connection={connection}
        postSet={postSet}
        title="Preview"
        type={type}
      />
    </Wrapper>
  );
}

PostDetails.propTypes = {
  connection: PropTypes.object,
  handleDateChange: PropTypes.func,
  handleMessageBlur: PropTypes.func,
  handleMessageChange: PropTypes.func,
  handleRemoveSlot: PropTypes.func,
  newMediaItem: PropTypes.object,
  post: ImmutablePropTypes.map,
  postMessage: PropTypes.string,
  postSet: ImmutablePropTypes.map,
  postTime: PropTypes.string,
  permissionClasses: PropTypes.object,
  availableFBChannel: PropTypes.string,
};

export default PostDetails;
