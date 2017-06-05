import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import {
  createPostSetRequest,
} from 'containers/App/actions';
import {
  makeSelectPostSet,
} from 'containers/App/selectors';
import Loading from 'components/Loading';

import {
  getPostSets,
} from './actions';
import {
  makeSelectPostSets,
} from './selectors';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetBox from './PostSetBox';

class PublishedPostsLayout extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.map,
    // postSet: ImmutablePropTypes.map,
    fetchPostSets: PropTypes.func,  // eslint-disable-line
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

    if (postSets.get('isFetching')) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <PostSetBox
          postSets={postSets}
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

const mapDispatchToProps = {
  fetchPostSets: getPostSets,
  createPostSet: createPostSetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCanAccount(PublishedPostsLayout));
