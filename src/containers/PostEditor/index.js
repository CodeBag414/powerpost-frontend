/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanPostEdit } from 'config.routes/UserRoutePermissions';

import {
  fetchGroupUsers,
  fetchPostSetRequest,
  updatePostSetRequest,
} from 'containers/App/actions';

import {
  makeSelectUser,
  selectGroupUsers,
} from 'containers/App/selectors';

import {
  fetchComments,
  fetchAccountTags,
} from 'containers/PostEditor/actions';

import {
  selectPostSet,
} from 'containers/PostEditor/selectors';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';
import TabLink from './TabLink';
import Sidebar from './Sidebar';
import UserAssignment from './Sidebar/UserAssignment';
import Tags from './Sidebar/Tags';

class PostEditor extends Component {

  static propTypes = {
    params: PropTypes.shape({
      account_id: PropTypes.string,
      postset_id: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    getComments: PropTypes.func,
    getAccountTags: PropTypes.func,
    fetchPostSet: PropTypes.func,
    fetchGroupUsers: PropTypes.func,
    user: PropTypes.shape(),
    postSet: PropTypes.object,
    groupUsers: PropTypes.object,
    updatePostSet: PropTypes.func,
  };

  state = {
    postTitle: '',
  };

  componentWillMount() {
    const { params: { account_id, postset_id } } = this.props;
    this.props.getComments(postset_id);
    this.props.getAccountTags(account_id);
    this.props.fetchPostSet({
      id: postset_id,
    });
    const payload = { accountId: account_id };
    this.props.fetchGroupUsers(payload);
  }

  componentWillReceiveProps({ postSet }) {
    this.setState({ postTitle: postSet.getIn(['details', 'title']) });
  }

  handleTitleChange = () => {
  }

  handleTitleBlur = (e) => {
    const { updatePostSet, postSet } = this.props;
    const titleText = e.target.textContent;
    updatePostSet({
      ...postSet.get('details').toJS(),
      id: postSet.getIn(['details', 'post_set_id']),
      title: titleText,
    });
    if (titleText === '') {
      this.setState({
        postTitle: 'Untitled Post',
      });
    }
  }

  render() {
    const { params, children, user, postSet, groupUsers, updatePostSet } = this.props;
    const { postTitle } = this.state;
    return (
      <Wrapper>
        <GeneralInfo
          user={user}
          postSet={postSet.get('details').toJS()}
          postTitle={postTitle}
          handleTitleChange={this.handleTitleChange}
          handleTitleBlur={this.handleTitleBlur}
          handleTitleFocus={this.handleTitleFocus}
          handleTitleKeyDown={this.handleTitleKeyDown}
        />
        <div>
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/content`} label="Content" />
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/channels`} label="Channels & Times" count={0} />
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/streams`} label="Shared Streams" />
        </div>
        {children}
        <Sidebar>
          <UserAssignment
            isFetching={groupUsers.isFetching || postSet.get('isFetching')}
            postSet={postSet.get('details').toJS()}
            assignee={postSet.getIn(['details', 'user_assignments', 0])}
            users={groupUsers.details ? groupUsers.details.groups_users : []}
            updatePostSet={updatePostSet}
          />
          <Tags
            updatePostSet={updatePostSet}
            postSet={postSet.get('details')}
          />
        </Sidebar>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getAccountTags: (accountId) => dispatch(fetchAccountTags(accountId)),
    getComments: (postSetId) => dispatch(fetchComments(postSetId)),
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
    fetchGroupUsers: (payload) => dispatch(fetchGroupUsers(payload)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  postSet: selectPostSet(),
  groupUsers: selectGroupUsers(),
});

export default UserCanPostEdit(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
