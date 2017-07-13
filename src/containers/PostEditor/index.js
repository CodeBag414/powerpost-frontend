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
import { withRouter } from 'react-router';

import {
  deletePostSetRequest,
  fetchGroupUsers,
  fetchPostSetRequest,
  updatePostSetRequest,
  updatePostRequest,
} from 'containers/App/actions';

import {
  makeSelectUser,
  selectGroupUsers,
  makeSelectUserAccount,
  makeSelectFilePickerKey,
} from 'containers/App/selectors';

import {
  makeSelectConnections,
} from 'containers/Main/selectors';

import {
  fetchComments,
  fetchAccountTags,
  fetchWordpressGUIRequest,
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
import Channels from './Channels';
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
  };

  static defaultProps = {
    modal: true,
    accountId: '',
    goBack: () => {},
  };

  state = {
    postTitle: '',
    selectedTab: 'Content',
    showDeletePopup: false,
    sidebarExpanded: true,
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

  onDeletePostSet = () => {
    const { postSet, deletePostSet, goBack, location } = this.props;
    const id = postSet.getIn(['details', 'post_set_id']);
    deletePostSet(id);

    if (location && !location.pathname.endsWith('/posts')) {
      console.log(location);
      goBack();
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
    } = this.props;

    if (postSet.get('isFetching') || postSet.get('details').isEmpty()) {
      return (
        <Wrapper modal={modal}>
          <Loading />
        </Wrapper>
      );
    }

    const { postTitle, selectedTab, showDeletePopup } = this.state;
    const postsArray = postSet.getIn(['details', 'posts']);
    const posts = {};
    let totalTimeslots = 0;
    if (postsArray) {
      postsArray.map((postItem) => {
        const connection = connections && connections.filter((item) =>
          item.connection_id === postItem.get('connection_id'),
        )[0];
        if (postItem.get('status') !== '0' && connection && connection.channel !== 'wordpress') {
          if (!posts[postItem.get('connection_id')]) posts[postItem.get('connection_id')] = [];
          posts[postItem.get('connection_id')].push(postItem);
          totalTimeslots += 1;
        }
        return true;
      });
    }

    const tabs = [
      { name: 'Content', component: <Content postSet={postSet} accountId={this.props.accountId} id={this.props.id} location={this.props.location} params={this.props.params} /> },
      { name: 'Schedule', component: <Channels postSet={postSet} posts={posts} updatePost={updatePost} />, count: totalTimeslots },
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
                  tabs.map((tab) =>
                    <span
                      key={tab.name}
                      className={tab.name === selectedTab ? 'active-link' : ''}
                      onClick={() => {
                        this.setState({
                          selectedTab: tab.name,
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
                tabs.map((tab) => (tab.name === selectedTab ? tab.component : null))
              }
              <Comments
                comments={comments}
                deleteComment={deleteComment}
                postComment={postComment}
                postSetId={id}
                user={user}
              />
            </div>
            <Sidebar expanded={this.state.sidebarExpanded}>
              <Tags
                updatePostSet={updatePostSet}
                postSet={postSet.get('details')}
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
              />
              <SharedStream
                accountStreamId={userAccount.account_streams[0].stream_id}
                postSet={postSet}
                updatePostSet={updatePostSet}
              />
              <Button onClick={this.handleClickDelete} className="button-flat" flat>Delete Post</Button>
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
    createPost: (payload) => dispatch(createPostRequest(payload)),
    goBack: () => dispatch(routerActions.goBack()),
    fetchCollections: (accountId) => dispatch(fetchCollections(accountId)),
    createMediaItem: (mediaItem) => dispatch(createMediaItem(mediaItem)),
    clearMediaItem: () => dispatch(clearMediaItem()),
    setWordpressPost: (payload) => dispatch(setWordpressPostRequest(payload)),
    getMediaItem: (mediaItemId) => dispatch(getMediaItem(mediaItemId)),
    postComment: (postSetId, text) => dispatch(postCommentRequest({ postSetId, text })),
    deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  postSet: selectPostSet(),
  groupUsers: selectGroupUsers(),
  userAccount: makeSelectUserAccount(),
  connections: makeSelectConnections(),
  wordpressGUI: selectWordpressGUI(),
  post: selectPost(),
  filePickerKey: makeSelectFilePickerKey(),
  newMediaItem: selectNewMediaItem(),
  comments: makeSelectComments(),
});

export default UserCanPostEdit(withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditor)));
