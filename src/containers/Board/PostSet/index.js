/*
* Boards
* Analytics Info for Social Channels.
* i.e. Facebook, LinkedIn, Twitter, Pinterest
*/

import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import enhanceWithClickOutside from 'react-click-outside';

import MenuPopover from '../MenuPopover';
import DeletePostSetDialog from '../DeletePostSetDialog';
import styles from './styles.scss';

class PostSet extends Component {

  componentWillMount() {
    this.setState({ popOver: false, deleteConfirmPopup: false });
  }

  hidePopover = () => {
    this.setState({ popOver: false });
  }

  showPopover = (e) => {
    e.stopPropagation();
    this.setState({ popOver: true });
  }

  showDeleteConfirm = (show) => {
    this.setState({ deleteConfirmPopup: show });
  }

  handleClickOutside() {
    this.setState({ popOver: false });
  }

  render() {
    const { postSet, onDeletePostSet } = this.props;
    const { popOver, deleteConfirmPopup } = this.state;
    const imgSrc = postSet.getIn(['media_items', 0, 'properties', 'source_url']); // TODO: I couldn't get any image.
    const hasImage = !!imgSrc;
    const scheduledTime = postSet.getIn(['posts', 0, 'schedule_time']);
    const formattedTime = scheduledTime && moment(scheduledTime * 1000).format('MMM DD - hh:mma');
    const title = postSet.get('title');
    const description = postSet.get('message');
    return (
      <div className={styles.postSet} onClick={this.hidePopover}>
        <div className={hasImage ? styles.image : styles.noImage} style={{ backgroundImage: `url(${imgSrc})` }}>
          { hasImage ? null : <i className="fa fa-picture-o" /> }
        </div>
        <div className={styles.contentBlock}>
          <div className={styles.contentHeading}>
            <div className={[styles.scheduleTime, scheduledTime ? null : styles.notScheduled].join(' ')}>
              {formattedTime || 'Not Scheduled'}
            </div>
            <div className={styles.ellipsis} onClick={this.showPopover} >
              <i className="fa fa-ellipsis-h" />
              <MenuPopover
                onDeletePostSet={() => this.showDeleteConfirm(true)}
                show={popOver}
              />
            </div>
          </div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.description}>
            {description}
          </div>
        </div>
        <DeletePostSetDialog
          active={deleteConfirmPopup}
          handleDialogToggle={() => this.showDeleteConfirm(false)}
          deletePostSet={onDeletePostSet}
        />
      </div>
    );
  }
}

PostSet.propTypes = {
  postSet: ImmutablePropTypes.contains({

  }).isRequired,
  onDeletePostSet: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(PostSet);
