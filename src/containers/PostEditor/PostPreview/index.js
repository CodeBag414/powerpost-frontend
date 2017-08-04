import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import classnames from 'classnames';

import { extractHostname } from 'utils/url';
import { APP_URL } from 'containers/PostEditor/constants';

import FacebookBlock from 'containers/Feed/FacebookBlock';
import TwitterBlock from 'containers/Feed/TwitterBlock';
import LinkedInBlock from 'containers/Feed/LinkedInBlock';
import PinterestBlock from 'containers/Feed/PinterestBlock';
import GooglePlusBlock from 'containers/Feed/GooglePlusBlock';

import Wrapper from './Wrapper';

function getCreatorURL(url) {
  if (url) {
    return url.substr(0, url.substr(0, url.length - 1).lastIndexOf('/') + 1);
  }
  return null;
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
  let file = {};
  let blog = {};

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
  } else if (type === 'document' || type === 'file') {
    file = mediaItem.properties;
  } else if (type === 'blog') {
    blog = mediaItem.properties;
  }

  switch (connection.channel) {
    case 'facebook':
      postToPreview = {
        ...post.toJS(),
        created_time: {
          date: new Date(moment.unix(post.get('schedule_time'))),
        },
        type,
        full_picture: image || link.picture_url || file.picture || blog.thumb_url,
        name: link.title || file.title || blog.title,
        description: link.description || file.description || blog.caption,
        caption: link.url || ((type === 'document' || type === 'file') && APP_URL) || (type === 'blog' && APP_URL),
        source: video.source_url,
      };
      return <FacebookBlock post={postToPreview} connection={connection} isPreview />;
    case 'twitter': {
      const mediaUrl = (type === 'image' && image)
        || (type === 'link' && link.picture_url)
        || (type === 'video' && video.source_url)
        || ((type === 'document' || type === 'file') && file.picture)
        || (type === 'blog' && blog.thumb_url);
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
          shortenedUrl: `${APP_URL}/posts/${postSetId}`,
          submittedImageUrl: video.thumb_url,
          submittedUrl: `${APP_URL}/posts/${postSetId}`,
          title: video.title,
        };
      } else if (type === 'document' || type === 'file') {
        content = {
          shortenedUrl: `${APP_URL}/posts/${postSetId}`,
          submittedImageUrl: file.picture,
          submittedUrl: `${APP_URL}/posts/${postSetId}`,
          title: file.title,
        };
      } else if (type === 'blog') {
        content = {
          shortenedUrl: `${APP_URL}/posts/${postSetId}`,
          submittedImageUrl: blog.thumb_url,
          submittedUrl: `${APP_URL}/posts/${postSetId}`,
          title: blog.title,
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
      metadata = (type === 'video' || type === 'document' || type === 'file' || type === 'blog') && {
        link: {
          site_name: `http://${APP_URL}/posts/${postSetId}`,
        },
      };
      postToPreview = {
        ...post.toJS(),
        created_at: new Date(moment.unix(post.get('schedule_time'))),
        image: {
          original: {
            url: (type === 'image' && image) ||
              (type === 'link' && link.picture_url) ||
              (type === 'video' && video.thumb_url) ||
              ((type === 'document' || type === 'file') && file.picture) ||
              (type === 'blog' && blog.thumb_url),
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
    case 'google': {
      const attachment = {
        objectType: type,
        media_source: (type === 'image' && image) ||
          (type === 'link' && link.picture_url) ||
          (type === 'video' && video.source_url) ||
          ((type === 'document' || type === 'file') && file.picture) ||
          (type === 'blog' && blog.thumb_url),
        displayName: (type === 'link' && link.title) ||
          ((type === 'document' || type === 'file') && file.title) ||
          (type === 'blog' && blog.title),
        url: (type === 'link' && link.link) ||
          (type === 'video' && video.thumb_url) ||
          ((type === 'document' || type === 'file' || type === 'blog') && `http://${APP_URL}/posts/${postSetId}`),
      };
      postToPreview = {
        ...post.toJS(),
        actor: {
          displayName: connection.display_name,
          image: null, // FIXME: not supported by API
        },
        attachments: [attachment],
        content: post.get('message'),
        updated: new Date(),
      };
      return <GooglePlusBlock post={postToPreview} connection={connection} isPreview />
    }
    default:
      return null;
  }
}

function PostPreview({ post, postMessage, postTime, connection, type, mediaItem, postSetId, marginBottom }) {
  return (
    <Wrapper marginBottom={marginBottom}>
      <div className="section-title post-preview-title">
        Preview Post
      </div>
      <div className="post-preview">
        {connection && buildPostPreview(post, postMessage, postTime, connection, type, mediaItem, postSetId)}
      </div>
      <div className={classnames('post-preview-note', connection && connection.channel)}>
        {connection && connection.channel === 'twitter' && type === 'link' &&
          'NOTE: The URL to the link will be appended to Twitter message.'}
        {connection && connection.channel === 'twitter' && (type === 'document' || type === 'file') &&
          <div>
            NOTE: The URL to the file will be appended to Twitter message. It will go to
            <a href={`http://${APP_URL}/posts/${postSetId}`} target="_blank"> {APP_URL}/posts/{postSetId}</a>.
          </div>
        }
        {connection && connection.channel === 'twitter' && type === 'blog' &&
          <div>
            NOTE: The URL to the blog will be appended to Twitter message. It will go to
            <a href={`http://${APP_URL}/posts/${postSetId}`} target="_blank"> {APP_URL}/posts/{postSetId}</a>.
          </div>
        }
        {connection && connection.channel === 'pinterest' && type === 'link' &&
          'NOTE: When a user clicks on the link\'s image, it will go to its URL.'}
        {connection && connection.channel === 'pinterest' && type === 'video' &&
          'NOTE: When a user clicks on the the video cover image, it will go to a page that plays the video.'}
        {connection && connection.channel === 'pinterest' && (type === 'document' || type === 'file') &&
          <div>
            NOTE: When a user clicks on the file&#39;s image, it will go to
            <a href={`http://${APP_URL}/posts/${postSetId}`} target="_blank"> {APP_URL}/posts/{postSetId}</a>.
          </div>
        }
        {connection && connection.channel === 'pinterest' && type === 'blog' &&
          <div>
            NOTE: When a user clicks on the blog&#39;s image, it will go to
            <a href={`http://${APP_URL}/posts/${postSetId}`} target="_blank"> {APP_URL}/posts/{postSetId}</a>.
          </div>
        }
        {connection && connection.channel === 'linkedin' && type === 'video' &&
          'NOTE: A link to the video will be appended to the LinkedIn message.'}
      </div>
    </Wrapper>
  );
}

PostPreview.propTypes = {
  connection: PropTypes.object,
  marginBottom: PropTypes.bool,
  mediaItem: PropTypes.object,
  post: ImmutablePropTypes.map,
  postMessage: PropTypes.string,
  postSetId: ImmutablePropTypes.map,
  postTime: PropTypes.string,
  type: PropTypes.string,
};

export default PostPreview;
