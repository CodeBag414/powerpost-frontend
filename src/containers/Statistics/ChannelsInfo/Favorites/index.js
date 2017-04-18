import React, { PropTypes } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentChannel } from '../selectors';

import TopTweetListItem from '../TopLists/TopTweetlistItem';
import TopFaceListItem from '../TopLists/TopFacelistItem';
import TopPinListItem from '../TopLists/TopPinlistItem';
import TopPostListItem from '../TopLists/TopPostlistItem';

import Info from '../Wrapper/Info';
import Wrapper from '../Wrapper/Wrapper';

class Favorites extends React.Component {

  static propTypes = {
    activeChannel: PropTypes.any,
    params: PropTypes.shape({
      channel_id: PropTypes.string,
    }),
  };

  getTotaldata() {
    let total;
    let totalInfo;
    let keys;
    let last;
    let contents;
    let tweet;
    let content;
    const { activeChannel } = this.props;
    switch (activeChannel.connection.channel) {
      case 'pinterest':
        totalInfo = activeChannel.analytics.pins_by_weeks_ago;
        keys = Object.keys(totalInfo);
        last = keys[0];
        if (last != null) {
          total = totalInfo[last].likes != null ? totalInfo[last].likes : '0';
          tweet = `${totalInfo[last].pin_count} Pins`;
          contents = `${total} Likes`;
          content = 'Likes';
        }
        break;
      case 'twitter':
        totalInfo = activeChannel.analytics.tweets_by_weeks_ago;
        keys = Object.keys(totalInfo);
        last = keys[0];
        if (last != null) {
          total = totalInfo[last].favorite_count != null ? totalInfo[last].favorite_count : '0';
          tweet = `${totalInfo[last].tweet_count} Tweets`;
          contents = `${total} Favorites`;
          content = 'Favorites';
        }
        break;
      case 'facebook':
        totalInfo = activeChannel.analytics.extended.page_fans_by_weeks_ago;
        keys = Object.keys(totalInfo);
        last = keys[0];
        if (last != null) {
          total = totalInfo[last] != null ? totalInfo[last] : '0';
          tweet = '2 Likes';
          contents = `${total} Posts`;
          content = 'Fans';
        }
        break;
      case 'linkedin':
        totalInfo = activeChannel.analytics.total_followers_by_weeks_ago;
        keys = Object.keys(totalInfo);
        last = keys[0];
        if (last != null) {
          total = totalInfo[last] != null ? totalInfo[last] : '0';
          tweet = '3 Likes';
          contents = `${total} Posts`;
          content = 'Fans';
        }
        break;
      default:
        break;
    }
    return (
      <div>
        <h1><b>{total}</b></h1>
        <h5>{content} this week</h5><br />
        <h5>Based on {tweet} sent in the last week you averaged <b>{contents} </b>per post.</h5>
      </div>
    );
  }

  getNameDate(date) {
    const d = new Date(date);
    return `${(d.getMonth() + 1)}/${d.getDate()}`;
  }

  getChartsData() {
    const data = [];
    let info;
    const { activeChannel } = this.props;
    switch (activeChannel.connection.channel) {
      case 'pinterest':
        info = activeChannel.analytics.pins_by_weeks_ago;
        info.forEach((item) =>
          data.push({
            name: this.getNameDate(item.top_pins_by_engagement['0'].created_at),
            favorites: item.repins,
            amt: item.repins,
          })
        );
        break;
      case 'twitter':
        info = activeChannel.analytics.tweets_by_weeks_ago;
        info.forEach((item) =>
          data.push({
            name: this.getNameDate(item.top_tweets_by_engagement['0'].created_at),
            favorites: item.retweet_count,
            amt: item.retweet_count,
          })
        );
        break;
      case 'facebook':
      case 'linkedin':
        info = activeChannel.analytics.posts_by_weeks_ago;
        info.forEach((item) =>
          data.push({
            name: this.getNameDate(item.top_posts_by_engagement['0'].created_at),
            favorites: item.post_count,
            amt: item.post_count,
          })
        );
        break;
      default:
        break;
    }
    return data;
  }

  render() {
    const channelInfo = this.props.activeChannel.analytics;

    let keys;
    let last;
    let info;

    let TopTweetsList;
    if (channelInfo !== undefined) {
      TopTweetsList = [];
      const { activeChannel, params } = this.props;
      switch (activeChannel.connection.channel) {
        case 'pinterest':
          info = activeChannel.analytics.pins_by_month;
          keys = Object.keys(info);
          last = keys[0];
          if (last != null) {
            channelInfo.pins_by_month[last].top_pins_by_engagement.forEach((topPin, index) => {
              TopTweetsList.push(
                <TopPinListItem
                  topTweet={topPin}
                  key={`${params.channel_id - index - 1200}bc`}
                  likes={info.pins_by_month[last].likes}
                  comments={info.pins_by_month[last].comments}
                  repins={info.pins_by_month[last].repins}
                />
              );
            });
          } else {
            TopTweetsList = 'You Currently have no Posts.';
          }
          break;
        case 'twitter':
          info = activeChannel.analytics.tweets_by_month;
          keys = Object.keys(info);
          last = keys[0];
          if (last !== null) {
            info[last].top_tweets_by_engagement.forEach((topTweet, index) => {
              TopTweetsList.push(
                <TopTweetListItem
                  topTweet={topTweet}
                  key={`${params.channel_id - index - 1200}bc`}
                  tweets={info[last].tweet_count}
                  favorites={info[last].favorite_count}
                  retweets={info[last].retweet_count}
                />
              );
            });
          } else {
            TopTweetsList = 'You Currently have no Posts.';
          }
          break;
        case 'linkedin':
          info = activeChannel.analytics.posts_by_month;
          keys = Object.keys(info);
          last = keys[0];
          if (last != null) {
            info[last].top_posts_by_engagement.forEach((topPost, index) => {
              TopTweetsList.push(
                <TopPostListItem
                  topTweet={topPost}
                  key={`${params.channel_id - index - 1200}bc`}
                  likes={info[last].likes}
                  comments={info[last].comments}
                  posts={info[last].post_count}
                />
              );
            });
          } else {
            TopTweetsList = 'You Currently have no Posts.';
          }
          break;
        case 'facebook':
          info = activeChannel.analytics.posts_by_month;
          keys = Object.keys(info);
          last = keys[0];
          if (last != null) {
            info[last].top_posts_by_engagement.forEach((topPost, index) => {
              TopTweetsList.push(
                <TopFaceListItem
                  topTweet={topPost}
                  key={`${params.channel_id - index - 1200}bc`}
                  likes={info[last].likes}
                  comments={info[last].comments}
                  posts={info[last].post_count}
                />
              );
            });
          } else {
            TopTweetsList = 'You Currently have no Posts.';
          }
          break;
        default:
          TopTweetsList = 'You Currently have no Channels.';
          break;
      }
    }

    return (
      <Info>
        <Wrapper>
          <div className={['col-md-4', 'col-sm-4', 'col-xs-4'].join(' ')}>
            {this.getTotaldata()}
          </div>
          <div className={['col-md-8', 'col-sm-8', 'col-xs-8'].join(' ')}>
            <BarChart
              width={600}
              height={200}
              data={this.getChartsData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 1 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="favorites" fill="#dfdfdf" />
            </BarChart>
          </div>
        </Wrapper>
        <div>
          <h3>Top This Month</h3>
          {TopTweetsList}
        </div>
      </Info>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activeChannel: makeSelectCurrentChannel(),
});

export default (connect(mapStateToProps)(Favorites));
