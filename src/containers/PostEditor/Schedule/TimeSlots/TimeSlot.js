import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import classnames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import { isEqual } from 'lodash';

import DeletePostSetDialog from 'components/DeletePostSetDialog';
import SocialIcon from 'elements/atm.SocialIcon';

import MenuPopover from '../MenuPopover';

function getConnectionType(connection) {
  return connection && connection.type.split('_')[1];
}

class TimeSlot extends Component {
  static propTypes = {
    connection: PropTypes.object,
    currentPost: ImmutablePropTypes.map,
    handleClickTimestamp: PropTypes.func,
    handleRemoveSlot: PropTypes.func,
    permissionClasses: PropTypes.object,
    post: ImmutablePropTypes.map,
  }

  state = {
    popoverVisible: false,
    deleteDialogVisible: false,
  }

  handleClickOutside() {
    this.setState({ popoverVisible: false });
  }

  showPopover = (e) => {
    e.stopPropagation();
    this.setState({ popoverVisible: true });
  }

  toggleDeleteDialog = (visible) => {
    this.setState({ deleteDialogVisible: visible });
  }

  render() {
    const { connection, post, currentPost, handleClickTimestamp, handleRemoveSlot, permissionClasses } = this.props;
    if (!connection) return null;
    return (
      <div
        className={classnames('slot-timestamp', { active: isEqual(currentPost, post) })}
        onClick={() => handleClickTimestamp(post)}
      >
        {/* TODO: More button here */}
        <div className="connection-info">
          <div className="channel-icon-row">
            <SocialIcon icon={connection.channel_icon} />
            <span className="connection-type">{getConnectionType(connection)}</span>
          </div>
          <div className="connection-name">{connection.display_name}</div>
        </div>
        <div className="date-time">
          {post.status !== '5' && parseInt(post.schedule_time, 10) ?
            <div>
              <div className="date-row">{moment.unix(post.schedule_time).format('MMM D')}</div>
              <div className="time-row">{moment.unix(post.schedule_time).format('ddd, hh:mm')}</div>
            </div>
          :
            'Post when ready'
          }
        </div>
        <div className="message">
          <span className="message-content">{post.message}</span>
        </div>
        <div className={`deletePopover ${permissionClasses.deleteEllipsesMenu}`} onClick={this.showPopover} >
          <i className="fa fa-ellipsis-v" />
          <MenuPopover
            onDeletePostSet={() => this.toggleDeleteDialog(true)}
            show={this.state.popoverVisible}
          />
        </div>
        <DeletePostSetDialog
          active={this.state.deleteDialogVisible}
          handleDialogToggle={() => this.toggleDeleteDialog(false)}
          deletePostSet={() => handleRemoveSlot(post)}
          message="Are you sure? You will not be able to recover this post."
          title="Delete Slot"
        />
      </div>
    );
    // <i className={`fa fa-trash ${permissionClasses.timeSlotDelete}`} onClick={} />
  }
}

export default enhanceWithClickOutside(TimeSlot);
