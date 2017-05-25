import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { UserCanPostSet } from 'config.routes/UserRoutePermissions';

import {
  fetchPosts,
  updatePostRequest,
} from 'containers/App/actions';

import {
  makeSelectPosts,
} from 'containers/App/selectors';

import {
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import DeletePostSetDialog from 'components/DeletePostSetDialog';
import PostEditor from 'containers/PostEditor';
import Wrapper from './Wrapper';
import CalendarSidebar from './CalendarSidebar';
import CalendarView from './CalendarView';


/**
 * Calendar component for posts
 */
class Calendar extends React.Component {

  static propTypes = {
    location: PropTypes.object,
    getPosts: PropTypes.func,
    updatePost: PropTypes.func,
    posts: PropTypes.any,
    currentAccount: PropTypes.object,
    params: PropTypes.shape({
      account_id: PropTypes.string,
    }),
  };

  state = {
    query: '',
    filters: [true, true, true, true, true, true, true],
    showDeletePopup: false,
  };

  componentDidMount() {
    this.fetchPosts(this.props);
  }

  componentWillReceiveProps(props) {
    if (this.props.location !== props.location) {
      // this.fetchPosts(props);
    }
  }

  onDeletePostSet = () => {
    const { postToDelete } = this.state;
    const { updatePost } = this.props;
    const newPost = {
      ...postToDelete.post,
      status: 0,
    };
    updatePost(newPost);
  }

  fetchPosts = (props) => {
    const { location, getPosts } = props;
    const pathParts = location.pathname.split('/');
    const accountId = pathParts[pathParts.length - 2];
    getPosts(accountId);
  }

  handleSearch = (query) => {
    this.setState({ query });
  }

  handleToggleFilter = (filter, value) => {
    const { filters } = this.state;
    const newFilters = [...filters];
    switch (filter) {
      case 'showReady':
        newFilters[3] = value;
        break;
      case 'showReview':
        newFilters[5] = value;
        break;
      case 'showDraft':
        newFilters[2] = value;
        break;
      case 'showIdea':
        newFilters[6] = value;
        break;
      default:
        return;
    }
    this.setState({ filters: newFilters });
  }

  handleMoveEvent = ({ event, start }) => {
    const { post } = event;
    const { updatePost } = this.props;
    const scheduleTime = moment(start).format('X');
    /* eslint-disable no-alert */
    if (moment().diff(moment.unix(post.post.schedule_time)) > 0) { // If the dragged post is in the past
      alert('You cannot reschedule a past event.');
      return;
    } else if (moment().diff(moment(start)) > 0) {
      alert('You cannot schedule a post in the past.');
      return;
    }
    /* eslint-enable no-alert */
    const newPost = {
      ...post.post,
      schedule_time: scheduleTime,
    };
    updatePost(newPost);
  }

  handleDeleteEvent = (post) => {
    this.setState({
      postToDelete: post,
      showDeletePopup: true,
    });
  }

  hideDeletePopup = () => {
    this.setState({ showDeletePopup: false });
  }

  render() {
    const { query, filters, showDeletePopup } = this.state;
    const { posts, currentAccount, params, location: { hash } } = this.props;
    if (posts == null || !Array.isArray(posts)) return null;
    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : 0;
    return (
      <Wrapper className={postsetId ? 'modal-open' : ''}>
        <CalendarSidebar
          posts={posts}
          query={query}
          onSearch={this.handleSearch}
          onToggleFilter={this.handleToggleFilter}
          onDelete={this.handleDeleteEvent}
        />
        <CalendarView
          posts={posts}
          currentAccount={currentAccount}
          query={query}
          filters={filters}
          onMoveEvent={this.handleMoveEvent}
          onDeleteEvent={this.handleDeleteEvent}
        />
        <DeletePostSetDialog
          active={showDeletePopup}
          handleDialogToggle={this.hideDeletePopup}
          deletePostSet={this.onDeletePostSet}
        />
        <div className="post-editor">
          { postsetId ? <PostEditor id={postsetId} accountId={params.account_id} location={this.props.location} /> : null}
        </div>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getPosts: (accountId) => dispatch(fetchPosts(accountId)),
    updatePost: (post) => dispatch(updatePostRequest(post)),
  }
);

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  currentAccount: makeSelectCurrentAccount(),
});

export default UserCanPostSet(connect(mapStateToProps, mapDispatchToProps)(Calendar));
