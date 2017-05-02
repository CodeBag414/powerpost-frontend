import React, { Component, PropTypes } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import moment from 'moment';

import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';

class PopupMenu extends Component {

  handleClickOutside = (e) => {
    this.props.onOutsideClick(e);
  }

  handleClickDelete = () => {

  }

  handleClickEdit = () => {

  }

  getStatusText({ post }) {
    switch (post.status) {
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

  render() {
    const { post, popupPosition } = this.props;
    console.log('post', post);
    if (!post) return null;
    return (
      <Wrapper position={popupPosition}>
        <div className="event-popup-close"><i className="fa fa-times" aria-hidden="true" onClick={this.handleClickOutside} /></div>
        {
          post.post_set.post_type === 'image' &&
            <img className="event-popup-image" src={post.post_set.media_items[0].properties.source_url} />
        }
        <div className="event-popup-status">
          {this.getStatusText(post)}
        </div>
        <div className="event-popup-title">{post.post_set.title ? post.post_set.title : 'Untitled post'}</div>
        <div className="event-popup-time">{moment.unix(post.post.schedule_time).format('ddd, MMMM Do - h:mma')}</div>
        <div className="event-popup-message">{post.post.message}</div>
        <div className="event-popup-buttons">
          <Button onClick={this.handleClickDelete} className="event-popup-flat" flat>Delete Post</Button>
          <Button onClick={this.handleClickEdit} className="event-popup-primary" primary>Edit</Button>
        </div>
      </Wrapper>
    );
  }
}

PopupMenu.propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(PopupMenu);
