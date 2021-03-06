/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserCanSharedStreams } from 'config.routes/UserRoutePermissions';

import {
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import Layout from './Layout';

const PowerStreamContainer = ({
  params: { account_id, stream_category, stream_id },
  location: { hash },
  userAccount,
}) => {
  if (!userAccount) {
    return null;
  }
  return (
    <Layout
      hash={hash}
      accountId={account_id}
      streamCategory={stream_category}
      streamId={stream_id}
      userAccount={userAccount}
    />
  );
};

PowerStreamContainer.propTypes = {
  params: PropTypes.object,
  userAccount: PropTypes.object,
  location: PropTypes.shape({
    hash: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectCurrentAccount(),
});

export default UserCanSharedStreams(connect(mapStateToProps)(PowerStreamContainer));
