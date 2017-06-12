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

import { getPostSets, fetchMediaItems, fetchPostSetsBySTRequest } from 'containers/App/actions';
import { makeSelectPostSets, makeSelectMediaItems, makeSelectPostSetsByST } from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import Wrapper from './Wrapper';
import Card from './Card';
import PostsWrapper from './PostsWrapper';
import StatusWrapper from './StatusWrapper';
import ContentWrapper from './ContentWrapper';
import UpcomingWrapper from './UpcomingWrapper';

class AccountDashboard extends Component {

  state = {
    accountId: this.props.params.account_id,
    upcomingPosts: List(),
    latestReviews: List(),
    latestDrafts: List(),
    lastestMediaItems: List(),
    readyPostSets: 0,
    inReviewPostSets: 0,
    draftPostSets: 0,
    ideaPostSets: 0,
  };

  componentDidMount() {
    this.props.getMediaItems(this.props.params.account_id);
    this.props.getPostSetsbyST(this.props.params.account_id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.params.account_id, '%%%%%%%%%%%%%%%%%%%', this.state.accountId);
    if (this.state.accountId !== nextProps.params.account_id) {
      this.setState({ accountId: nextProps.params.account_id }, () => {
        this.props.getMediaItems(nextProps.params.account_id);
        this.props.getPostSetsbyST(nextProps.params.account_id);
      });
    }

    if (this.props.postSets !== nextProps.postSets) {
      this.filterPosts(nextProps.postSets);
      this.filterBoardStatus(nextProps.postSets);
    }

    if (this.props.mediaItems !== nextProps.mediaItems) {
      this.filterMediaItems(nextProps.mediaItems);
    }

    if (!this.props.postSetsbyST.equals(nextProps.postSetsbyST)) {
      this.filterUpcomingPosts(nextProps.postSetsbyST);
    }
  }

  filterBoardStatus = (postSets) => {
    const readyPostSets = postSets.filter((postSet) => postSet.get('status') === '3').count();
    const inReviewPostSets = postSets.filter((postSet) => postSet.get('status') === '5').count();
    const draftPostSets = postSets.filter((postSet) => postSet.get('status') === '2').count();
    const ideaPostSets = postSets.filter((postSet) => postSet.get('status') === '6').count();

    this.setState({
      readyPostSets,
      inReviewPostSets,
      draftPostSets,
      ideaPostSets,
    });
  }

  filterUpcomingPosts = (postSets) => {
    const currentTimeStamp = moment().unix();
    const allPostSets = postSets.getIn(['data', 'scheduled_post_sets']);
    const upcomingPosts = allPostSets.filter((postSet) => postSet.get('schedule_time') >= currentTimeStamp).takeLast(3).reverse();
    this.setState({ upcomingPosts });
  }

  filterPosts = (postSets) => {
    const reviewPostSets = postSets.filter((postSet) => postSet.get('status') === '5');
    const latestReviews = reviewPostSets.count() > 3 ? reviewPostSets.takeLast(3) : reviewPostSets;
    const draftPostSets = postSets.filter((postSet) => postSet.get('status') === '2');
    const latestDrafts = draftPostSets.count() > 3 ? draftPostSets.takeLast(3) : draftPostSets;

    this.setState({
      latestReviews,
      latestDrafts,
    });
  }

  filterMediaItems = (mediaItems) => {
    const lastestMediaItems = mediaItems.count() > 3 ? mediaItems.takeLast(3) : mediaItems;
    this.setState({ lastestMediaItems });
  }

  renderMediaItem = (mediaItem) => {
    const title = mediaItem.getIn(['properties', 'title']) || 'Untitled';
    const mediaType = mediaItem.get('type');

    let iconName = '';

    switch (mediaType) {
      case 'link':
        iconName = 'fa fa-link';
        break;
      case 'video':
        iconName = 'fa fa-video-camera';
        break;
      case 'image':
        iconName = 'fa fa-picture-o';
        break;
      case 'file':
        iconName = 'fa fa-text-o';
        break;
      case 'document':
        iconName = 'fa fa-file-text-o';
        break;
      default:
        iconName = 'fa fa-file-text-o';
        break;
    }

    return <div className="item"><i className={iconName} /><div>{title}</div></div>;
  }

  renderUpcomingItem = (item) => {
    const title = item.get('title');
    const scheduleTime = item.get('schedule_time');
    const time = moment(scheduleTime * 1000).format('MMMM D - hh:mm a');

    return (<div className="item">
      <div className="title">{title}</div>
      <div className="time">{time}</div>
    </div>);
  }

  render() {
    const {
      latestReviews,
      latestDrafts,
      readyPostSets,
      inReviewPostSets,
      draftPostSets,
      ideaPostSets,
      lastestMediaItems,
      upcomingPosts,
    } = this.state;


    return (
      <Wrapper>
        <div className="pane">
          <Card
            title="Calendar"
            description="Go here to get a snapshot of your brand's upcoming posts and plan out your content."
            path={`/account/${this.state.accountId}/calendar`}
          >
            {upcomingPosts.count() > 0 ?
              <UpcomingWrapper>
                <div className="caption">
                  Upcoming
                </div>
                <div className="content">
                  {upcomingPosts.map((postSet) => this.renderUpcomingItem(postSet))}
                </div>
              </UpcomingWrapper>
              :
              <UpcomingWrapper>
                No posts are ready to go out.
              </UpcomingWrapper>
            }
          </Card>
          <Card
            title="Posts"
            description="Go here to quickly edit, review and approve posts."
            path={`/account/${this.state.accountId}/posts`}
          >
            <PostsWrapper>
              <div className="group">
                <div className="title">Latest In Review</div>
                {latestReviews.count() > 0 ?
                  latestReviews.map((postSet) => <div className="item">{postSet.get('title')}</div>)
                  : <div className="item">No current posts in review.</div>
                }
              </div>
              <div className="group">
                <div className="title">Latest Draft</div>
                {latestDrafts.count() > 0 ?
                  latestDrafts.map((postSet) => <div className="item">{postSet.get('title')}</div>)
                  : <div className="item">No current posts in draft.</div>
                }
              </div>
            </PostsWrapper>
          </Card>
        </div>
        <div className="pane">
          <Card
            title="Status Board"
            description="Check the status of upcoming posts and change them as necessary."
            path={`/account/${this.state.accountId}/boards`}
          >
            <StatusWrapper>
              <div className="item">
                {readyPostSets}<span>Ready</span>
              </div>
              <div className="item">
                {inReviewPostSets}<span>In Review</span>
              </div>
              <div className="item">
                {draftPostSets}<span>Drafts</span>
              </div>
              <div className="item">
                {ideaPostSets}<span>Ideas</span>
              </div>
            </StatusWrapper>
          </Card>
          <Card
            title="Content"
            description="Upload, curate and create content and organize it all in one place."
            path={`/account/${this.state.accountId}/library`}
          >
            {lastestMediaItems.count() > 0 ?
              <ContentWrapper>
                <div className="caption">
                  Latest Added
                </div>
                <div className="content">
                  { lastestMediaItems.map((mediaItem) => this.renderMediaItem(mediaItem))}
                </div>
              </ContentWrapper>
            : <ContentWrapper>No content has been added.</ContentWrapper>}
          </Card>
        </div>
      </Wrapper>
    );
  }
}

AccountDashboard.propTypes = {
  getMediaItems: PropTypes.func,
  getPostSetsbyST: PropTypes.func,
  params: PropTypes.object,
  postSets: ImmutablePropTypes.list,
  mediaItems: ImmutablePropTypes.list,
  postSetsbyST: ImmutablePropTypes.map,
};

const mapDispatchToProps = (dispatch) => ({
  getPostSetsAction: (accountId) => dispatch(getPostSets(accountId)),
  getMediaItems: (accountId) => dispatch(fetchMediaItems(accountId)),
  getPostSetsbyST: (accountId) => dispatch(fetchPostSetsBySTRequest(accountId)),
});

const mapStateToProps = createStructuredSelector({
  account: makeSelectCurrentAccount(),
  postSets: makeSelectPostSets(),
  mediaItems: makeSelectMediaItems(),
  postSetsbyST: makeSelectPostSetsByST(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(AccountDashboard));
