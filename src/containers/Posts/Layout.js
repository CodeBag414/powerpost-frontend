import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { getClassesByPage } from 'utils/permissionClass';
import {
  fetchPostSetsBySTRequest,
  fetchPostSetsRequest,
} from 'containers/App/actions';

import {
  makeSelectPostSets,
  makeSelectPostSetsByST,
} from 'containers/App/selectors';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import PostSetBox from './PostSetBox';

class PostsLayout extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.map,
    postSetsByST: ImmutablePropTypes.map,
    fetchPostSets: PropTypes.func,
    fetchPostSetsByST: PropTypes.func,
    accountId: PropTypes.string,
    activeBrand: PropTypes.object,
    location: PropTypes.object,
  };

  state = {
    error: '',
    shareDialogVisible: false,
  };

  componentWillMount() {
    this.props.fetchPostSets();
    this.props.fetchPostSetsByST();
  }

  componentWillReceiveProps(nextProps) {
    const nextPostSetId = nextProps.location.hash.startsWith('#postset') ? nextProps.location.hash.split('-')[1] : 0;
    const postsetId = this.props.location.hash.startsWith('#postset') ? this.props.location.hash.split('-')[1] : 0;
    if (postsetId && !nextPostSetId) {
      this.props.fetchPostSets();
      this.props.fetchPostSetsByST();
    }
  }

  render() {
    const {
      postSets,
      postSetsByST,
      accountId,
      fetchPostSets,
      fetchPostSetsByST,
      activeBrand,
      location,
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

    const { permissions } = activeBrand.user_access;
    const permissionClasses = getClassesByPage(permissions, 'posts');

    return (
      <Wrapper>
        <PostSetBox
          postSets={postSets}
          postSetsByST={postSetsByST}
          accountId={accountId}
          fetchPostSets={fetchPostSets}
          fetchPostSetsByST={fetchPostSetsByST}
          permissionClasses={permissionClasses}
          location={location}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  postSetsByST: makeSelectPostSetsByST(),
});

const mapDispatchToProps = (dispatch) => (
  {
    fetchPostSetsByST: (accountId, payload) => dispatch(fetchPostSetsBySTRequest(accountId, payload)),
    fetchPostSets: (accountId, payload) => dispatch(fetchPostSetsRequest(accountId, payload)),
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(PostsLayout);
