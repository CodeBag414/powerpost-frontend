import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ErrorWrapper from '../ErrorWrapper';

import Wrapper from './Wrapper';
import PostSetDetail from './PostSetDetail';
import PostSetList from './PostSetList';

class PostSetBox extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.list,
    createPostSet: PropTypes.func,
  }

  state = {
    currentPostSetIndex: 0,
  }

  handleSelectPostSet = (index) => {
    this.setState({
      currentPostSetIndex: index,
    });
  }

  addPostsIdea = (postSet, edit) => {
    const { createPostSet } = this.props;
    const newPostSet = {
      ...postSet.toJS(),
      status: '6',
      type: postSet.toJS().post_type,
    };
    delete newPostSet.id;
    delete newPostSet.creation_time;
    delete newPostSet.sort_order;
    delete newPostSet.post_type;
    createPostSet(newPostSet, edit);
  }

  render() {
    const { postSets } = this.props;
    const { currentPostSetIndex } = this.state;
    if (postSets.isEmpty()) {
      return (
        <Wrapper>
          <ErrorWrapper>
            No posts have been published yet.
          </ErrorWrapper>
        </Wrapper>
      );
    }
    const currentPostSet = postSets.get(currentPostSetIndex);
    return (
      <Wrapper>
        <PostSetList
          postSets={postSets}
          currentPostSetIndex={currentPostSetIndex}
          handleSelectPostSet={this.handleSelectPostSet}
        />
        <PostSetDetail
          postSet={currentPostSet}
          addPostsIdea={() => this.addPostsIdea(currentPostSet, false)}
          addPostsAndEdit={() => this.addPostsIdea(currentPostSet)}
        />
      </Wrapper>
    );
  }
}

export default PostSetBox;
