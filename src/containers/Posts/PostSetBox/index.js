import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Dropdown from 'elements/atm.Dropdown';
import PostEditor from 'containers/PostEditor';
import Loading from 'components/Loading';
import ErrorWrapper from '../ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetList from './PostSetList';
import StatusSelector from './StatusSelector';

const sortByOptions = [
  {
    value: 'creation_time',
    label: 'Creation Time',
  },
  {
    value: 'schedule_time',
    label: 'Schedule Time',
  },
];

class PostSetBox extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.map,
    accountId: PropTypes.string,
    fetchPostSets: PropTypes.func,
    fetchPostSetsByST: PropTypes.func,
  }

  state = {
    currentPostSetIndex: 0,
    currentPostStatus: 3,
    searchText: null,
    sortBy: sortByOptions[0],
  }

  onSearch = (searchText) => {
    this.setState({ searchText, currentPostSetIndex: 0 });
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
    const { fetchPostSets, fetchPostSetsByST } = this.props;
    if (sortBy.value === 'schedule_time') {
      fetchPostSetsByST();
    } else {
      fetchPostSets();
    }
    this.setState({ sortBy });
  }

  filterPostSets = (postSets) => {
    const { searchText } = this.state;
    if (!searchText) return postSets;
    const queryLowerCase = searchText.toLowerCase();
    return postSets.map((postSet) => {
      const titleMatch = (postSet.get('title') && postSet.get('title').toLowerCase().indexOf(queryLowerCase) !== -1);
      let tagsMatch = false;
      if (postSet.get('tags')) {
        for (let i = 0; i < postSet.get('tags').size; i += 1) {
          const tag = postSet.getIn(['tags', i]).toLowerCase();
          if (tag.indexOf(queryLowerCase) !== -1) {
            tagsMatch = true;
            break;
          }
        }
      }
      if ((titleMatch || tagsMatch)) {
        return postSet;
      }
      return null;
    }).filter((postSet) => postSet);
  }

  render() {
    let { postSets } = this.props;
    const { accountId } = this.props;
    const { currentPostSetIndex, currentPostStatus, searchText, sortBy } = this.state;
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
        />
        <div className="filter-wrapper">
          <div className="sort_input">
            <Dropdown
              value={sortBy}
              options={sortByOptions}
              placeholder="Sort By"
              onChange={this.handleSortByChange}
            />
          </div>
          <div className="search-input">
            <input placeholder="Search Title and Tags" value={searchText} onChange={(e) => this.onSearch(e.target.value)} />
            <i className="fa fa-search" />
          </div>
        </div>
      </div>
    );
    if (postSets.get('requesting')) {
      return (
        <Wrapper>
          {heading}
          <ErrorWrapper>
            <Loading />
          </ErrorWrapper>
        </Wrapper>
      );
    }
    if (sortBy.value === 'schedule_time') {
      const postSetsByScheduleTime = postSets.get('data');
      if (!postSetsByScheduleTime.get('post_when_ready_post_sets')) {
        return (
          <Wrapper>
            {heading}
            <ErrorWrapper>
              <Loading />
            </ErrorWrapper>
          </Wrapper>
        );
      }
      postSets = postSetsByScheduleTime.get('post_when_ready_post_sets')
        .concat(postSetsByScheduleTime.get('scheduled_post_sets'))
        .concat(postSetsByScheduleTime.get('unscheduled_post_sets'));
    } else {
      postSets = postSets.getIn(['data', 'post_sets']);
    }
    if (!postSets || postSets.isEmpty()) {
      return (
        <Wrapper>
          {heading}
          <ErrorWrapper>
            No posts.
          </ErrorWrapper>
        </Wrapper>
      );
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
    return (
      <Wrapper>
        {heading}
        <div className="posts-content">
          <div className="post-list-container">
            <PostSetList
              postSets={generatedPostSets}
              currentPostSetIndex={currentPostSetIndex}
              handleSelectPostSet={this.handleSelectPostSet}
              time={sortBy.value}
            />
          </div>
          <div className="post-editor-container">
            { postsetId ? <PostEditor id={postsetId} accountId={accountId} modal={false} /> : null}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default PostSetBox;
