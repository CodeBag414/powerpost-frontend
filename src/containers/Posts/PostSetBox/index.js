import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import PostEditor from 'containers/PostEditor';
import ErrorWrapper from '../ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetList from './PostSetList';
import StatusSelector from './StatusSelector';

class PostSetBox extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.list,
    accountId: PropTypes.string,
  }

  state = {
    currentPostSetIndex: 0,
    currentPostStatus: 3,
    searchText: null,
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
    const { postSets, accountId } = this.props;
    const { currentPostSetIndex, currentPostStatus, searchText } = this.state;
    if (postSets.isEmpty()) {
      return (
        <Wrapper>
          <ErrorWrapper>
            No posts.
          </ErrorWrapper>
        </Wrapper>
      );
    }
    const filteredPostSets = this.filterPostSets(postSets);
    const generatedPostSets = filteredPostSets
      .filter((postSet) => parseInt(postSet.get('status'), 10) === parseInt(currentPostStatus, 10))
      .sort((a, b) => b.get('creation_time') - a.get('creation_time'));
    const postsetId = generatedPostSets.getIn([currentPostSetIndex, 'post_set_id']);
    const statuses = [
      { status: 3, statusColor: '#ABE66A', name: 'Ready' },
      { status: 5, statusColor: '#B171B5', name: 'Review' },
      { status: 2, statusColor: '#67C5E6', name: 'Draft' },
      { status: 6, statusColor: '#ACB5B8', name: 'Idea' },
    ];
    statuses.forEach((status, index) =>
      (statuses[index].size = filteredPostSets.filter((postSet) =>
        parseInt(postSet.get('status'), 10) === parseInt(status.status, 10)).size
      ));
    return (
      <Wrapper>
        <div className="posts-heading">
          <StatusSelector
            activeStatus={currentPostStatus}
            onChange={this.changePostStatus}
            statuses={statuses}
          />
          <div className="search-input">
            <input placeholder="Search Title and Tags" value={searchText} onChange={(e) => this.onSearch(e.target.value)} />
            <i className="fa fa-search" />
          </div>
        </div>
        <div className="posts-content">
          <div className="post-list-container">
            <PostSetList
              postSets={generatedPostSets}
              currentPostSetIndex={currentPostSetIndex}
              handleSelectPostSet={this.handleSelectPostSet}
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
