/*
 * Account Dashboard
 *
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import {
  fetchMediaItems,
  fetchPostSetsBySTRequest,
} from 'containers/App/actions';
import { makeSelectPostSets, makeSelectMediaItems } from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import {
  fetchStatusCountRequest,
  fetchPostSetsRequest,
} from './actions';
import {
  selectStatusCount,
  selectPostSets,
} from './selectors';

import Wrapper from './Wrapper';
import Header from './Header';
import BodyWrapper from './BodyWrapper';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import StatusBoards from './StatusBoards';
import Calendar from './Calendar';
import Posts from './Posts';
import ContentHub from './ContentHub';

class AccountDashboard extends Component {

  state = {
    accountId: this.props.params.account_id,
    upcomingPosts: List(),
    lastestMediaItems: List(),
    statusData: {
      readyPostSets: 0,
      inReviewPostSets: 0,
      draftPostSets: 0,
      ideaPostSets: 0,
    },
    reviewPosts: List(),
    draftPosts: List(),
  };

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
    this.props.fetchPostSets(this.props.params.account_id);
    this.props.fetchPostSetsByST(this.props.params.account_id);
    this.props.fetchStatusCount(this.props.params.account_id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.accountId !== nextProps.params.account_id) {
      this.setState({ accountId: nextProps.params.account_id }, () => {
        this.props.getMediaItems(nextProps.params.account_id);
        this.props.fetchPostSetsByST(nextProps.params.account_id);
        this.props.fetchStatusCount(nextProps.params.account_id);
      });
    }

    if (this.props.statusCount !== nextProps.statusCount) {
      this.filterBoardStatus(nextProps.statusCount);
    }

    if (this.props.mediaItems !== nextProps.mediaItems) {
      this.filterMediaItems(nextProps.mediaItems);
    }

    if (!this.props.postSetsByST.equals(nextProps.postSetsByST)) {
      this.filterUpcomingPosts(nextProps.postSetsByST);
    }

    if (!this.props.postSets.equals(nextProps.postSets)) {
      this.filterPosts(nextProps.postSets);
    }
  }

  filterBoardStatus = (postSetsResponse) => {
    if (!postSetsResponse) return;

    const readyPostSets = postSetsResponse.getIn(['data', '3']);
    const inReviewPostSets = postSetsResponse.getIn(['data', '5']);
    const draftPostSets = postSetsResponse.getIn(['data', '2']);
    const ideaPostSets = postSetsResponse.getIn(['data', '6']);

    this.setState({
      statusData: {
        readyPostSets,
        inReviewPostSets,
        draftPostSets,
        ideaPostSets,
      },
    });
  }

  filterUpcomingPosts = (postSetsResponse) => {
    const currentTimeStamp = moment().unix();
    const allPostSets = postSetsResponse.getIn(['data', 'scheduled_post_sets']) || List();
    const sortedPosts = allPostSets.sortBy((post) => post.get('schedule_time'));
    const upcomingPosts = sortedPosts.filter((postSet) => postSet.get('schedule_time') >= currentTimeStamp).take(4);
    this.setState({ upcomingPosts });
  }

  filterPosts = (postSetsResponse) => {
    const postSets = postSetsResponse.getIn(['data', 'post_sets']) || List();
    const reviewPosts = postSets.filter((postSet) =>
      postSet.get('status') === '5').take(5).reverse();
    const draftPosts = postSets.filter((postSet) =>
      postSet.get('status') === '2').take(5).reverse();

    this.setState({
      reviewPosts,
      draftPosts,
    });
  }

  filterMediaItems = (mediaItems) => {
    const lastestMediaItems = mediaItems.count() > 5 ? mediaItems.take(6) : mediaItems;
    this.setState({ lastestMediaItems });
  }

  render() {
    const {
      accountId,
      statusData,
      lastestMediaItems,
      upcomingPosts,
      reviewPosts,
      draftPosts,
    } = this.state;
    return (
      <Wrapper>
        <Header>This is the launchpad for your brand’s PowerPost experience.</Header>
        <BodyWrapper>
          <LeftPane>
            <Calendar
              posts={upcomingPosts}
              path={`/account/${accountId}/calendar`}
            />
            <Posts
              reviewPosts={reviewPosts}
              draftPosts={draftPosts}
              path={`/account/${accountId}/posts`}
            />
          </LeftPane>
          <RightPane>
            <StatusBoards
              data={statusData}
              path={`/account/${accountId}/boards`}
            />
            <ContentHub
              mediaItems={lastestMediaItems}
              path={`/account/${accountId}/library`}
            />
          </RightPane>
        </BodyWrapper>
      </Wrapper>
    );
  }
}

AccountDashboard.propTypes = {
  getMediaItems: PropTypes.func,
  fetchPostSetsByST: PropTypes.func,
  fetchPostSets: PropTypes.func,
  fetchStatusCount: PropTypes.func,
  params: PropTypes.object,
  mediaItems: ImmutablePropTypes.list,
  statusCount: ImmutablePropTypes.map,
  postSets: ImmutablePropTypes.map,
  postSetsByST: ImmutablePropTypes.map,
};

const mapDispatchToProps = (dispatch) => ({
  getMediaItems: (accountId) => dispatch(fetchMediaItems(accountId)),
  fetchPostSets: (accountId) => dispatch(fetchPostSetsRequest(accountId)),
  fetchPostSetsByST: (accountId) => dispatch(fetchPostSetsBySTRequest(accountId)),
  fetchStatusCount: (accountId) => dispatch(fetchStatusCountRequest(accountId)),
});

const mapStateToProps = createStructuredSelector({
  account: makeSelectCurrentAccount(),
  postSetsByST: makeSelectPostSets(),
  mediaItems: makeSelectMediaItems(),
  statusCount: selectStatusCount(),
  postSets: selectPostSets(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDashboard);
