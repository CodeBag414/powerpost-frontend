/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { routerActions } from 'react-router-redux';
import { withRouter } from 'react-router';

import { getClassesByPage } from 'utils/permissionClass';

import Button from 'elements/atm.Button';
import DeletePostSetDialog from 'components/DeletePostSetDialog';
import Loading from 'components/Loading';

import {
  fetchGroupUsers,
  fetchPostSetRequest,
  updatePostSetRequest,
  deletePostSetRequest,
  createPostRequest,
  updatePostRequest,
  createBunchPostsRequest,
  setPost,
  clearPost,
} from 'containers/App/actions';
import {
  makeSelectUser,
  selectGroupUsers,
  makeSelectUserAccount,
  makeSelectFilePickerKey,
  makeSelectPostSet,
  makeSelectPost,
} from 'containers/App/selectors';

import {
  setProcessing,
} from 'containers/Main/actions';
import {
  makeSelectAccountConnections,
  makeSelectConnections,
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import {
  fetchComments,
  fetchAccountTags,
  fetchWordpressGUIRequest,
  fetchCollections,
  postCommentRequest,
  deleteCommentRequest,
  createMediaItem,
  clearMediaItem,
  getMediaItem,
} from './actions';
import {
  selectWordpressGUI,
  selectNewMediaItem,
  makeSelectComments,
} from './selectors';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';
import TabLink from './TabLink';
import Sidebar from './Sidebar';
import Tags from './Sidebar/Tags';
import WordpressSettings from './Sidebar/WordpressSettings';
import ChannelsPreview from './Sidebar/ChannelsPreview';
import SharedStream from './Sidebar/SharedStream';
import ExpandCollapseButton from './Sidebar/ExpandCollapseButton';
import Comments from './Comments';

import Content from './Content';
import Schedule from './Schedule';
import TabWrapper from './TabWrapper';

class PostEditor extends Component {
  static propTypes = {
    getComments: PropTypes.func,
    getAccountTags: PropTypes.func,
    fetchGroupUsers: PropTypes.func,
    accountId: PropTypes.string,
    accountConnections: PropTypes.array,
    connections: PropTypes.array,
    fetchCollections: PropTypes.func,
    fetchWordpressGUI: PropTypes.func,
    filePickerKey: PropTypes.string,
    goBack: PropTypes.func,
    groupUsers: PropTypes.object,
    id: PropTypes.string,
    location: PropTypes.object,
    modal: PropTypes.bool,
    params: PropTypes.object,
    user: PropTypes.shape(),
    userAccount: PropTypes.object,
    wordpressGUI: ImmutablePropTypes.map,
    postComment: PropTypes.func,
    deleteComment: PropTypes.func,
    comments: ImmutablePropTypes.list,
    activeBrand: PropTypes.object,
    setProcessing: PropTypes.func.isRequired,
    postSet: ImmutablePropTypes.map,
    post: ImmutablePropTypes.map,
    fetchPostSet: PropTypes.func,
    updatePostSet: PropTypes.func,
    deletePostSet: PropTypes.func.isRequired,
    createBunchPosts: PropTypes.func,
    createPost: PropTypes.func,
    updatePost: PropTypes.func,
    clearPost: PropTypes.func,
    setWordpressPost: PropTypes.func,
    loadPostSet: PropTypes.func,
    newMediaItem: ImmutablePropTypes.map,
    getMediaItem: PropTypes.func,
    createMediaItem: PropTypes.func,
    clearMediaItem: PropTypes.func,
  };

  static defaultProps = {
    modal: true,
    accountId: '',
    goBack: () => {},
    loadPostSet: () => {},
  };

  state = {
    postTitle: '',
    selectedTabIndex: 0,
    showDeletePopup: false,
    sidebarExpanded: true,
  };

  componentWillMount() {
    this.initialize();
    this.props.clearMediaItem();
  }

  componentWillReceiveProps(nextProps) {
    const { postSet, connections, loadPostSet, activeBrand } = nextProps;
    const { permissions } = activeBrand.user_access;
    const permissionClasses = getClassesByPage(permissions, 'postEditor');

    if (this.props.postSet !== postSet) {
      if (!postSet.get('requesting')) {
        loadPostSet(false);
      }

      const titleText = postSet.getIn(['data', 'title']);
      this.setState({ postTitle: titleText || 'Untitled Post' });
    }

    if (connections && this.props.connections !== connections) {
      this.setAvailableFBChannel(connections);
    }

    if (permissionClasses.contentTab) {
      this.setState({ selectedTabIndex: 1, sidebarExpanded: false });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { postSet } = nextProps;
    return !postSet.get('requesting');
  }

  componentWillUpdate(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.initialize(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.clearPost();
  }

  onDeletePostSet = () => {
    const { postSet, deletePostSet, goBack, location } = this.props;
    const id = postSet.getIn(['data', 'post_set_id']);
    deletePostSet(id);

    if (location && !location.pathname.endsWith('/posts')) {
      goBack();
    }
  }

  setAvailableFBChannel = (connections) => {
    const facebookConnection = connections
      .filter((connection) => connection.channel === 'facebook' && connection.status === '1')[0];
    if (facebookConnection) {
      this.availableFBChannel = facebookConnection.connection_id;
    } else {
      // eslint-disable-next-line
      console.log('No active facebook connection available - cannot fetch Facebook entities');
    }
  }

  initialize = (props = this.props) => {
    const { accountId, id } = props;
    this.props.loadPostSet(true);
    this.props.getComments(id);
    this.props.getAccountTags(accountId);
    this.props.fetchPostSet({
      id,
    });
    const payload = { accountId };
    this.props.fetchGroupUsers(payload);
    this.props.fetchCollections(accountId);

    if (props.connections) {
      this.setAvailableFBChannel(props.connections);
    }
  }

  handleClickDelete = () => {
    this.setState({ showDeletePopup: true });
  }

  handleSidebarToggle = () => {
    this.setState({ sidebarExpanded: !this.state.sidebarExpanded });
  }

  handleTitleChange = () => {
  }

  handleTitleBlur = (e) => {
    const { updatePostSet, loadPostSet, postSet } = this.props;
    const titleText = e.target.textContent;
    loadPostSet(true);
    updatePostSet({
      ...postSet.get('data').toJS(),
      id: postSet.getIn(['data', 'post_set_id']),
      title: titleText,
    });
    if (titleText === '') {
      this.setState({
        postTitle: 'Untitled Post',
      });
    }
  }

  hideDeletePopup = () => {
    this.setState({ showDeletePopup: false });
  }

  render() {
    const {
      filePickerKey,
      accountId,
      accountConnections,
      connections,
      groupUsers,
      id,
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
      postComment,
      deleteComment,
      comments,
      activeBrand,
      loadPostSet,
      createBunchPosts,
    } = this.props;

    if (postSet.get('requesting') || !postSet.get('data')) {
      loadPostSet(true);
      return (
        <Wrapper modal={modal}>
          <Loading />
        </Wrapper>
      );
    }

    const { postTitle, selectedTabIndex, showDeletePopup } = this.state;
    const postsArray = postSet.getIn(['data', 'posts']);
    let posts;
    if (postsArray) {
      // Sort posts & calculate total timeslots
      posts = postsArray.toJS().filter((postItem) =>
        postItem.status !== '0' && postItem.connection_channel !== 'wordpress'
      ).sort((postA, postB) => {
        const timeA = postA.schedule_time;
        const timeB = postB.schedule_time;
        return (timeA > timeB);
      });
    }

    const { permissions } = activeBrand.user_access;
    const permissionClasses = getClassesByPage(permissions, 'postEditor');
    const tabs = [
      {
        name: 'Content',
        component:
          <Content
            accountId={this.props.accountId}
            availableFBChannel={this.availableFBChannel}
            id={this.props.id}
            location={this.props.location}
            params={this.props.params}
            permissionClasses={permissionClasses}
            postSet={postSet}
            updatePostSet={updatePostSet}
          />,
      },
      {
        name: 'Schedule',
        component:
          <Schedule
            accountConnections={accountConnections}
            availableFBChannel={this.availableFBChannel}
            connections={connections}
            newMediaItem={newMediaItem}
            permissionClasses={permissionClasses}
            posts={posts}
            postSet={postSet}
            createBunchPosts={createBunchPosts}
            updatePost={updatePost}
          />,
        count: posts ? posts.length : 0,
      },
    ];

    const generalInfo = (
      <GeneralInfo
        user={user}
        postSet={postSet}
        postTitle={postTitle}
        location={location}
        handleTitleChange={this.handleTitleChange}
        handleTitleBlur={this.handleTitleBlur}
        handleTitleFocus={this.handleTitleFocus}
        handleTitleKeyDown={this.handleTitleKeyDown}
        modal={modal}
        goBack={goBack}
        updatePostSet={updatePostSet}
        userAccount={userAccount}
        groupUsers={groupUsers}
        permissionClasses={permissionClasses}
      />
    );
    return (
      <Wrapper modal={modal}>
        { generalInfo }
        <div className="content-wrapper">
          <div className="content">
            <div className="main">
              <TabWrapper>
                {
                  tabs.map((tab, index) =>
                    <span
                      key={tab.name}
                      className={`
                        ${((permissionClasses.contentTab && index === 1) || index === selectedTabIndex) ? 'active-link' : ''}
                        ${tab.name.toLowerCase() === 'content' && permissionClasses.contentTab}
                      `}
                      onClick={() => {
                        this.setState({
                          selectedTabIndex: index,
                          sidebarExpanded: !(tab.name === 'Schedule'),
                        });
                      }}
                    >
                      <TabLink
                        label={tab.name}
                        count={tab.count}
                      />
                    </span>
                  )
                }
                <div className="tabs-bottom-border"></div>
              </TabWrapper>
              {
                tabs.map((tab, index) => (index === selectedTabIndex ? tab.component : null))
              }
              <Comments
                comments={comments}
                deleteComment={deleteComment}
                postComment={postComment}
                postSetId={id}
                user={user}
                permissionClasses={permissionClasses}
              />
            </div>
            <Sidebar expanded={this.state.sidebarExpanded}>
              <Tags
                updatePostSet={updatePostSet}
                postSet={postSet.get('data')}
                permissionClasses={permissionClasses}
              />
              <ChannelsPreview
                connections={connections}
                postSet={postSet}
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
                setWordpressPost={this.props.setWordpressPost}
                getMediaItem={this.props.getMediaItem}
                permissionClasses={permissionClasses}
                setProcessing={this.props.setProcessing}
              />
              <SharedStream
                accountStreamId={userAccount.account_streams[0].stream_id}
                postSet={postSet}
                updatePostSet={updatePostSet}
                permissionClasses={permissionClasses}
              />
              <Button onClick={this.handleClickDelete} className={`button-flat ${permissionClasses.deletePostButton}`} flat>Delete Post</Button>
              <ExpandCollapseButton
                sidebarExpanded={this.state.sidebarExpanded}
                onClick={this.handleSidebarToggle}
              />
            </Sidebar>
          </div>
        </div>
        <DeletePostSetDialog
          active={showDeletePopup}
          handleDialogToggle={this.hideDeletePopup}
          deletePostSet={this.onDeletePostSet}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  groupUsers: selectGroupUsers(),
  userAccount: makeSelectUserAccount(),
  activeBrand: makeSelectCurrentAccount(),
  accountConnections: makeSelectAccountConnections(),
  connections: makeSelectConnections(),
  wordpressGUI: selectWordpressGUI(),
  filePickerKey: makeSelectFilePickerKey(),
  comments: makeSelectComments(),
  postSet: makeSelectPostSet(),
  post: makeSelectPost(),
  newMediaItem: selectNewMediaItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountTags: (accountId) => dispatch(fetchAccountTags(accountId)),
    getComments: (postSetId) => dispatch(fetchComments(postSetId)),
    fetchGroupUsers: (payload) => dispatch(fetchGroupUsers(payload)),
    fetchWordpressGUI: (payload) => dispatch(fetchWordpressGUIRequest(payload)),
    goBack: () => dispatch(routerActions.goBack()),
    fetchCollections: (accountId) => dispatch(fetchCollections(accountId)),
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
    setProcessing: (processing) => dispatch(setProcessing(processing)),
    /* Post set */
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
    deletePostSet: (id) => dispatch(deletePostSetRequest(id)),
    /* Posts */
    createBunchPosts: (posts) => dispatch(createBunchPostsRequest(posts)),
    /* Post */
    createPost: (payload) => dispatch(createPostRequest(payload)),
    updatePost: (payload) => dispatch(updatePostRequest(payload)),
    clearPost: () => dispatch(clearPost()),
    setWordpressPost: (post) => dispatch(setPost(post)),
    /* Media item */
    getMediaItem: (mediaItemId) => dispatch(getMediaItem(mediaItemId)),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    clearMediaItem: () => dispatch(clearMediaItem()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
