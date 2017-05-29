import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import moment from 'moment';

import PPButton from 'elements/atm.Button';

import FacebookBlock from 'containers/Feed/FacebookBlock';

import MultiLineInput from 'components/MultiLineInput';
import Wrapper from './Wrapper';

function buildPostPreview(post, connection, mediaItems) {
  // console.log('mediaItems', mediaItems);
  let postToPreview = {};
  let type = '';
  let image = '';
  let video = '';

  switch (connection.channel) {
    case 'facebook':
      if (mediaItems && mediaItems.length) {
        type = mediaItems[0].type;
        if (type === 'image') {
          image = mediaItems[0].properties.url;
        }
      } else {
        type = 'status';
      }
      postToPreview = {
        ...post.toJS(),
        created_time: {
          date: new Date(moment.unix(post.get('schedule_time'))),
        },
        type,
        full_picture: image,
      };
      return <FacebookBlock post={postToPreview} connection={connection} isPreview />;
    default:
      return null;
  }
}

function PostDetails({ post, postSet, postMessage, postTime, connection, handleRemoveSlot, handleDateChange, handleMessageChange, handleMessageBlur }) {
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
      {post.get('status') !== '5' ?
        <div className="date-pickers">
          <div className="date-picker">
            <DatePicker minDate={minDate} value={moment.unix(postTime).toDate()} onChange={handleDateChange} />
          </div>
          <div className="time-picker">
            <TimePicker format="ampm" value={moment.unix(postTime).toDate()} onChange={handleDateChange} />
          </div>
        </div>
      :
        <div className="post-upon-ready-placeholder">This post will be sent when the status is set to Ready.</div>
      }
      <div className="section-title modify-content">
        Modify Content
      </div>
      {/* <div className="channel-summary">
        <i className={connection.channel_icon} />
        <div className="summary-right">
          <span className="channel-name">{connection.display_name}</span>
          <span className="timestamp">
            {
              post.get('schedule_time')
              ? moment.unix(post.get('schedule_time')).format('MMMM D, YYYY [at] hh:mma')
              : 'Post when ready'
            }
          </span>
        </div>
      </div> */}
      <MultiLineInput
        hasBorder
        message={postMessage}
        handleMessageChange={handleMessageChange}
        onBlur={handleMessageBlur}
      />
      <div className="section-title post-preview-title">
        Preview Post
      </div>
      <div className="post-preview">
        {buildPostPreview(post, connection, postSet.getIn(['details', 'media_items']).toJS())}
      </div>
    </Wrapper>
  );
}

PostDetails.propTypes = {
  post: ImmutablePropTypes.map,
  postSet: ImmutablePropTypes.map,
  connection: PropTypes.object,
  handleDateChange: PropTypes.func,
  handleMessageChange: PropTypes.func,
  handleMessageBlur: PropTypes.func,
  handleRemoveSlot: PropTypes.func,
  postMessage: PropTypes.string,
  postTime: PropTypes.string,
};

export default PostDetails;
