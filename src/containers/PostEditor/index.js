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
} from 'containers/App/selectors';

import {
  fetchComments,
  fetchAccountTags,
  fetchWordpressGUIRequest,
  createPostRequest,
} from 'containers/PostEditor/actions';

import {
  selectPostSet,
  selectWordpressGUI,
  selectPost,
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
    createPost: PropTypes.func,
    fetchWordpressGUI: PropTypes.func,
    wordpressGUI: ImmutablePropTypes.map,
    post: ImmutablePropTypes.map,
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
      connections,
      groupUsers,
      location,
      modal,
      postSet,
      updatePost,
      updatePostSet,
      user,
      userAccount,
      createPost,
      fetchWordpressGUI,
      wordpressGUI,
      post,
    } = this.props;

    if (postSet.get('isFetching')) {
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
      <Wrapper modal={modal}>
        <GeneralInfo
          closeButtonHidden={!modal}
          handleTitleBlur={this.handleTitleBlur}
          handleTitleChange={this.handleTitleChange}
          handleTitleFocus={this.handleTitleFocus}
          handleTitleKeyDown={this.handleTitleKeyDown}
          location={location}
          postSet={postSet.get('details').toJS()}
          postTitle={postTitle}
          user={user}
          goBack={this.props.goBack}
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
                postSet={postSet}
                connections={connections}
                wordpressGUI={wordpressGUI}
                post={post}
                updatePost={updatePost}
                createPost={createPost}
                fetchWordpressGUI={fetchWordpressGUI}
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
});

export default UserCanPostEdit(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
