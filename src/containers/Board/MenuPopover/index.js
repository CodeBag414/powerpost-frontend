/*
* Boards
* Analytics Info for Social Channels.
* i.e. Facebook, LinkedIn, Twitter, Pinterest
*/

import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import styles from './styles.scss';

const MenuPopover = ({ onDeletePostSet, show }) => {
  return (
    <div className={[styles.menuPopover, show ? styles.active : ''].join(' ')} onClick={onDeletePostSet}>
      <i className="fa fa-trash-o" />
      Delete Post
    </div>
  );
}

MenuPopover.propTypes = {
  onDeletePostSet: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default MenuPopover;
