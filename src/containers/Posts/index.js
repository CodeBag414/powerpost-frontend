/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectUserAccount,
} from 'containers/App/selectors';

import {
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import Layout from './Layout';

const PostsContainer = ({
  params: { account_id, stream_category, stream_id },
  userAccount, activeBrand,
}) => {
  if (!userAccount) {
    return null;
  }

  return (
    <Layout
      accountId={account_id}
      streamCategory={stream_category}
      streamId={stream_id}
      activeBrand={activeBrand}
    />
  );
};

PostsContainer.propTypes = {
  params: PropTypes.object,
  userAccount: PropTypes.object,
  activeBrand: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectUserAccount(),
  activeBrand: makeSelectCurrentAccount(),
});

export default connect(mapStateToProps)(PostsContainer);
