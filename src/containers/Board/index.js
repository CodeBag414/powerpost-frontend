/**
 * Boards
 * Analytics Info for Social Channels. (i.e. Facebook, LinkedIn, Twitter, Pinterest)
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { UserCanBoard } from 'config.routes/UserRoutePermissions';
import { getClassesByPage } from 'utils/permissionClass';

import {
  fetchPostSetsBySORequest,
  changePostSetStatusRequest,
  changePostSetSortOrderRequest,
  savePostSetSortOrderRequest,
  deletePostSetRequest,
} from 'containers/App/actions';
import {
  makeSelectPostSets,
} from 'containers/App/selectors';

import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import Loading from 'components/Loading';

import PostSetsGroup from './PostSetsGroup';
import styles from './styles.scss';

class Board extends React.Component {
  constructor() {
    super();
    this.state = { moveStatus: 0, searchText: '', dragPostSet: null, postStatusId: null };
  }

  componentDidMount() {
    this.props.fetchPostSetsBySO();
  }

  componentWillReceiveProps(nextProps) {
    const nextPostSetId = nextProps.location.hash.startsWith('#postset') ? nextProps.location.hash.split('-')[1] : 0;
    const postsetId = this.props.location.hash.startsWith('#postset') ? this.props.location.hash.split('-')[1] : 0;
    if (postsetId && !nextPostSetId) {
      this.props.fetchPostSetsBySO();
    }
  }

  onDragStart = (dragPostSet) => {
    this.setState({ dragPostSet });
  }

  onDragEnter = (moveStatus) => {
    if (this.state.moveStatus === moveStatus) return;
    this.setState({ moveStatus });
  }

  onPostDragEnter = (postStatusId) => {
    if (this.state.postStatusId === postStatusId) return;

    const { dragPostSet, moveStatus } = this.state;

    if (parseInt(dragPostSet.get('status'), 10) === parseInt(moveStatus, 10)) {
      this.setState({ postStatusId });
    } else {
      this.setState({ postStatusId: -1 });
    }
  }

  onDrop = (status) => {
    const { dragPostSet, postStatusId } = this.state;
    const { changePostSetSortOrder, savePostSetSortOrder } = this.props;
    const id = dragPostSet.get('post_set_id');

    if (postStatusId === -1) {
      const postSets = this.props.postSets.getIn(['data', 'post_sets'], fromJS([]));
      const sortOrderArray = postSets.map((postSet) => parseFloat(postSet.get('sort_order'), 10)).toJS();
      const newSortOrder = Math.max.apply(null, sortOrderArray) + 1;
      savePostSetSortOrder(id, newSortOrder);
    }
    if (dragPostSet && (parseInt(dragPostSet.get('status'), 10) !== parseInt(status, 10))) {
      this.props.changePostSetStatus(id, status);
    } else if (id !== postStatusId) {
      if (postStatusId !== -1) {
        changePostSetSortOrder(id, postStatusId);
      }
    }
    this.setState({ moveStatus: 0, postStatusIndex: null, dragPostSet: null });
  }

  onSearch = (searchText) => {
    this.setState({ searchText });
  }

  filterPostSets = (postSets) => {
    const { searchText } = this.state;
    if (!searchText) return postSets;
    const queryLowerCase = searchText.toLowerCase();
    return postSets.map((postSet) => {
      const titleMatch = (postSet.get('title') && postSet.get('title').toLowerCase().indexOf(queryLowerCase) !== -1);
      let tagsMatch = false;
      if (postSet.get('tags')) {
        const tags = postSet.get('tags').toJS();
        Object.keys(tags).some((key) => {
          const tagString = tags[key];
          if (tagString.indexOf(queryLowerCase) !== -1) {
            tagsMatch = true;
            return true;
          }
          return false;
        });
      }
      if ((titleMatch || tagsMatch)) {
        return postSet;
      }
      return null;
    }).filter((postSet) => postSet);
  }

  render() {
    const groups = [
      { status: 3, statusColor: '#ABE66A', name: 'Ready' },
      { status: 5, statusColor: '#B171B5', name: 'Review' },
      { status: 2, statusColor: '#67C5E6', name: 'Draft' },
      { status: 6, statusColor: '#ACB5B8', name: 'Idea' },
    ];
    const { deletePostSetAction, activeBrand } = this.props;
    const { moveStatus, searchText, postStatusId } = this.state;
    const { permissions } = activeBrand.user_access;
    const permissionClasses = getClassesByPage(permissions, 'statusBoards');
    const postSets = this.props.postSets.getIn(['data', 'post_sets'], fromJS([]));
    const filterPostSets = this.filterPostSets(postSets);
    const postSetsGroups = groups.map((group) => {
      const { name, status, statusColor } = group;
      const sets = filterPostSets.filter((postSet) => parseInt(postSet.get('status'), 10) === status);
      return {
        status: name,
        postSets: sets,
        statusColor,
        status_id: status,
        className: permissionClasses[name],
      };
    });
    const loading = this.props.postSets.get('requesting');

    return (
      <div className={styles.board}>
        <div className={styles['board-header']}>
          <div className={styles['search-input']}>
            <input placeholder="Search Title and Tags" value={searchText} onChange={(e) => this.onSearch(e.target.value)} />
            <i className="fa fa-search" />
          </div>
        </div>
        <div className={styles['board-container']}>
          {
            postSetsGroups.map((postSetsGroup) =>
              <PostSetsGroup
                key={postSetsGroup.status}
                status={postSetsGroup.status}
                postStatusId={postStatusId}
                statusColor={postSetsGroup.statusColor}
                postSets={postSetsGroup.postSets}
                deletePostSet={deletePostSetAction}
                onDragEnter={() => this.onDragEnter(postSetsGroup.status_id)}
                onPostDragEnter={this.onPostDragEnter}
                onDragStart={this.onDragStart}
                onDrop={() => this.onDrop(postSetsGroup.status_id)}
                permissionClasses={permissionClasses}
                dragHover={postSetsGroup.status_id === moveStatus}
                className={postSetsGroup.className}
              />
            )
          }
        </div>
        {loading ? <Loading opacity={0.5} showIndicator={!this.props.postSets.get('data')} /> : null}
      </div>
    );
  }
}

Board.propTypes = {
  fetchPostSetsBySO: PropTypes.func.isRequired,
  changePostSetStatus: PropTypes.func.isRequired,
  changePostSetSortOrder: PropTypes.func.isRequired,
  savePostSetSortOrder: PropTypes.func.isRequired,
  deletePostSetAction: PropTypes.func.isRequired,
  postSets: ImmutablePropTypes.map.isRequired,
  activeBrand: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  activeBrand: makeSelectCurrentAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPostSetsBySO: () => dispatch(fetchPostSetsBySORequest()),
    changePostSetSortOrder: (id, afterId) => dispatch(changePostSetSortOrderRequest(id, afterId)),
    changePostSetStatus: (id, status) => dispatch(changePostSetStatusRequest(id, status)),
    savePostSetSortOrder: (id, sortOrder) => dispatch(savePostSetSortOrderRequest(id, sortOrder)),
    deletePostSetAction: (id) => dispatch(deletePostSetRequest(id)),
  };
}

export default UserCanBoard(connect(mapStateToProps, mapDispatchToProps)(Board));
