/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { routerActions } from 'react-router-redux';
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
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import {
  fetchComments,
  fetchAccountTags,
  fetchWordpressGUIRequest,
  createPostRequest,
  fetchCollections,
  createMediaItem,
  clearMediaItem,
} from 'containers/PostEditor/actions';

import {
  selectPostSet,
  selectWordpressGUI,
  selectPost,
  selectNewMediaItem,
} from 'containers/PostEditor/selectors';

import Loading from 'components/Loading';

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
    accountId: PropTypes.string,
    connections: PropTypes.array,
    groupUsers: PropTypes.object,
    id: PropTypes.string,
    location: PropTypes.object,
    modal: PropTypes.bool,
    updatePost: PropTypes.func,
    updatePostSet: PropTypes.func,
    postSet: ImmutablePropTypes.map,
    user: PropTypes.shape(),
    userAccount: PropTypes.object,
    filePickerKey: PropTypes.string,
    newMediaItem: ImmutablePropTypes.map,
    createPost: PropTypes.func,
    fetchWordpressGUI: PropTypes.func,
    wordpressGUI: ImmutablePropTypes.map,
    post: ImmutablePropTypes.map,
    goBack: PropTypes.func,
    fetchCollections: PropTypes.func,
    createMediaItem: PropTypes.func,
    clearMediaItem: PropTypes.func,
  };

  static defaultProps = {
    modal: true,
    accountId: PropTypes.string,
    goBack: PropTypes.func,
  };

  state = {
    postTitle: '',
    selectedTab: 'Power Post',
  };

  componentWillMount() {
    this.initialize();
    this.props.clearMediaItem();
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
    props.fetchCollections(accountId);
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
      filePickerKey,
      accountId,
      connections,
      groupUsers,
      location,
      modal,
      postSet,
      updatePost,
      updatePostSet,
      user,
      userAccount,
      newMediaItem,
      createPost,
      fetchWordpressGUI,
      wordpressGUI,
      post,
      goBack,
    } = this.props;

    if (postSet.get('isFetching') || postSet.get('details').isEmpty()) {
      return (
        <Wrapper modal={modal}>
          <Loading />
        </Wrapper>
      );
    }

    const { postTitle, selectedTab } = this.state;
    const postsArray = postSet.getIn(['details', 'posts']);
    const posts = {};
    let totalTimeslots = 0;
    if (postsArray) {
      postsArray.map((postItem) => {
        if (postItem.get('status') !== '0') {
          if (!posts[postItem.get('connection_id')]) posts[postItem.get('connection_id')] = [];
          posts[postItem.get('connection_id')].push(postItem);
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

    const generalInfo = (
      <GeneralInfo
        user={user}
        postSet={postSet.get('details').toJS()}
        postTitle={postTitle}
        location={location}
        handleTitleChange={this.handleTitleChange}
        handleTitleBlur={this.handleTitleBlur}
        handleTitleFocus={this.handleTitleFocus}
        handleTitleKeyDown={this.handleTitleKeyDown}
        modal={modal}
        goBack={goBack}
      />
    );
    return (
      <Wrapper modal={modal}>
        { modal ? generalInfo : null }
        <div className="content-wrapper">
          <div className="content">
            <div className="main">
              { modal ? null : generalInfo }
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
              <StatusChooser
                postSet={postSet}
                updatePostSet={updatePostSet}
                userAccount={userAccount}
              />
              <UserAssignment
                isFetching={groupUsers.isFetching || postSet.get('isFetching')}
                postSet={postSet.get('details').toJS()}
                assignee={postSet.getIn(['details', 'user_assignments', 0])}
                users={groupUsers.details ? groupUsers.details.groups_users : []}
                updatePostSet={updatePostSet}
              />
              <WordpressSettings
                filePickerKey={filePickerKey}
                accountId={accountId}
                postSet={postSet}
                connections={connections}
                wordpressGUI={wordpressGUI}
                post={post}
                newMediaItem={newMediaItem}
                updatePost={updatePost}
                createPost={createPost}
                fetchWordpressGUI={fetchWordpressGUI}
                createMediaItem={this.props.createMediaItem}
                clearMediaItem={this.props.clearMediaItem}
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
    fetchWordpressGUI: (payload) => dispatch(fetchWordpressGUIRequest(payload)),
    createPost: (payload) => dispatch(createPostRequest(payload)),
    goBack: () => dispatch(routerActions.goBack()),
    fetchCollections: (accountId) => dispatch(fetchCollections(accountId)),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    clearMediaItem: () => dispatch(clearMediaItem()),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  postSet: selectPostSet(),
  groupUsers: selectGroupUsers(),
  userAccount: makeSelectUserAccount(),
  connections: selectConnections(),
  wordpressGUI: selectWordpressGUI(),
  post: selectPost(),
  filePickerKey: makeSelectFilePickerKey(),
  newMediaItem: selectNewMediaItem(),
});

export default UserCanPostEdit(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
