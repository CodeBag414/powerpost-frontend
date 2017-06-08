import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { UserCanPostSet } from 'config.routes/UserRoutePermissions';

import {
  deletePostSetRequest,
  fetchPostSetsBySTRequest,
  updatePostRequest,
  // updatePostSetRequest,
} from 'containers/App/actions';

import {
  makeSelectPostSetsByST,
} from 'containers/App/selectors';

import {
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import PostEditor from 'containers/PostEditor';
import DeletePostSetDialog from 'components/DeletePostSetDialog';
import Loading from 'components/Loading';

import Wrapper from './Wrapper';
import CalendarSidebar from './CalendarSidebar';
import CalendarView from './CalendarView';


/**
 * Calendar component for posts
 */
class Calendar extends React.Component {

  static propTypes = {
    location: PropTypes.object,
    fetchPostSetsByST: PropTypes.func,
    updatePost: PropTypes.func,
    deletePostSet: PropTypes.func,
    postSetsByST: PropTypes.any,
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
    this.loadPostSetsByST();
  }

  onDeletePostSet = () => {
    const { deletePostSet } = this.props;
    const { postSetToDelete } = this.state;

    let id = null;

    if (postSetToDelete.posts.length === 0) { // Meaning the postSet is unscheduled
      id = postSetToDelete.post_set_id;
    } else { // Meaning that the postSet is scheduled or post-when-ready, i.e. need to bunch delete the posts

    }

    if (id) {
      deletePostSet(id);
    }
  }

  filterPostSets = (postSets) => {
    const { filters, query } = this.state;
    const queryLowerCase = query.toLowerCase();
    return postSets.map((postSet) => {
      if (postSet.status === '0') return null; // Don't show deleted posts
      const titleMatch = !query || (postSet.title && postSet.title.toLowerCase().indexOf(queryLowerCase) !== -1);
      let tagsMatch = !query;
      if (postSet.tags) {
        for (let i = 0; i < postSet.tags.length; i += 1) {
          const tag = postSet.tags[i].toLowerCase();
          if (tag.indexOf(queryLowerCase) !== -1) {
            tagsMatch = true;
            break;
          }
        }
      }
      const filterMatch = filters[postSet.status];
      if ((titleMatch || tagsMatch) && filterMatch) {
        return postSet;
      }
      return null;
    }).filter((postSet) => postSet);
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
    const newPost = {
      ...post.post,
      schedule_time: scheduleTime,
    };
    updatePost(newPost);
  }

  handleDeleteEvent = (postSet) => {
    this.setState({
      postSetToDelete: postSet,
      showDeletePopup: true,
    });
  }

  hideDeletePopup = () => {
    this.setState({ showDeletePopup: false });
  }

  loadPostSetsByST = () => {
    const { params, fetchPostSetsByST } = this.props;
    const accountId = params.account_id;
    fetchPostSetsByST(accountId);
  }

  render() {
    const { query, showDeletePopup } = this.state;
    const { postSetsByST, currentAccount, params, location: { hash } } = this.props;
    if (postSetsByST.get('requesting') || !postSetsByST.get('data')) {
      return <Loading />;
    }

    const scheduledPostSets = this.filterPostSets(postSetsByST.getIn(['data', 'scheduled_post_sets']).toJS());
    const unscheduledPostSets = this.filterPostSets(postSetsByST.getIn(['data', 'unscheduled_post_sets']).toJS());

    // FIXME: The below can be used later
    // const postWhenReadyPostSets = postSetsByST.getIn(['data', 'post_when_ready_post_sets']).toJS();

    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : 0;
    return (
      <Wrapper className={postsetId ? 'modal-open' : ''}>
        <CalendarSidebar
          postSets={unscheduledPostSets}
          currentAccount={currentAccount}
          query={query}
          onSearch={this.handleSearch}
          onToggleFilter={this.handleToggleFilter}
          onDelete={this.handleDeleteEvent}
        />
        {/* <CalendarView
          postSetsByST={postSetsByST}
          currentAccount={currentAccount}
          query={query}
          filters={filters}
          onMoveEvent={this.handleMoveEvent}
          onDeleteEvent={this.handleDeleteEvent}
        />*/}
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
    fetchPostSetsByST: (accountId) => dispatch(fetchPostSetsBySTRequest(accountId)),
    updatePost: (post) => dispatch(updatePostRequest(post)),
    deletePostSet: (id) => dispatch(deletePostSetRequest(id)),
  }
);

const mapStateToProps = createStructuredSelector({
  postSetsByST: makeSelectPostSetsByST(),
  currentAccount: makeSelectCurrentAccount(),
});

export default UserCanPostSet(connect(mapStateToProps, mapDispatchToProps)(Calendar));
