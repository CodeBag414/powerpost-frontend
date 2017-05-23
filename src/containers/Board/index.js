/*
* Boards
* Analytics Info for Social Channels.
* i.e. Facebook, LinkedIn, Twitter, Pinterest
*/

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { UserCanBoard } from 'config.routes/UserRoutePermissions';

import PostEditor from 'containers/PostEditor';
import PostSetsGroup from './PostSetsGroup';
import { getPostSets, deletePostSetRequest, changePostSetStatusRequest } from '../App/actions';
import { makeSelectPostSets } from '../App/selectors';
import styles from './styles.scss';

class Board extends React.Component {

  constructor() {
    super();
    this.state = { moveStatus: 0 };
  }

  componentDidMount() {
    this.props.getPostSetsAction();
  }

  onDragEnter = (status) => {
    this.setState({ moveStatus: status });
  }

  onDrop = (id, status) => {
    this.props.changePostSetStatusRequest(id, status);
    this.setState({ moveStatus: 0 });
  }

  render() {
    const groups = [
      { status: 3, statusColor: '#ABE66A', name: 'Ready' },
      { status: 5, statusColor: '#B171B5', name: 'Review' },
      { status: 2, statusColor: '#67C5E6', name: 'Draft' },
      { status: 6, statusColor: '#ACB5B8', name: 'Idea' },
    ];
    const { postSets, deletePostSetAction, params, location: { hash } } = this.props;
    const { moveStatus } = this.state;
    const postSetsGroups = groups.map((group) => {
      const { name, status, statusColor } = group;
      const sets = postSets.filter((postSet) => parseInt(postSet.get('status'), 10) === status);
      return {
        status: name,
        postSets: sets,
        statusColor,
        status_id: status,
      };
    });
    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : 0;
    return (
      <div className={`${styles.board} ${postsetId ? styles.modalOpen : ''}`}>
        {
          postSetsGroups.map((postSetsGroup) =>
            <PostSetsGroup
              key={postSetsGroup.status}
              status={postSetsGroup.status}
              statusColor={postSetsGroup.statusColor}
              postSets={postSetsGroup.postSets}
              deletePostSet={deletePostSetAction}
              onDragEnter={() => this.onDragEnter(postSetsGroup.status)}
              onDrop={(data) => this.onDrop(data.post_set, postSetsGroup.status_id)}
              dragHover={postSetsGroup.status === moveStatus}
            />
          )
        }
        <div className={styles.postEditor}>
          { postsetId ? <PostEditor id={postsetId} accountId={params.account_id} /> : null}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  getPostSetsAction: PropTypes.func.isRequired,
  deletePostSetAction: PropTypes.func.isRequired,
  changePostSetStatusRequest: PropTypes.func.isRequired,
  postSets: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({

    })
  ).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
  }),
  params: PropTypes.shape({
    account_id: PropTypes.string,
  }),
};

export function mapDispatchToProps(dispatch) {
  return {
    getPostSetsAction: () => dispatch(getPostSets()),
    deletePostSetAction: (id) => dispatch(deletePostSetRequest(id)),
    changePostSetStatusRequest: (id, status) => dispatch(changePostSetStatusRequest(id, status)),
  };
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
});

export default UserCanBoard(connect(mapStateToProps, mapDispatchToProps)(Board));
