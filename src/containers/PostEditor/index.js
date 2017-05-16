/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanPostEdit } from 'config.routes/UserRoutePermissions';

import {
  fetchPostSetRequest,
} from '_common/actions';

import {
  fetchGroupUsers,
} from 'containers/App/actions';

import {
  makeSelectUser,
} from 'containers/App/selectors';

import {
  fetchComments,
} from 'containers/PostEditor/actions';

import {
  selectPostSet,
} from 'containers/PostEditor/selectors';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';
import TabLink from './TabLink';

class PostEditor extends Component {

  static propTypes = {
    params: PropTypes.shape({
      account_id: PropTypes.string,
      postset_id: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    getComments: PropTypes.func,
    fetchPostSet: PropTypes.func,
    fetchGroupUsers: PropTypes.func,
    user: PropTypes.shape(),
    postSet: PropTypes.object,
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
    const { params, children, user, postSet } = this.props;
    return (
      <Wrapper>
        <GeneralInfo user={user} postSet={postSet} />
        <div>
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/content`} label="Content" />
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/channels`} label="Channels & Times" count={0} />
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/streams`} label="Shared Streams" />
        </div>
        {children}
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getComments: (postSetId) => dispatch(fetchComments(postSetId)),
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
    fetchGroupUsers: (payload) => dispatch(fetchGroupUsers(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  postSet: selectPostSet(),
});

export default UserCanPostEdit(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
