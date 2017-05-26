import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { browserHistory } from 'react-router';

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
    fetchStreamPostSets: PropTypes.func,
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

  render() {   // streamId is ensured to be given
    const {
      postSets,
      userAccount,
      accountId,
      streamCategory,
    } = this.props;

    if (postSets.get('isFetching')) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    }

    const streams = streamCategory === 'owned' ?
      userAccount.account_streams : userAccount.shared_streams;

    const tabs = streams.map((s) => ({
      label: s.title,
      link: `/account/${accountId}/library/shared_streams/${streamCategory}/${s.stream_id}`,
    }));

    return (
      <Wrapper>
        <TabBar tabs={tabs} />
        <PostSetBox postSets={postSets.get('data')} />
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
