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

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import { fetchMediaItems, fetchPostSetsRequest } from 'containers/App/actions';
import { makeSelectPostSets, makeSelectMediaItems } from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

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
    statusData: {},
    reviewPosts: List(),
    draftPosts: List(),
  };

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
    this.props.fetchPostSets(this.props.params.account_id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.accountId !== nextProps.params.account_id) {
      this.setState({ accountId: nextProps.params.account_id }, () => {
        this.props.getMediaItems(nextProps.params.account_id);
        this.props.fetchPostSets(nextProps.params.account_id);
      });
    }

    if (this.props.postSets !== nextProps.postSets) {
      this.filterPosts(nextProps.postSets);
      this.filterBoardStatus(nextProps.postSets);
    }

    if (this.props.mediaItems !== nextProps.mediaItems) {
      this.filterMediaItems(nextProps.mediaItems);
    }

    if (!this.props.postSets.equals(nextProps.postSets)) {
      this.filterUpcomingPosts(nextProps.postSets);
    }
  }

  filterBoardStatus = (postSetsResponse) => {
    const postSets = postSetsResponse.getIn(['data', 'post_sets']) || List();
    // Following code doesn't work at the moment.
    // It will be fixed by new introduction of api endpoint for this.
    const readyPostSets = postSets.filter((postSet) => postSet.get('status') === '3').count() || 0;
    const inReviewPostSets = postSets.filter((postSet) => postSet.get('status') === '5').count() || 0;
    const draftPostSets = postSets.filter((postSet) => postSet.get('status') === '2').count() || 0;
    const ideaPostSets = postSets.filter((postSet) => postSet.get('status') === '6').count() || 0;

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
    // TODO: This should be fixed
    const allPostSets = postSetsResponse.getIn(['data', 'scheduled_post_sets']);
    console.log('%%%%%%%%', postSetsResponse.toJS());
    // const postSets = postSetsResponse.getIn(['data', 'post_sets']) || List();
    // const upcomingPosts = postSets.filter((postSet) => postSet.get('schedule_time') >= currentTimeStamp).takeLast(4);
    // this.setState({ upcomingPosts });
  }

  filterPosts = (postSetsResponse) => {
    const postSets = postSetsResponse.getIn(['data', 'post_sets']) || List();
    const reviewPosts = postSets.filter((postSet) => postSet.get('status') === '5').takeLast(5).reverse();
    const draftPosts = postSets.filter((postSet) => postSet.get('status') === '2').takeLast(5).reverse();

    this.setState({
      reviewPosts,
      draftPosts,
    });
  }

  filterMediaItems = (mediaItems) => {
    const lastestMediaItems = mediaItems.count() > 5 ? mediaItems.takeLast(6) : mediaItems;
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
  fetchPostSets: PropTypes.func,
  params: PropTypes.object,
  mediaItems: ImmutablePropTypes.list,
  postSets: ImmutablePropTypes.map,
};

const mapDispatchToProps = (dispatch) => ({
  getMediaItems: (accountId) => dispatch(fetchMediaItems(accountId)),
  fetchPostSets: (accountId) => dispatch(fetchPostSetsRequest(accountId)),
});

const mapStateToProps = createStructuredSelector({
  account: makeSelectCurrentAccount(),
  postSets: makeSelectPostSets(),
  mediaItems: makeSelectMediaItems(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(AccountDashboard));
