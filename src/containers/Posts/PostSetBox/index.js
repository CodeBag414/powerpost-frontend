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
  }

  changePostStatus = (status) => {
    this.setState({ currentPostStatus: status });
  }

  handleSelectPostSet = (index) => {
    this.setState({
      currentPostSetIndex: index,
    });
  }

  render() {
    const { postSets, accountId } = this.props;
    const { currentPostSetIndex, currentPostStatus } = this.state;
    if (postSets.isEmpty()) {
      return (
        <Wrapper>
          <ErrorWrapper>
            No posts.
          </ErrorWrapper>
        </Wrapper>
      );
    }
    const filteredPostSets = postSets.filter((postSet) => parseInt(postSet.get('status'), 10) === parseInt(currentPostStatus, 10));
    const postsetId = filteredPostSets.getIn([currentPostSetIndex, 'post_set_id']);
    const statuses = [
      { status: 3, statusColor: '#ABE66A', name: 'Ready' },
      { status: 5, statusColor: '#B171B5', name: 'Review' },
      { status: 2, statusColor: '#67C5E6', name: 'Draft' },
      { status: 6, statusColor: '#ACB5B8', name: 'Idea' },
    ];
    statuses.forEach((status, index) =>
      (statuses[index].size = postSets.filter((postSet) =>
        parseInt(postSet.get('status'), 10) === parseInt(status.status, 10)).size
      ));
    return (
      <Wrapper>
        <div className="post-list-container">
          <StatusSelector
            activeStatus={currentPostStatus}
            onChange={this.changePostStatus}
            statuses={statuses}
          />
          <PostSetList
            postSets={filteredPostSets}
            currentPostSetIndex={currentPostSetIndex}
            handleSelectPostSet={this.handleSelectPostSet}
          />
        </div>
        <div className="post-editor-container">
          { postsetId ? <PostEditor id={postsetId} accountId={accountId} modal={false} /> : null}
        </div>
      </Wrapper>
    );
  }
}

export default PostSetBox;
