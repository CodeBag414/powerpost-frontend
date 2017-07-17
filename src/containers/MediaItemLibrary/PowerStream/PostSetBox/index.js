import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
    fetchPostSet: PropTypes.func,
    handlePostSet: PropTypes.func,
    permissionClasses: PropTypes.object,
  }

  state = {
    currentPostSetIndex: 0,
  }

  handleSelectPostSet = (index) => {
    const { postSets, fetchPostSet } = this.props;

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

export default PostSetBox;
