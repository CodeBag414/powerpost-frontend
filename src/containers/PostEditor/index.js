/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { UserCanPostEdit } from 'config.routes/UserRoutePermissions';

import {
  fetchGroupUsers,
  fetchPostSetRequest,
  updatePostSetRequest,
  updatePostRequest,
  fetchConnections,
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
import Content from './Content';
import Channels from './Channels';
import SharedStreams from './SharedStreams';

class PostEditor extends Component {

  static propTypes = {
    getComments: PropTypes.func,
    getAccountTags: PropTypes.func,
    fetchPostSet: PropTypes.func,
    fetchGroupUsers: PropTypes.func,
    fetchConnections: PropTypes.func,
    user: PropTypes.shape(),
    postSet: PropTypes.object,
    groupUsers: PropTypes.object,
    updatePostSet: PropTypes.func,
    updatePost: PropTypes.func,
    id: PropTypes.string,
    accountId: PropTypes.string,
  };

  state = {
    postTitle: '',
    selectedTab: 'Power Post',
  };

  componentWillMount() {
    const { accountId, id } = this.props;
    this.props.getComments(id);
    this.props.getAccountTags(accountId);
    this.props.fetchPostSet({
      id,
    });
    const payload = { accountId };
    this.props.fetchGroupUsers(payload);
    this.props.fetchConnections(accountId);
  }

  componentWillReceiveProps({ postSet }) {
    this.setState({ postTitle: postSet.getIn(['details', 'title']) });
  }

  onBack = () => {
    browserHistory.goBack();
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
    const { user, postSet, groupUsers, updatePostSet, updatePost } = this.props;
    const { postTitle, selectedTab } = this.state;
    const postsArray = postSet.getIn(['details', 'posts']);
    const posts = {};
    let totalTimeslots = 0;
    if (postsArray) {
      postsArray.map((post) => {
        if (post.get('status') !== '0') {
          if (!posts[post.get('connection_id')]) posts[post.get('connection_id')] = [];
          posts[post.get('connection_id')].push(post);
          totalTimeslots += 1;
        }
        return true;
      });
    }

    const tabs = [
      { name: 'Power Post', component: <Content postSet={postSet} /> },
      { name: 'Channels & Times', component: <Channels postSet={postSet} posts={posts} updatePost={updatePost} />, count: totalTimeslots },
      { name: 'Shared Streams', component: <SharedStreams postSet={postSet} /> },
    ];
    return (
      <Wrapper>
        <div className="back-button" onClick={this.onBack}>
          <i className="fa fa-hand-o-left icon" aria-hidden="true" />
        </div>
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
          {
            tabs.map((tab) =>
              <span
                key={tab.name}
                className={tab.name === selectedTab ? 'active-link' : ''}
                onClick={() => this.setState({ selectedTab: tab.name })}
              >
                <TabLink
                  label={tab.name}
                  count={tab.count}
                />
              </span>
            )
          }
        </div>
        {
          tabs.map((tab) => (tab.name === selectedTab ? tab.component : null))
        }
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
    updatePost: (payload) => dispatch(updatePostRequest(payload)),
    fetchConnections: (payload) => dispatch(fetchConnections(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  postSet: selectPostSet(),
  groupUsers: selectGroupUsers(),
});

export default UserCanPostEdit(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
