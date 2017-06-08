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
  updatePostRequest,
  fetchConnections,
} from 'containers/App/actions';

import {
  makeSelectUser,
  selectGroupUsers,
  makeSelectUserAccount,
  selectConnections,
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
import StatusChooser from './Sidebar/StatusChooser';
import Tags from './Sidebar/Tags';
import WordpressSettings from './Sidebar/WordpressSettings';

import Content from './Content';
import Channels from './Channels';
import SharedStreams from './SharedStreams';

class PostEditor extends Component {

  static propTypes = {
    // getComments: PropTypes.func,
    // getAccountTags: PropTypes.func,
    // fetchPostSet: PropTypes.func,
    // fetchGroupUsers: PropTypes.func,
    // fetchConnections: PropTypes.func,
    user: PropTypes.shape(),
    postSet: PropTypes.object,
    groupUsers: PropTypes.object,
    userAccount: PropTypes.object,
    updatePostSet: PropTypes.func,
    updatePost: PropTypes.func,
    id: PropTypes.string,
    accountId: PropTypes.string,
    connections: PropTypes.array,
  };

  state = {
    postTitle: '',
    selectedTab: 'Power Post',
  };

  componentWillMount() {
    this.initialize();
    console.log('@@@@@__--', this.props);
  }

  componentWillReceiveProps({ postSet }) {
    const titleText = postSet.getIn(['details', 'title']);
    this.setState({ postTitle: titleText || 'Untitled Post' });
  }

  shouldComponentUpdate(nextProps) {
    const { postSet } = nextProps;
    return !postSet.get('isFetching');
  }

  componentWillUpdate(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.initialize(nextProps);
    }
  }

  initialize = (props = this.props) => {
    const { accountId, id } = props;
    props.getComments(id);
    props.getAccountTags(accountId);
    props.fetchPostSet({
      id,
    });
    const payload = { accountId };
    props.fetchGroupUsers(payload);
    props.fetchConnections(accountId);
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
    const {
      user,
      postSet,
      groupUsers,
      userAccount,
      updatePostSet,
      updatePost,
      connections,
    } = this.props;

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
      { name: 'Power Post', component: <Content postSet={postSet} accountId={this.props.accountId} id={this.props.id} /> },
      { name: 'Channels & Times', component: <Channels postSet={postSet} posts={posts} updatePost={updatePost} />, count: totalTimeslots },
      { name: 'Shared Stream', component: <SharedStreams postSet={postSet} /> },
    ];
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
        <div className="content-wrapper">
          <div className="content">
            <div className="main">
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
            </div>
            <Sidebar>
              <UserAssignment
                isFetching={groupUsers.isFetching || postSet.get('isFetching')}
                postSet={postSet.get('details').toJS()}
                assignee={postSet.getIn(['details', 'user_assignments', 0])}
                users={groupUsers.details ? groupUsers.details.groups_users : []}
                updatePostSet={updatePostSet}
              />
              <StatusChooser
                postSet={postSet}
                updatePostSet={updatePostSet}
                userAccount={userAccount}
              />
              <WordpressSettings
                connections={connections}
              />
              <Tags
                updatePostSet={updatePostSet}
                postSet={postSet.get('details')}
              />
            </Sidebar>
          </div>
        </div>
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
  userAccount: makeSelectUserAccount(),
  connections: selectConnections(),
});

export default UserCanPostEdit(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
