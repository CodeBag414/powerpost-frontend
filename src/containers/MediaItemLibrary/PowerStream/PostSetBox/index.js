import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';

import ErrorWrapper from '../ErrorWrapper';

import Wrapper from './Wrapper';
import PostSetDetail from './PostSetDetail';
import PostSetList from './PostSetList';

class PostSetBox extends Component {
  static propTypes = {
    owned: PropTypes.bool,
    postSet: ImmutablePropTypes.map,
    postSets: ImmutablePropTypes.list,
    streamName: PropTypes.string,
    fetchingPostSets: PropTypes.bool,
    fetchPostSet: PropTypes.func,
    handlePostSet: PropTypes.func,
    permissionClasses: PropTypes.object,
    location: PropTypes.object,
  }

  state = {
    currentPostSetIndex: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      if (!nextProps.postSets.isEmpty()) {
        nextProps.fetchPostSet(
          { id: nextProps.postSets.get(this.state.currentPostSetIndex).get('post_set_id') }
        );
      }
    }
    if (this.props.fetchingPostSets && !nextProps.fetchingPostSets && !nextProps.postSets.isEmpty()) {
      this.handleSelectPostSet(this.state.currentPostSetIndex, nextProps);
    }
  }

  handleSelectPostSet = (index, props = this.props) => {
    const { postSets, fetchPostSet } = props;

    fetchPostSet({
      id: postSets.get(index).get('post_set_id'),
    });
    this.setState({
      currentPostSetIndex: index,
    });
  }

  render() {
    const { owned, postSet, postSets, streamName, handlePostSet, permissionClasses } = this.props;
    const { currentPostSetIndex } = this.state;
    const mediaItems = postSet.getIn(['data', 'media_items']) || [];

    if (postSets.isEmpty()) {
      return (
        <Wrapper>
          <ErrorWrapper>
            No posts have been added to this stream.
          </ErrorWrapper>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <PostSetList
          postSets={postSets}
          streamName={streamName}
          currentPostSetIndex={currentPostSetIndex}
          handleSelectPostSet={this.handleSelectPostSet}
        />
        <PostSetDetail
          owned={owned}
          mediaItems={mediaItems}
          postSet={postSet.get('processing') ?
            postSets.get(currentPostSetIndex) : postSet.get('data')}
          handlePostSet={handlePostSet}
          permissionClasses={permissionClasses}
        />
      </Wrapper>
    );
  }
}

export default withRouter(PostSetBox);
