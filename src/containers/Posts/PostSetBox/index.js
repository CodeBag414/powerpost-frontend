
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import PostEditor from 'containers/PostEditor';
import Loading from 'components/Loading';
import DateRangePicker from 'components/DateRangePicker';
import MinorTabbar from 'components/MinorTabbar';
import Dropdown from 'elements/atm.Dropdown';

import ErrorWrapper from '../ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetList from './PostSetList';
import StatusSelector from './StatusSelector';

const sortByOptions = [
  {
    value: 'schedule_time',
    label: 'Schedule Time',
  },
  {
    value: 'creation_time',
    label: 'Creation Time',
  },
];

const filterByOptions = [
  { value: '*', label: 'All' },
  { value: 'scheduled_post_sets', label: 'Scheduled' },
  { value: 'unscheduled_post_sets', label: 'Unscheduled' },
  { value: 'post_when_ready_post_sets', label: 'Post Immediately' },
];

class PostSetBox extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.map,
    accountId: PropTypes.string,
    fetchPostSets: PropTypes.func,
    fetchPostSetsByST: PropTypes.func,
    permissionClasses: PropTypes.object,
  }

  state = {
    currentPostSetIndex: 0,
    currentPostStatus: 3,
    searchText: null,
    sortBy: sortByOptions[0],
    startDate: moment(0),
    endDate: moment().endOf('day'),
    searchVisible: false,
    scheduleFilterBy: filterByOptions[0].value,
  }

  onSearch = (searchText) => {
    this.setState({ searchText, currentPostSetIndex: 0 });
  }

  onChangeScheduledPostFilter = (value) => {
    this.setState({ scheduleFilterBy: value });
  }

  changePostStatus = (status) => {
    this.setState({ currentPostStatus: status, currentPostSetIndex: 0 });
  }

  handleSelectPostSet = (index) => {
    this.setState({
      currentPostSetIndex: index,
    });
  }

  handleSortByChange = (sortBy) => {
    if (this.state.sortBy.value === sortBy.value) return;
    const { fetchPostSets, fetchPostSetsByST, accountId } = this.props;
    const { startDate, endDate } = this.state;
    if (sortBy.value === 'schedule_time') {
      fetchPostSetsByST(accountId, {
        start_time: startDate.unix(),
        end_time: endDate.unix(),
      });
    } else {
      fetchPostSets(accountId, {
        start_time: startDate.unix(),
        end_time: endDate.unix(),
      });
    }
    this.setState({ sortBy, scheduleFilterBy: filterByOptions[0].value });
  }

  handleDateRange = ({ startDate, endDate }) => {
    if (this.state.startDate.unix() === startDate.unix() && this.state.endDate.unix() === endDate.unix()) return;
    const { sortBy } = this.state;
    const { fetchPostSets, fetchPostSetsByST, accountId } = this.props;
    if (sortBy.value === 'schedule_time') {
      fetchPostSetsByST(accountId, {
        start_time: startDate.unix(),
        end_time: endDate.unix(),
      });
    } else {
      fetchPostSets(accountId, {
        start_time: startDate.unix(),
        end_time: endDate.unix(),
      });
    }
    this.setState({ startDate, endDate });
  }

  filterPostSets = (postSets) => {
    const { searchText } = this.state;
    if (!searchText) return postSets;
    const queryLowerCase = searchText.toLowerCase();
    return postSets.map((postSet) => {
      const titleMatch = (postSet.get('title') && postSet.get('title').toLowerCase().indexOf(queryLowerCase) !== -1);
      let tagsMatch = false;
      if (postSet.get('tags')) {
        const tags = postSet.get('tags').toJS();
        Object.keys(tags).some((key) => {
          const tagString = tags[key];
          if (tagString.indexOf(queryLowerCase) !== -1) {
            tagsMatch = true;
            return true;
          }
          return false;
        });
      }
      if ((titleMatch || tagsMatch)) {
        return postSet;
      }
      return null;
    }).filter((postSet) => postSet);
  }

  loadPostSet = (v) => {
    if (v === false) {
      setTimeout(() => this.setState({ isLoadingPostSet: false }), 1000);
    } else {
      this.setState({ isLoadingPostSet: true });
    }
  }

  toggleSearch = () => {
    this.setState({
      searchVisible: !this.state.searchVisible,
    });
  }

  render() {
    let { postSets } = this.props;
    const { accountId, permissionClasses } = this.props;
    const {
      currentPostSetIndex,
      currentPostStatus,
      searchText,
      sortBy,
      startDate,
      endDate,
      searchVisible,
      isLoadingPostSet,
      scheduleFilterBy,
    } = this.state;
    const statuses = [
      { status: 3, statusColor: '#ABE66A', name: 'Ready' },
      { status: 5, statusColor: '#B171B5', name: 'Review' },
      { status: 2, statusColor: '#67C5E6', name: 'Draft' },
      { status: 6, statusColor: '#ACB5B8', name: 'Idea' },
    ];
    const heading = (
      <div className="posts-heading">
        <StatusSelector
          activeStatus={currentPostStatus}
          onChange={this.changePostStatus}
          statuses={statuses}
          permissionClasses={permissionClasses}
        />
        <div className="filter-wrapper">
          <DateRangePicker onChange={this.handleDateRange} startDate={startDate} endDate={endDate}>
            <div>Click Me To Open Picker!</div>
          </DateRangePicker>
          <div className="sort_input">
            <Dropdown
              value={sortBy}
              options={sortByOptions}
              placeholder="Sort By"
              onChange={this.handleSortByChange}
            />
          </div>
          <div className="search-input">
            <i className="fa fa-search" onClick={this.toggleSearch} />
            <div className={searchVisible ? '' : 'inactive'}>
              <input
                placeholder="Search Title and Tags"
                value={searchText}
                onChange={(e) => this.onSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );

    const loadingWrapper = (
      <Wrapper>
        {heading}
        <ErrorWrapper>
          <Loading />
        </ErrorWrapper>
      </Wrapper>
    );
    const noPostsWrapper = (
      <Wrapper>
        {heading}
        <ErrorWrapper>
          No posts.
        </ErrorWrapper>
      </Wrapper>
    );
    let loading = false;
    if (postSets.get('requesting')) {
      loading = true;
    }
    if (loading && !postSets.get('data')) {
      return loadingWrapper;
    }
    if (sortBy.value === 'schedule_time') {
      const postSetsByScheduleTime = postSets.get('data');
      if (!postSetsByScheduleTime.get('post_when_ready_post_sets')) {
        return loadingWrapper;
      }
      if (postSetsByScheduleTime.get(scheduleFilterBy)) {
        postSets = postSetsByScheduleTime.get(scheduleFilterBy);
      } else {
        postSets = postSetsByScheduleTime.get('post_when_ready_post_sets')
          .concat(postSetsByScheduleTime.get('scheduled_post_sets'))
          .concat(postSetsByScheduleTime.get('unscheduled_post_sets'));
      }
    } else {
      postSets = postSets.getIn(['data', 'post_sets']);
    }
    if (sortBy.value !== 'schedule_time' && (!postSets || postSets.isEmpty())) {
      return noPostsWrapper;
    }
    const filteredPostSets = this.filterPostSets(postSets);
    const generatedPostSets = filteredPostSets
      .filter((postSet) => parseInt(postSet.get('status'), 10) === parseInt(currentPostStatus, 10))
      .sort((a, b) => b.get(sortBy.value, 0) - a.get(sortBy.value, 0));
    const postsetId = generatedPostSets.getIn([currentPostSetIndex, 'post_set_id']);
    statuses.forEach((status, index) =>
      (statuses[index].size = filteredPostSets.filter((postSet) =>
        parseInt(postSet.get('status'), 10) === parseInt(status.status, 10)).size
      ));
    if (sortBy.value !== 'schedule_time' && (!generatedPostSets || generatedPostSets.isEmpty())) {
      return noPostsWrapper;
    }

    return (
      <Wrapper>
        {heading}
        <div className="posts-content">
          <div className="post-list-container">
            { sortBy.value === 'schedule_time' && (
              <MinorTabbar
                tabs={filterByOptions}
                onChange={this.onChangeScheduledPostFilter}
                currentTab={scheduleFilterBy}
              />
            ) }
            <PostSetList
              postSets={generatedPostSets}
              currentPostSetIndex={currentPostSetIndex}
              handleSelectPostSet={this.handleSelectPostSet}
              time={sortBy.value}
              isLoadingPostSet={isLoadingPostSet}
            />
          </div>
          <div className="post-editor-container">
            {isLoadingPostSet && <Loading opacity={0.5} showIndicator zIndex={100000} />}
            { postsetId ?
              <PostEditor
                id={postsetId}
                accountId={accountId}
                modal={false}
                loadPostSet={this.loadPostSet}
              />
            : null}
          </div>
          {loading ? <Loading opacity={0.5} showIndicator={false} /> : null}
        </div>
      </Wrapper>
    );
  }
}

export default PostSetBox;
