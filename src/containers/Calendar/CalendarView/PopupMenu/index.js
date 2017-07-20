import React, { Component, PropTypes } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';

import { buildChannelList } from 'containers/PostEditor/Sidebar/ChannelsPreview';

import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';

function getStatusText(postSet) {
  switch (postSet.status) {
    case '3':
      return 'Ready';
    case '5':
      return 'In Review';
    case '2':
      return 'Draft';
    case '6':
      return 'Idea';
    default:
      return 'Unknown status';
  }
}

class PopupMenu extends Component {

  static propTypes = {
    postSet: PropTypes.object,
    currentAccount: PropTypes.object,
    popupPosition: PropTypes.object,
    onDelete: PropTypes.func,
    permissionClasses: PropTypes.object,
    connections: PropTypes.array,
  };

  handleClickOutside = (e) => {
    this.props.onOutsideClick(e);
  }

  handleClickDelete = () => {
    const { postSet, onDelete, onOutsideClick } = this.props;

    onDelete(postSet);
    onOutsideClick();
  }

  handleClickEdit = () => {
    const { postSet, currentAccount } = this.props;
    browserHistory.push({
      pathname: `/account/${currentAccount.account_id}/calendar`,
      hash: `#postset-${postSet.post_set_id}`,
      state: { prevUrl: window.location.href },
    });
  }

  buildTags = (postSet) => {
    const keys = Object.keys(postSet.tags);
    return keys.map((key) => {
      const tag = postSet.tags[key];
      return (
        <span className="event-popup-tag" key={key}>
          <i className="fa fa-tag" aria-hidden="true" />
          {tag}
        </span>
      );
    });
  }

  render() {
    const { postSet, popupPosition, permissionClasses, connections } = this.props;
    const postCount = postSet.posts.length;
    return (
      <Wrapper position={popupPosition}>
        <div className="event-popup-close"><i className="fa fa-times" aria-hidden="true" onClick={this.handleClickOutside} /></div>
        {
          postSet.media_items.length
            ? <img className="event-popup-image" src={postSet.media_items[0].properties.thumb_url || postSet.media_items[0].properties.picture} alt="Post" />
            : null
        }
        <div className="event-popup-status">
          {getStatusText(postSet)}
        </div>
        <div className="event-popup-title">{postSet.title ? postSet.title : 'Untitled post'}</div>
        <div className="event-popup-time">{moment.unix(postSet.schedule_time).format('ddd, MMMM Do - h:mma')}</div>
        <div className="event-popup-message">{postSet.message}</div>
        <div className="event-popup-channel-count">{postCount} {postCount === 1 ? 'post' : 'posts'} scheduled for this time on these channels:</div>
        <div className="event-popup-channels">
          {buildChannelList(connections, fromJS(postSet.posts))}
        </div>
        <div className="event-popup-bottom">
          {postSet.tags && this.buildTags(postSet)}
          <div className="event-popup-buttons">
            <Button onClick={this.handleClickDelete} className={`event-popup-flat ${permissionClasses.deleteButton}`} flat>Delete Post</Button>
            <Button onClick={this.handleClickEdit} className="event-popup-primary" primary>{permissionClasses.editButton === 'hidden' ? 'View' : 'Edit'}</Button>
          </div>
        </div>
      </Wrapper>
    );
  }
}

PopupMenu.propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(PopupMenu);
