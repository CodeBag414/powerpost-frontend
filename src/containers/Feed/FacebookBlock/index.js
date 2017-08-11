/* eslint-disable react/no-danger */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from 'react-toolbox/lib/link';
import linkifyHtml from 'linkifyjs/html';

import SocialIcon from 'elements/atm.SocialIcon';

import Wrapper from './Wrapper';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

/* For Facebook Mentions in Preview blocks only */
function getFormattedMessage(message) {
  if(message) {
    const regex = /@\[([^\]]*)]\((\d*)\)/g;
    const html = linkifyHtml(message)
      .replace(regex, (match, p1, p2) =>
        `<a href="https://www.facebook.com/${p2}" target="_blank">${p1}</a>`
      );
    return { __html: html };
  } else {
    return { __html: '<span></span>' }
  }
}

function getFormattedTime(time) {
  return moment(time).format('D MMMM YYYY');
}

class FacebookBlock extends Component {
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
    const connectionUrl = connection.connection_uid ? `//www.facebook.com/${connection.connection_uid}` : null;
    return (
      <Wrapper>
        <Header>
          <a className="fb-header-avatar" href={connectionUrl} target="_blank">
            {post.avatar ?
              <img src={post.avatar} alt="Avatar" />
            :
              <SocialIcon icon={connection.channel_icon} />
            }
          </a>
          <div>
            <a className="fb-header-channel-name" href={connectionUrl} target="_blank">{connection.display_name}</a>
            <span>{getFormattedTime(post.created_time.date)}</span>
          </div>
        </Header>
        <Content>
          <span
            className={`fb-message ${post.type === 'status' && 'large'}`}
            dangerouslySetInnerHTML={getFormattedMessage(post.message)}
          />

          { (post.type === 'photo' || post.type === 'image') &&
            <img className="fb-image" src={post.full_picture} alt="feed" />
          }

          { post.type === 'video' &&
            <video poster={post.full_picture} preload="metadata" onMouseEnter={this.onMouseEnterVideo} onMouseLeave={this.onMouseLeaveVideo}>
              <source src={post.source} type="video/mp4" />
            </video>
          }

          { (post.type === 'link' || post.type === 'document' || post.type === 'file' || post.type === 'blog') &&
            <div className="fb-link">
              <img src={post.full_picture} alt="link" />
              <div className="fb-link-content">
                <div className="fb-link-title">{post.name}</div>
                <div className="fb-link-description">{post.description}</div>
                <div className="fb-link-caption">{post.caption}</div>
              </div>
            </div>
          }
        </Content>
        { !isPreview &&
          <Footer>
            <span className="fb-likes">{post.number_likes} {post.number_likes === 1 ? 'Like' : 'Likes'}</span>
            <span>{post.number_comments} {post.number_comments === 1 ? 'Comment' : 'Comments'}</span>
            <Link className="post-view-button" href={`//www.facebook.com/${post.id}`} target="_blank" label="View" icon="open_in_new" />
          </Footer>
        }
      </Wrapper>
    );
  }
}

FacebookBlock.propTypes = {
  post: PropTypes.object,
  connection: PropTypes.object,
  isPreview: PropTypes.bool,
};

export default FacebookBlock;
