/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { extractHostname } from 'utils/url';

import SocialIcon from 'elements/atm.SocialIcon';

import Wrapper from './Wrapper';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function getFormattedTime(time) {
  return moment(time).fromNow();
}

class GooglePlusBlock extends Component {

  onMouseEnterVideo(e) {
    const target = e.target;
    target.controls = true;
  }

  onMouseLeaveVideo(e) {
    const target = e.target;
    target.controls = false;
  }

  render() {
    const { post, connection, isPreview } = this.props;
    const connectionUrl = connection.connection_uid ? `//plus.google.com/${connection.connection_uid}` : null;
    const attachment = post.attachments[0] || {};
    const type = attachment.objectType;
    let domain;
    if ((type === 'article' || type === 'link') || (type === 'document' || type === 'file') || type === 'blog') {
      const arr1 = attachment.url.split('www.');
      if (arr1[1]) {
        const arr2 = arr1[1].split('/');
        domain = arr2[0];
      } else {
        domain = extractHostname(attachment.url);
      }
    }

    return (
      <Wrapper>
        <Header>
          <div className="left-box">
            <a className="gp-header-avatar" href={connectionUrl} target="_blank">
              {post.actor.image ?
                <img src={post.actor.image} alt="Avatar" />
              :
                <SocialIcon icon={connection.channel_icon} />
              }
            </a>
            <a href={connectionUrl} target="_blank"><strong>{ post.actor.displayName }</strong></a>
            <div className="right-arrow">
              <svg viewBox="0 0 48 48" height="100%" width="100%">
                <path d="M20 14l10 10-10 10z"></path>
              </svg>
            </div>
            <span className="public">
              Public
            </span>
          </div>
          <span className="time-stamp">{getFormattedTime(post.updated)}</span>
        </Header>
        <Content>
          <div className="gp-message">{post.content}</div>

          { (type === 'photo' || type === 'image') &&
            <img src={attachment.media_source} alt="feed" />
          }

          { type === 'video' &&
            <video poster={attachment.url} preload="metadata" onMouseEnter={this.onMouseEnterVideo} onMouseLeave={this.onMouseLeaveVideo}>
              <source src={attachment.media_source} />
            </video>
          }

          { ((type === 'article' || type === 'link') || (type === 'document' || type === 'file') || type === 'blog') &&
            <div className="gp-link">
              <div className="divider" />
              <a href={attachment.url} target="_blank">
                <div className="display-name">{attachment.displayName}</div>
                <img src={attachment.media_source} alt="link" />
                <span className="domain">{domain}</span>
              </a>
            </div>
          }
        </Content>
        { !isPreview &&
          <Footer>
            <div className="left-box">
              <div className="gp-likes">
                +{post.plusoners}
              </div>
            </div>
          </Footer>
        }
      </Wrapper>
    );
  }
}

GooglePlusBlock.propTypes = {
  post: PropTypes.object,
  connection: PropTypes.object,
  isPreview: PropTypes.bool,
};

export default GooglePlusBlock;
