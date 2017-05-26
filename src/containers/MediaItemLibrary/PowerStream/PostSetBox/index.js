import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Wrapper from './Wrapper';
import PostSetDetail from './PostSetDetail';
import PostSetList from './PostSetList';

class PostSetBox extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.list,
  }

  state = {
    currentPostSetIndex: 0,
  }

  render() {
    const { postSets } = this.props;
    const { currentPostSetIndex } = this.state;

    return (
      <Wrapper>
        <PostSetList postSets={postSets} />
        <PostSetDetail postSet={postSets.get(currentPostSetIndex)} />
      </Wrapper>
    );
  }
}

export default PostSetBox;
