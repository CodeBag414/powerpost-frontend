import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Wrapper from './Wrapper';
import PostSetDetail from './PostSetDetail';
import PostSetList from './PostSetList';

class PostSetBox extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.list,
    streamName: PropTypes.string,
  }

  state = {
    currentPostSetIndex: 0,
  }

  handleSelectPostSet = (index) => {
    this.setState({
      currentPostSetIndex: index,
    });
  }

  render() {
    const { postSets, streamName } = this.props;
    const { currentPostSetIndex } = this.state;

    return (
      <Wrapper>
        <PostSetList
          postSets={postSets}
          streamName={streamName}
          currentPostSetIndex={currentPostSetIndex}
          handleSelectPostSet={this.handleSelectPostSet}
        />
        <PostSetDetail
          postSet={postSets.get(currentPostSetIndex)}
        />
      </Wrapper>
    );
  }
}

export default PostSetBox;
