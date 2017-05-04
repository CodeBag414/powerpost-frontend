import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanPostSet } from 'config.routes/UserRoutePermissions';

import Wrapper from './Wrapper';
import CalendarSidebar from './CalendarSidebar';
import CalendarView from './CalendarView';

import {
  fetchPosts,
} from './actions';

import {
  makeSelectPosts,
} from './selectors';

/**
 * Calendar component for posts
 */
class Calendar extends React.Component {

  static propTypes = {
    location: PropTypes.object,
    getPosts: PropTypes.func,
    posts: PropTypes.array,
  };

  state = {
    query: '',
    filters: [true, true, true, true, true, true, true],
  };

  componentDidMount() {
    this.fetchPosts(this.props);
  }

  componentWillReceiveProps(props) {
    if (this.props.location !== props.location) {
      this.fetchPosts(props);
    }
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

  render() {
    const { query, filters } = this.state;
    const { posts } = this.props;
    if (posts == null || posts.length === 0 || !Array.isArray(posts)) return null;
    return (
      <Wrapper>
        <CalendarSidebar
          posts={posts}
          query={query}
          onSearch={this.handleSearch}
          onToggleFilter={this.handleToggleFilter}
        />
        <CalendarView
          posts={posts}
          query={query}
          filters={filters}
        />
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getPosts: (accountId) => dispatch(fetchPosts(accountId)),
  }
);

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
});

export default UserCanPostSet(connect(mapStateToProps, mapDispatchToProps)(Calendar));
