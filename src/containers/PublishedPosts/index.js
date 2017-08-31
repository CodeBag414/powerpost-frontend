/* eslint-disable camelcase */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  fetchPostSetsRequest,
  createPostSetRequest,
} from 'containers/App/actions';

import {
  makeSelectPostSets,
  makeSelectUserAccount,
} from 'containers/App/selectors';

import Layout from './Layout';

class PublishedPostsContainer extends Component {
  static propTypes = {
    postSets: ImmutablePropTypes.map,
    fetchPostSets: PropTypes.func,
    createPostSet: PropTypes.func,
  }

  render() {
    const {
      params: { account_id, stream_category, stream_id },
      userAccount,
      postSets,
      fetchPostSets,
      createPostSet,
    } = this.props;

    if (!userAccount) {
      return null;
    }

    return (
      <Layout
        accountId={account_id}
        streamCategory={stream_category}
        streamId={stream_id}
        userAccount={userAccount}
        postSets={postSets}
        fetchPostSets={fetchPostSets}
        createPostSet={createPostSet}
      />
    );
  }
}

PublishedPostsContainer.propTypes = {
  params: PropTypes.object,
  userAccount: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  userAccount: makeSelectUserAccount(),
});

const mapDispatchToProps = (dispatch) => (
  {
    createPostSet: (postSet, editing) => dispatch(createPostSetRequest(postSet, editing)),
    fetchPostSets: () => dispatch(fetchPostSetsRequest()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PublishedPostsContainer);
