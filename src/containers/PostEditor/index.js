/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  fetchPostSetRequest,
  updatePostSetRequest,
} from '_common/actions';
import {
  fetchGroupUsers,
} from 'containers/App/actions';

import { fetchComments } from 'containers/PostEditor/actions';

import {
  selectGroupUsers,
} from 'containers/App/selectors';

// FIXME: Should be changed to UserCanPostEdit
import { UserCanPostSet } from 'config.routes/UserRoutePermissions';

import TabLink from 'elements/atm.TabLink';

import {
  selectPostSet,
} from './selectors';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';
import UserAssignment from './UserAssignment';
import Tags from './Tags';

class PostEdtior extends Component {

  static propTypes = {
    postSet: PropTypes.object,
    groupUsers: PropTypes.object,
    params: PropTypes.shape({
      account_id: PropTypes.string,
      postset_id: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    getComments: PropTypes.func,
    fetchPostSet: PropTypes.func,
    updatePostSet: PropTypes.func,
    fetchGroupUsers: PropTypes.func,
  };

  static defaultProps = {
  };

  componentWillMount() {
    const { params: { account_id, postset_id } } = this.props;
    this.props.getComments(postset_id);
    this.props.fetchPostSet({
      id: postset_id,
    });
    const payload = { accountId: account_id };
    this.props.fetchGroupUsers(payload);
  }

  render() {
    const { postSet, groupUsers, params, children, updatePostSet } = this.props;
    return (
      <Wrapper>
        <div className="main">
          <GeneralInfo />
          <div>
            <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/content`} label="Content" />
            <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/channels`} label="Channels & Times" />
            <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/streams`} label="Shared Streams" />
          </div>
          {children}
        </div>
        <div className="side">
          <UserAssignment
            isFetching={groupUsers.isFetching || postSet.get('isFetching')}
            postSet={postSet.get('details').toJS()}
            assignee={postSet.getIn(['details', 'user_assignments', 0])}
            users={groupUsers.details ? groupUsers.details.groups_users : []}
            updatePostSet={updatePostSet}
          />
          <Tags />
        </div>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getComments: (postSetId) => dispatch(fetchComments(postSetId)),
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
    fetchGroupUsers: (payload) => dispatch(fetchGroupUsers(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  postSet: selectPostSet(),
  groupUsers: selectGroupUsers(),
});

export default UserCanPostSet(connect(mapStateToProps, mapDispatchToProps)(PostEdtior));
