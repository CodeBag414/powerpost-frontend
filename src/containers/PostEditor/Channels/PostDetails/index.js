import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import classnames from 'classnames';

import { extractHostname } from 'utils/url';
import { APP_URL } from 'containers/PostEditor/constants';

import DatePicker from 'elements/atm.DatePicker';
import TimePicker from 'elements/atm.TimePicker';
import PPButton from 'elements/atm.Button';

import FacebookBlock from 'containers/Feed/FacebookBlock';
import TwitterBlock from 'containers/Feed/TwitterBlock';
import LinkedInBlock from 'containers/Feed/LinkedInBlock';
import PinterestBlock from 'containers/Feed/PinterestBlock';

import MultiLineInput from 'components/MultiLineInput';
import Wrapper from './Wrapper';
import LimitIndicator from './LimitIndicator';

function getCreatorURL(url) {
  return url.substr(0, url.substr(0, url.length - 1).lastIndexOf('/') + 1);
}

function buildPostPreview(postData, postMessage, postTime, connection, type, mediaItem, postSetId) {
  const post = postData.merge({
    message: postMessage,
    schedule_time: postTime,
  });
  let postToPreview = {};
  let image = '';
  let link = {};
  let video = '';

  /* Set media entity */
  if (type === 'image') {
    image = mediaItem.properties.url;
  } else if (type === 'link') {
    link = mediaItem.properties;
  } else if (type === 'video') {
    video = mediaItem.properties;
    if (video.source_url && video.source_url.endsWith('avi')) {
      video.source_url = video.source_720_url;
    }
  }

  switch (connection.channel) {
    case 'facebook':
      postToPreview = {
        ...post.toJS(),
        created_time: {
          date: new Date(moment.unix(post.get('schedule_time'))),
        },
        type,
        full_picture: image || link.picture_url,
        name: link.title,
        description: link.description,
        caption: link.url,
        source: video.source_url,
      };
      return <FacebookBlock post={postToPreview} connection={connection} isPreview />;
    case 'twitter': {
      const mediaUrl = (type === 'image' && image)
        || (type === 'link' && link.picture_url)
        || (type === 'video' && video.source_url);
      const media = [{
        url: mediaUrl,
        media_url: mediaUrl,
        type, // An extra field for checking type of the media
      }];
      postToPreview = {
        ...post.toJS(),
        user: {
          ...connection.properties.profile,
        },
        created_at: new Date(moment.unix(post.get('schedule_time'))),
        entities: {
          media,
        },
        text: `${post.get('message')}${mediaUrl || ''}`,
      };
      return <TwitterBlock post={postToPreview} connection={connection} index="0" isPreview />;
    }
    case 'linkedin': {
      let content;
      if (type === 'image') {
        content = {
          shortenedUrl: APP_URL,
          submittedImageUrl: image,
          submittedUrl: APP_URL,
          title: mediaItem.properties.title,
        };
      } else if (type === 'link') {
        content = {
          shortenedUrl: extractHostname(link.link),
          submittedImageUrl: link.picture_url,
          submittedUrl: extractHostname(link.link),
          title: mediaItem.properties.title,
        };
      } else if (type === 'video') {
        content = {
          shortenedUrl: APP_URL,
          submittedImageUrl: video.thumb_url,
          submittedUrl: APP_URL,
          title: video.title,
        };
      }

      postToPreview = {
        ...post.toJS(),
        timestamp: new Date(moment.unix(post.get('schedule_time'))),
        updateContent: {
          companyStatusUpdate: {
            share: {
              comment: post.get('message'),
              content,
            },
          },
        },
      };
      return <LinkedInBlock post={postToPreview} connection={connection} isPreview />;
    }
    case 'pinterest': {
      let metadata = type === 'link' && {
        link: {
          site_name: link.link,
        },
      };
      metadata = type === 'video' && {
        link: {
          site_name: `http://${APP_URL}/posts/${postSetId}`,
        },
      };
      postToPreview = {
        ...post.toJS(),
        created_at: new Date(moment.unix(post.get('schedule_time'))),
        image: {
          original: {
            url: (type === 'image' && image) || (type === 'link' && link.picture_url) || (type === 'video' && video.thumb_url),
          },
        },
        note: post.get('message'),
        creator: {
          first_name: connection.parent_display_name,
          url: getCreatorURL(connection.url),
        },
        board: {
          name: connection.properties.board_data.name,
          url: connection.properties.board_data.url,
        },
        metadata,
      };
      return <PinterestBlock post={postToPreview} isPreview />;
    }
    default:
      return null;
  }
}

function getMediaTypeAndItem(newMediaItem, mediaItems) {
  let mediaItem = {};
  let type;

  /* Set media type & mediaItem */
  if (newMediaItem.type) {
    mediaItem = newMediaItem;
    type = newMediaItem.type;
  } else if (mediaItems && mediaItems.length) {
    mediaItem = mediaItems[0];
    type = mediaItems[0].type;
  } else {
    type = 'status';
  }

  return { type, mediaItem };
}

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
}) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  // console.log('PostDetails postSet', postSet.toJS());
  const { type, mediaItem } = getMediaTypeAndItem(newMediaItem, postSet.getIn(['details', 'media_items']).toJS());

  const characterCount = 140 - (postMessage ? postMessage.length : 0);
  return (
    <Wrapper>
      <div className="left-column">
        <div className="section-title modify-content">
          Customize Message
          <LimitIndicator className={characterCount < 0 && 'negative'}>{characterCount}</LimitIndicator>
        </div>
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
          {buildPostPreview(post, postMessage, postTime, connection, type, mediaItem, postSet.getIn(['details', 'post_set_id']))}
        </div>
        <div className={classnames('post-preview-note', connection && connection.channel)}>
          {connection && connection.channel === 'twitter' && type === 'link' &&
            'NOTE: The URL to the link will be appended to Twitter message.'}
          {connection && connection.channel === 'pinterest' && type === 'link' &&
            'NOTE: When a user clicks on the link\'s image, it will go to its URL.'}
          {connection && connection.channel === 'pinterest' && type === 'video' &&
            'NOTE: When a user clicks on the the video cover image, it will go to a page that plays the video.'}
          {connection && connection.channel === 'linkedin' && type === 'video' &&
            'NOTE: A link to the video will be appended to the LinkedIn message.'}
        </div>
      </div>
      <div className="right-column">
        <div className="section-title schedule">Schedule</div>
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
        <PPButton className="remove-slot" onClick={() => handleRemoveSlot(post)}>
          Remove Slot
        </PPButton>
      </div>
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
};

export default PostDetails;
