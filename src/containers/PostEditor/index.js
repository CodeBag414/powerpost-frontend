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
import {
  deletePostSetRequest,
  fetchGroupUsers,
  fetchPostSetRequest,
  updatePostSetRequest,
  updatePostRequest,
} from 'containers/App/actions';

import {
  setProcessing,
} from 'containers/Main/actions';

import {
  makeSelectUser,
  selectGroupUsers,
  makeSelectUserAccount,
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import {
  makeSelectConnections,
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import {
  fetchComments,
  fetchAccountTags,
  fetchWordpressGUIRequest,
  clearPost,
  createPostRequest,
  fetchCollections,
  createMediaItem,
  clearMediaItem,
  setWordpressPostRequest,
  getMediaItem,
  postCommentRequest,
  deleteCommentRequest,
} from 'containers/PostEditor/actions';

import {
  selectPostSet,
  selectWordpressGUI,
  selectPost,
  selectNewMediaItem,
  makeSelectComments,
} from 'containers/PostEditor/selectors';

import Button from 'elements/atm.Button';
import DeletePostSetDialog from 'components/DeletePostSetDialog';
import Loading from 'components/Loading';

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
    // getComments: PropTypes.func,
    // getAccountTags: PropTypes.func,
    // fetchPostSet: PropTypes.func,
    // fetchGroupUsers: PropTypes.func,
    accountId: PropTypes.string,
    connections: PropTypes.array,
    clearMediaItem: PropTypes.func,
    clearPost: PropTypes.func,
    createMediaItem: PropTypes.func,
    createPost: PropTypes.func,
    setWordpressPost: PropTypes.func,
    deletePostSet: PropTypes.func.isRequired,
    // fetchCollections: PropTypes.func,
    fetchWordpressGUI: PropTypes.func,
    filePickerKey: PropTypes.string,
    goBack: PropTypes.func,
    groupUsers: PropTypes.object,
    id: PropTypes.string,
    location: PropTypes.object,
    modal: PropTypes.bool,
    newMediaItem: ImmutablePropTypes.map,
    params: PropTypes.object,
    post: ImmutablePropTypes.map,
    postSet: ImmutablePropTypes.map,
    updatePost: PropTypes.func,
    updatePostSet: PropTypes.func,
    getMediaItem: PropTypes.func,
    user: PropTypes.shape(),
    userAccount: PropTypes.object,
    wordpressGUI: ImmutablePropTypes.map,
    postComment: PropTypes.func,
    deleteComment: PropTypes.func,
    comments: ImmutablePropTypes.list,
    activeBrand: PropTypes.object,
    setProcessing: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modal: true,
    accountId: '',
    goBack: () => {},
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
    const { postSet, connections } = nextProps;

    if (this.props.postSet !== postSet) {
      const titleText = postSet.getIn(['details', 'title']);
      this.setState({ postTitle: titleText || 'Untitled Post' });
    }

    if (connections && this.props.connections !== connections) {
      this.setAvailableFBChannel(connections);
    }
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

  componentWillUnmount() {
    this.props.clearPost();
  }

  onDeletePostSet = () => {
    const { postSet, deletePostSet, goBack, location } = this.props;
    const id = postSet.getIn(['details', 'post_set_id']);
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
    props.getComments(id);
    props.getAccountTags(accountId);
    props.fetchPostSet({
      id,
    });
    const payload = { accountId };
    props.fetchGroupUsers(payload);
    props.fetchCollections(accountId);

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

  hideDeletePopup = () => {
    this.setState({ showDeletePopup: false });
  }

  render() {
    const {
      filePickerKey,
      accountId,
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
    } = this.props;

    if (postSet.get('isFetching') || postSet.get('details').isEmpty()) {
      return (
        <Wrapper modal={modal}>
          <Loading />
        </Wrapper>
      );
    }

    const { postTitle, selectedTabIndex, showDeletePopup } = this.state;
    const postsArray = postSet.getIn(['details', 'posts']);
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
      // postsArray.map((postItem) => {
      //   const connection = connections && connections.filter((item) =>
      //     item.connection_id === postItem.get('connection_id'),
      //   )[0];
      //   if (postItem.get('status') !== '0' && connection && connection.channel !== 'wordpress') {
      //     if (!posts[postItem.get('connection_id')]) posts[postItem.get('connection_id')] = [];
      //     posts[postItem.get('connection_id')].push(postItem);
      //     totalTimeslots += 1;
      //   }
      //   return true;
      // });
    }

    const { permissions } = activeBrand.user_access;
    const permissionClasses = getClassesByPage(permissions, 'postEditor');
    const tabs = [
      { name: 'Content', component: <Content postSet={postSet} permissionClasses={permissionClasses} accountId={this.props.accountId} id={this.props.id} location={this.props.location} params={this.props.params} availableFBChannel={this.availableFBChannel} /> },
      { name: 'Schedule', component: <Schedule postSet={postSet} permissionClasses={permissionClasses} posts={posts} updatePost={updatePost} availableFBChannel={this.availableFBChannel} />, count: posts ? posts.length : 0 },
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
                        ${index === (permissionClasses.contentTab && 1) || selectedTabIndex ? 'active-link' : ''}
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
                postSet={postSet.get('details')}
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

export function mapDispatchToProps(dispatch) {
  return {
    deletePostSet: (id) => dispatch(deletePostSetRequest(id)),
    getAccountTags: (accountId) => dispatch(fetchAccountTags(accountId)),
    getComments: (postSetId) => dispatch(fetchComments(postSetId)),
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
    fetchGroupUsers: (payload) => dispatch(fetchGroupUsers(payload)),
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
    updatePost: (payload) => dispatch(updatePostRequest(payload)),
    fetchWordpressGUI: (payload) => dispatch(fetchWordpressGUIRequest(payload)),
    clearPost: () => dispatch(clearPost()),
    createPost: (payload) => dispatch(createPostRequest(payload)),
    goBack: () => dispatch(routerActions.goBack()),
    fetchCollections: (accountId) => dispatch(fetchCollections(accountId)),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    clearMediaItem: () => dispatch(clearMediaItem()),
    setWordpressPost: (payload) => dispatch(setWordpressPostRequest(payload)),
    getMediaItem: (mediaItemId) => dispatch(getMediaItem(mediaItemId)),
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
    setProcessing: (processing) => dispatch(setProcessing(processing)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  postSet: selectPostSet(),
  groupUsers: selectGroupUsers(),
  userAccount: makeSelectUserAccount(),
  activeBrand: makeSelectCurrentAccount(),
  connections: makeSelectConnections(),
  wordpressGUI: selectWordpressGUI(),
  post: selectPost(),
  filePickerKey: makeSelectFilePickerKey(),
  newMediaItem: selectNewMediaItem(),
  comments: makeSelectComments(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditor));
