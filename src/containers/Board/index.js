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

import PostSetsGroup from './PostSetsGroup';
import { getPostSets, deletePostSetRequest } from './actions';
import { makeSelectPostSets } from './selectors';
import styles from './styles.scss';

class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPostSetsAction();
  }

  render() {
    const groups = [
      { status: 3, statusColor: '#ABE66A', name: 'Ready' },
      { status: 5, statusColor: '#B171B5', name: 'Review' },
      { status: 2, statusColor: '#67C5E6', name: 'Draft' },
      { status: 6, statusColor: '#ACB5B8', name: 'Idea' },
    ];
    const { postSets, deletePostSetAction } = this.props;
    const postSetsGroups = groups.map(group => {
      const { name, status, statusColor } = group;
      const sets = postSets.filter(postSet => parseInt(postSet.get('status')) === status );
      return {
        status: name,
        postSets: sets,
        statusColor,
      };
    });
    return (
      <div className={styles.board}>
        {
          postSetsGroups.map(postSetsGroup =>
            <PostSetsGroup
              key={postSetsGroup.status}
              status={postSetsGroup.status}
              statusColor={postSetsGroup.statusColor}
              postSets={postSetsGroup.postSets}
              deletePostSet={deletePostSetAction}
            />
          )
        }
      </div>
    );
  }
}

Board.propTypes = {
  getPostSetsAction: PropTypes.func.isRequired,
  deletePostSetAction: PropTypes.func.isRequired,
  postSets: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({

    })
  ).isRequired,
};

export function mapDispatchToProps(dispatch) {
 return {
   getPostSetsAction: () => dispatch(getPostSets()),
   deletePostSetAction: (id) => dispatch(deletePostSetRequest(id)),
 };
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
});

export default UserCanBoard(connect(mapStateToProps, mapDispatchToProps)(Board));