/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'react-toolbox/lib/link';
import Linkify from 'react-linkify';

import { extractHostname } from 'utils/url';

import Wrapper from './Wrapper';
import Header from './Header';
import Content from './Content';
import MediaBlock from './MediaBlock';
import Image from './Image';
import LinkInfo from './LinkInfo';
import Footer from './Footer';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '$dw',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

function getFormattedTime(time) {
  return moment(time).fromNow(true);
}

class LinkedInBlock extends Component {
  static propTypes = {
    post: PropTypes.object,
    connection: PropTypes.object,
    isPreview: PropTypes.bool,
  };

  state = {
    width: 0,
  };

  buildMedia = (content) =>
    <MediaBlock width={this.state.width}>
      <Image url={content.submittedImageUrl} width={this.state.width}>
        <img
          src={content.submittedImageUrl}
          role="presentation"
          onLoad={(e) => {
            this.setState({ width: e.target.naturalWidth });
          }}
        />
      </Image>
      {(content.title || content.description) && // meaning that it is a LINK
        <LinkInfo width={this.state.width}>
          <h2 className="link-title">{content.title}</h2>
          <h3 className="link-desc">{extractHostname(content.submittedUrl)}</h3>
        </LinkInfo>
      }
    </MediaBlock>

  render() {
    const { post, connection, isPreview } = this.props;
    const connectionUrl = connection.connection_uid ? `//linkedin.com/company-beta/${connection.connection_uid}` : null;
    const comment = post.updateContent.companyStatusUpdate.share.comment;
    const shareContent = post.updateContent.companyStatusUpdate.share.content;

    const url = shareContent &&
      (shareContent.submittedUrl.startsWith('http')
        ? shareContent.submittedUrl
        : `http://${shareContent.submittedUrl}`);

    return (
      <Wrapper>
        <Header>
          <a className="ln-header-avatar" href={connectionUrl} target="_blank">
            <i className="fa fa-linkedin" />
          </a>
          <div>
            <a className="ln-header-channel-name" href={connectionUrl} target="_blank">{connection.display_name}</a>
            <span>{getFormattedTime(post.timestamp)}</span>
          </div>
        </Header>
        <Content>
          <Linkify properties={{ target: '_blank' }}>
            <div className="ln-comment">{comment}</div>
          </Linkify>
          {shareContent && shareContent.shortenedUrl &&
            (shareContent.title || shareContent.description ?
              <a href={url} target="_blank">
                {this.buildMedia(shareContent)}
              </a>
            :
              this.buildMedia(shareContent))
          }
        </Content>
        {!isPreview &&
          <Footer>
            <div className="ln-comment-details">
              <span className="ln-comment-detail">
                {post.numLikes} {post.numLikes === 1 ? 'Like' : 'Likes'}
              </span>
              <span className="ln-comment-dot" />
              <span className="ln-comment-detail">
                { post.updateComments ?
                  `${post.updateComments._total} ${post.updateComments._total == 1 ? 'Comment' : 'Comments'}`
                :
                  '0 Comments'
                }
              </span>
            </div>
            <Link
              className="post-view-button"
              href={`//www.linkedin.com/hp/update/${post.updateKey.substr(post.updateKey.lastIndexOf('-') + 1)}`}
              target="_blank"
              label="View"
              icon="open_in_new"
            />
          </Footer>
        }
      </Wrapper>
    );
  }
}

export default LinkedInBlock;
