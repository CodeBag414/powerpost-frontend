import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
  fetchPostSetsRequest,
  createPostSetRequest,
} from 'containers/App/actions';
import {
  makeSelectPostSets,
  makeSelectPostSet,
} from 'containers/App/selectors';
import Loading from 'components/Loading';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetBox from './PostSetBox';

class PublishedPostsLayout extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.map,
    fetchPostSets: PropTypes.func,
    createPostSet: PropTypes.func,
  }

  state = {
    error: '',
    shareDialogVisible: false,
  }

  componentWillMount() {
    this.props.fetchPostSets();
  }

  /* componentWillReceiveProps(nextProps) {
    if (this.props.postSet !== nextProps.postSet &&
      !nextProps.postSet.get('processing')) {
      if (nextProps.postSet.get('error')) {
        toastr.error('The post has not been deleted from the stream.');
      } else {
        toastr.success('Success', 'The post has been deleted from the stream');
      }
    }
  } */

  render() {
    const {
      postSets,
      createPostSet,
    } = this.props;
    const {
      error,
    } = this.state;

    if (error) {
      return (
        <Wrapper>
          <ErrorWrapper>
            { error }
          </ErrorWrapper>
        </Wrapper>
      );
    }
    if (postSets.get('requesting')) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    }

    const postSetsFiltered = postSets.getIn(['data', 'post_sets']).sort((a, b) => b.get('creation_time') - a.get('creation_time')).slice(0, 50);

    return (
      <Wrapper>
        <PostSetBox
          postSets={postSetsFiltered}
          createPostSet={createPostSet}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  postSet: makeSelectPostSet(),
});

const mapDispatchToProps = (dispatch) => (
  {
    createPostSet: () => dispatch(createPostSetRequest()),
    fetchPostSets: () => dispatch(fetchPostSetsRequest()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PublishedPostsLayout);
