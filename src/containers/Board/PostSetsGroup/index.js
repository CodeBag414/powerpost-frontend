/*
* Boards
* Analytics Info for Social Channels.
* i.e. Facebook, LinkedIn, Twitter, Pinterest
*/

import React, { PropTypes } from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Droppable } from 'react-drag-and-drop';
import PostSet from '../PostSet';
import styles from './styles.scss';

const PostSetsGroup = ({ status, postSets, statusColor, deletePostSet, onDragStart, onDragEnter, onPostDragEnter, onDrop, dragHover, postStatusId, permissionClasses, className }) =>
  <Droppable types={['post_set']} onDrop={onDrop} onDragEnter={onDragEnter} className={`${styles.postSets} ${className}`}>
    <div className={styles.heading} onDragEnter={() => onPostDragEnter(-1)}>
      <span className={styles.status}>{status}</span>
      <div className={styles.postSetsCount} style={{ backgroundColor: statusColor }}>{postSets.size}</div>
    </div>
    {
      postSets.map((postSet, index) =>
        <div
          key={postSet.get('post_set_id')}
          className={`${styles.postSet} ${postStatusId === postSet.get('post_set_id') && dragHover ? styles.borderBottom : ''} ${postStatusId === -1 && dragHover && !index ? styles.borderTop : ''}`}
          onDragEnter={() => onPostDragEnter(postSet.get('post_set_id'))}
        >
          <PostSet postSet={postSet} onDragStart={() => onDragStart(postSet)} permissionClasses={permissionClasses} onDeletePostSet={() => deletePostSet(postSet.get('post_set_id'))} />
        </div>
      )
    }
    <div className={`${styles.overlay} ${dragHover ? styles.active : ''}`} style={{ backgroundColor: statusColor }} />
  </Droppable>;

PostSetsGroup.propTypes = {
  status: PropTypes.string.isRequired,
  postStatusId: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  postSets: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({

    })
  ).isRequired,
  statusColor: PropTypes.string.isRequired,
  deletePostSet: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  onPostDragEnter: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  dragHover: PropTypes.bool.isRequired,
  permissionClasses: PropTypes.object,
  className: PropTypes.string,
};

export default PostSetsGroup;
