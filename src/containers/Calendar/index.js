import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { UserCanPostSet } from 'config.routes/UserRoutePermissions';
import { getClassesByPage } from 'utils/permissionClass';
import {
  deletePostSetRequest,
  fetchPostSetsBySTRequest,
  updateBunchPostRequest,
} from 'containers/App/actions';

import {
  makeSelectPostSets,
  makeSelectUserAccount,
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
    updateBunchPost: PropTypes.func,
    deletePostSet: PropTypes.func,
    postSetsByST: PropTypes.any,
    currentAccount: PropTypes.object,
    params: PropTypes.shape({
      account_id: PropTypes.string,
    }),
    userAccount: PropTypes.object,
  };

  state = {
    query: '',
    filters: [true, true, true, true, true, true, true],
    showDeletePopup: false,
  };

  componentWillMount() {
    this.loadPostSetsByST(moment());
  }

  componentWillReceiveProps(nextProps) {
    const nextPostSetId = nextProps.location.hash.startsWith('#postset') ? nextProps.location.hash.split('-')[1] : 0;
    const postsetId = this.props.location.hash.startsWith('#postset') ? this.props.location.hash.split('-')[1] : 0;
    if (postsetId && !nextPostSetId) {
      this.loadPostSetsByST(moment());
    }
  }

  onDeletePostSet = () => {
    const { deletePostSet, updateBunchPost } = this.props;
    const { postSetToDelete } = this.state;

    let id = null;

    if (postSetToDelete.posts.length === 0) { // Meaning the postSet is unscheduled
      id = postSetToDelete.post_set_id;
    } else {
      const postsToDelete = postSetToDelete.posts.map((post) => ({
        ...post,
        status: 0,
      }));
      updateBunchPost(postsToDelete, postSetToDelete);
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
    const { postSet } = event;
    const { updateBunchPost } = this.props;
    const scheduleTime = moment(start).format('X');
    /* eslint-disable no-alert */
    if (moment().diff(moment.unix(postSet.schedule_time)) > 0) { // If the dragged post is in the past
      alert('You cannot reschedule a past event.');
      return;
    } else if (moment().diff(moment(start)) > 0) {
      alert('You cannot schedule a post in the past.');
      return;
    }
    const postsToUpdate = postSet.posts.map((post) => ({
      ...post,
      schedule_time: scheduleTime,
    }));

    updateBunchPost(postsToUpdate, postSet);
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

  loadPostSetsByST = (date) => {
    const { params } = this.props;
    const startDate = moment(date);
    startDate.set('date', 1);
    startDate.subtract((startDate.day() % 7), 'day');
    const endDate = moment(startDate);
    endDate.add(42, 'day');
    this.props.fetchPostSetsByST(params.account_id, {
      start_time: startDate.unix(),
      end_time: endDate.unix(),
    });
  }

  render() {
    const { query, showDeletePopup } = this.state;
    const { postSetsByST, currentAccount, params, location: { hash }, userAccount } = this.props;
    let scheduledPostSets = [];
    let unscheduledPostSets = [];
    let loading = false;
    if (postSetsByST.getIn(['data', 'scheduled_post_sets'])) {
      scheduledPostSets = this.filterPostSets(postSetsByST.getIn(['data', 'scheduled_post_sets']).toJS());
      unscheduledPostSets = this.filterPostSets(postSetsByST.getIn(['data', 'unscheduled_post_sets']).toJS());
    }
    if (postSetsByST.get('requesting')) {
      loading = true;
    }
    // FIXME: The below can be used later
    // const postWhenReadyPostSets = postSetsByST.getIn(['data', 'post_when_ready_post_sets']).toJS();

    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : 0;
    const { permissions } = userAccount.user_access;
    const permissionClasses = getClassesByPage(permissions, 'calendar');
    return (
      <Wrapper className={`${postsetId ? 'modal-open' : ''} ${loading ? 'disabled' : ''}`}>
        <CalendarSidebar
          postSets={unscheduledPostSets}
          currentAccount={currentAccount}
          query={query}
          onSearch={this.handleSearch}
          onToggleFilter={this.handleToggleFilter}
          onDelete={this.handleDeleteEvent}
          permissionClasses={permissionClasses}
        />
        <CalendarView
          postSets={scheduledPostSets}
          currentAccount={currentAccount}
          onMoveEvent={this.handleMoveEvent}
          onDeleteEvent={this.handleDeleteEvent}
          onDateChange={this.loadPostSetsByST}
          permissionClasses={permissionClasses}
        />
        <DeletePostSetDialog
          active={showDeletePopup}
          handleDialogToggle={this.hideDeletePopup}
          deletePostSet={this.onDeletePostSet}
        />
        {loading ? <Loading opacity={0.5} showIndicator={!postSetsByST.get('data')} /> : null}
        <div className="post-editor">
          { postsetId ? <PostEditor id={postsetId} accountId={params.account_id} /> : null}
        </div>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    fetchPostSetsByST: (accountId, payload) => dispatch(fetchPostSetsBySTRequest(accountId, payload)),
    updateBunchPost: (posts, postSet) => dispatch(updateBunchPostRequest(posts, postSet)),
    deletePostSet: (id) => dispatch(deletePostSetRequest(id)),
  }
);

const mapStateToProps = createStructuredSelector({
  postSetsByST: makeSelectPostSets(),
  currentAccount: makeSelectCurrentAccount(),
  userAccount: makeSelectUserAccount(),
});

export default UserCanPostSet(connect(mapStateToProps, mapDispatchToProps)(Calendar));
