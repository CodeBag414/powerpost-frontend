import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { browserHistory } from 'react-router';
import { find } from 'lodash';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import Loading from 'components/Loading';

import {
  fetchStreamPostSetsRequest,
} from '../actions';
import {
  makeSelectPostSets,
} from '../selectors';

import Wrapper from './Wrapper';
import TabBar from './TabBar';
import PostSetBox from './PostSetBox';

class PowerStreamLayout extends Component {
  static propTypes = {
    accountId: PropTypes.string,
    streamCategory: PropTypes.string,
    streamId: PropTypes.string,
    userAccount: PropTypes.object,
    postSets: ImmutablePropTypes.list,
    fetchStreamPostSets: PropTypes.func,  // eslint-disable-line
  }

  componentWillMount() {
    this.changeStreamLink(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.streamId !== nextProps.streamId) {
      this.changeStreamLink(nextProps);
    }
  }

  changeStreamLink({ userAccount, accountId, streamCategory, streamId, fetchStreamPostSets }) {
    let newStreamId = streamId;

    if (!streamId) {
      if (streamCategory === 'owned') {
        newStreamId = userAccount.account_streams[0].stream_id;
      } else {
        newStreamId = userAccount.shared_streams[0].stream_id;
      }
      browserHistory.push(`/account/${accountId}/library/shared_streams/${streamCategory}/${newStreamId}`);
    }
    fetchStreamPostSets(newStreamId, {
      query_by: 'stream_id',
    });
  }

  render() {
    const {
      postSets,
      userAccount,
      accountId,
      streamCategory,
      streamId,
    } = this.props;

    if (postSets.get('isFetching')) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    }

    const owned = streamCategory === 'owned';
    const streams = owned ?
      userAccount.account_streams : userAccount.shared_streams;

    const tabs = streams.map((s) => ({
      label: s.title,
      link: `/account/${accountId}/library/shared_streams/${streamCategory}/${s.stream_id}`,
    }));
    const currentStream = find(streams, { stream_id: streamId });
    const streamName = (currentStream || {}).title;

    return (
      <Wrapper>
        <TabBar
          owned={owned}
          tabs={tabs}
        />
        <PostSetBox
          owned={owned}
          postSets={postSets.get('data')}
          streamName={streamName}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
});

const mapDispatchToProps = {
  fetchStreamPostSets: fetchStreamPostSetsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCanAccount(PowerStreamLayout));
