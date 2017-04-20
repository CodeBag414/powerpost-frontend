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
import { Map, List } from 'immutable';
import { makeSelectCurrentChannel } from '../selectors';

import TopListItem from '../TopListItem';

import Info from '../Wrapper/Info';
import Wrapper from '../Wrapper/Wrapper';

const rules = {
  twitter: {
    tweets: {
      infoMonth: 'analytics.tweets_by_month',
      infoWeek: 'analytics.tweets_by_weeks_ago',
      totalKey: 'tweet_count',
      content: 'Tweets',
      reKey: 'retween_count',
      reLabel: 'Retweets',
      topByEngagementKey: 'top_tweets_by_engagement',
    },
    retweets: {
      infoMonth: 'analytics.tweets_by_month',
      infoWeek: 'analytics.tweets_by_weeks_ago',
      totalKey: 'retween_count',
      content: 'Retweets',
      reKey: 'tweet_count',
      reLabel: 'Tweets',
      topByEngagementKey: 'top_tweets_by_engagement',
    },
    favorites: {
      infoMonth: 'analytics.tweets_by_month',
      infoWeek: 'analytics.tweets_by_weeks_ago',
      totalKey: 'favorite_count',
      content: 'Favorites',
      reKey: 'tweet_count',
      reLabel: 'Tweets',
      topByEngagementKey: 'top_tweets_by_engagement',
    },
    infos: {
      items: [
        { label: 'Tweets', valueKey: 'tweet_count' },
        { label: 'Favorites', valueKey: 'favorite_count' },
        { label: 'Retweets', valueKey: 'retweet_count' },
      ],
      imageUrlKey: 'user.profile_image_url',
      createTimeKey: 'created_at',
      descriptionKey: 'text',
    },
  },
  facebook: {
    posts: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      totalKey: 'post_count',
      content: 'Posts',
      reKey: 'comments',
      reLabel: 'Comments',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    fans: {
      infoMonth: 'analytics.extended.page_fans_by_month',
      infoWeek: 'analytics.extended.page_fans_by_weeks_ago',
      totalKey: '',
      content: 'Fans',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    impressions: {
      infoMonth: 'analytics.extended.unique_page_impressions_by_month',
      infoWeek: 'analytics.extended.unique_page_impressions_by_weeks_ago',
      totalKey: '',
      content: 'Impressions',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    likes: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      content: 'Likes',
    },
    comments: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      content: 'Comments',
    },
    infos: {
      infoMonth: 'analytics.posts_by_month',
      items: [
        { label: 'Likes', valueKey: 'likes.summary.total_count' },
        { label: 'Comments', valueKey: 'comments.summary.total_count' },
      ],
      imageUrlKey: 'picture',
      createTimeKey: 'created_time',
      descriptionKey: 'description',
    },
  },
  pinterest: {
    pins: {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Pins',
    },
    're-pins': {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Re-pins',
    },
    likes: {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Likes',
    },
    comments: {
      infoMonth: 'analytics.pins_by_month',
      infoWeek: 'analytics.pins_by_weeks_ago',
      content: 'Comments',
    },
    infos: {
      items: [

      ],
    },
  },
  linkedin: {
    posts: {
      infoMonth: 'analytics.posts_by_month',
      infoWeek: 'analytics.posts_by_weeks_ago',
      totalKey: 'post_count',
      content: 'Posts',
      reKey: 'comments',
      reLabel: 'Comments',
      topByEngagementKey: 'top_posts_by_engagement',
    },
    likes: {
      infoMonth: 'analytics.total_followers_by_month',
      infoWeek: 'analytics.total_followers_by_weeks_ago',
      content: 'Likes',
    },
    comments: {
      infoMonth: 'analytics.organic_followers_by_month',
      infoWeek: 'analytics.organic_followers_by_weeks_ago',
      content: 'Comments',
    },
    infos: {
      items: [
        { label: 'Likes', valueKey: 'numLikes' },
      ],
      imageUrlKey: 'updateContent.companyStatusUpdate.share.content.submittedImageUrl',
      createTimeKey: 'updateContent.companyStatusUpdate.share.timestamp',
      descriptionKey: 'updateContent.companyStatusUpdate.share.comment',
    },
  },
};

class MainInfo extends React.Component {

  static propTypes = {
    activeChannel: PropTypes.shape(),
    subChannel: PropTypes.string,
    isMonth: PropTypes.bool,
  }

  getRule() {
    const { activeChannel, isMonth, subChannel } = this.props;
    const channel = activeChannel.getIn(['connection', 'channel']);
    return {
      ...rules[channel][subChannel],
      info: rules[channel][subChannel][isMonth ? 'infoMonth' : 'infoWeek'],
    };
  }

  getInfos() {
    const { activeChannel } = this.props;
    const channel = activeChannel.getIn(['connection', 'channel']);
    return rules[channel].infos;
  }

  getTotaldata() {
    let total = 0;
    const { activeChannel } = this.props;
    const rule = this.getRule();
    const info = activeChannel.getIn(rule.info.split('.')) || Map();
    const keys = Object.keys(info.toJS());
    const last = keys[0];
    let re = `0 ${rule.reLabel}`;
    if (last != null) {
      if (rule.totalKey) {
        total = info.getIn([last, rule.totalKey]);
      } else {
        total = info.getIn([last]);
      }
      re = `${info.getIn([last, rule.reKey]) || 0} ${rule.reLabel}`;
    }
    const contents = `${total} ${rule.content}`;
    const content = rule.content;
    return (
      <div>
        <h1><b>{total || 0}</b></h1>
        <h5>{content} this week</h5><br />
        <h5>Based on {re} sent in the last week you averaged <b>{contents} </b>per post.</h5>
      </div>
    );
    /* switch (activeChannel.connection.channel) {
      case 'pinterest':
        info = activeChannel.analytics.pins_by_weeks_ago;
        keys = Object.keys(info);
        last = keys[0];
        if (last != null) {
          total = info[last].pin_count != null ? info[last].pin_count : '0';
          tweet = `${info[last].repins} Repins`;
          contents = `${total} Pins`;
          content = 'Pins';
        }
        break;
      case 'twitter':
        info = activeChannel.analytics.tweets_by_weeks_ago;
        keys = Object.keys(info);
        last = keys[0];
        if (last != null) {
          total = info[last].tweet_count != null ? info[last].tweet_count : '0';
          tweet = `${info[last].retweet_count} Retweets`;
          contents = `${total} Tweets`;
          content = 'Tweets';
        }
        break;
      case 'facebook':
        info = activeChannel.analytics.extended.page_fans_by_weeks_ago;
        keys = Object.keys(info);
        last = keys[0];
        if (last != null) {
          total = info[last] != null ? info[last] : '0';
          // TODO: fix me the following is hard coded
          tweet = '2 Likes';
          contents = `${total} Fans`;
          content = 'Fans';
        }
        break;
      case 'linkedin':
        info = activeChannel.analytics.total_followers_by_weeks_ago;
        keys = Object.keys(info);
        last = keys[0];
        if (info != null) {
          total = info[last] != null ? info[last] : '0';
          // TODO: fix me the following is hard coded
          tweet = '3 Likes';
          contents = `${total} Posts`;
          content = 'Posts';
        }
        break;
      default:
        break;
    }*/
  }

  getNameDate(index, isMonth) {
    const d = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (isMonth) {
      return `${monthNames[index - 1]}`;
    }
    d.setDate(d.getDate() - (7 * index));
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  getChartsData() {
    const data = [];
    const { activeChannel, isMonth } = this.props;
    const rule = this.getRule();
    const info = activeChannel.getIn(rule.info.split('.')) || List();
    info.forEach((item, key) =>
      data.push({
        name: this.getNameDate(parseInt(key, 10), isMonth),
        [rule.content]: rule.totalKey ? item.get(rule.totalKey) : item,
        key: isMonth ? parseInt(key, 10) : -parseInt(key, 10),
      }),
    );
    return data.sort((a, b) => a.key > b.key ? 1 : -1).slice(0, isMonth ? 3 : 12);
    /* switch (activeChannel.connection.channel) {
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
        info = activeChannel.analytics.posts_by_weeks_ago;
        info.forEach((item) =>
          data.push({
            name: this.getNameDate(item.top_posts_by_engagement['0'].created_at),
            favorites: item.post_count,
            amt: item.post_count,
          })
        );
        break;
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
    } */
  }

  render() {
    let TopItemsList = 'You Currently have no Posts.';
    const { activeChannel } = this.props;
    const rule = this.getRule();
    const { infoMonth, items, imageUrlKey, createTimeKey, descriptionKey } = this.getInfos();
    const itemInfo = activeChannel.getIn((infoMonth || rule.infoMonth).split('.')) || Map();
    const keys = Object.keys(itemInfo.toJS());
    const last = keys[0];
    if (last !== null) {
      const topItems = itemInfo.getIn([last, rule.topByEngagementKey]) || [];
      TopItemsList = topItems.map((topItem, index) =>
        <TopListItem
          topItem={topItem}
          key={index}
          infos={
            items.map((item) => ({
              label: item.label,
              value: (item.additionalKey ? topItem.getIn(item.valueKey.split('.'))[item.additionalKey] : topItem.getIn(item.valueKey.split('.'))) || 0,
            }))
          }
          imageUrlKey={imageUrlKey}
          createTimeKey={createTimeKey}
          descriptionKey={descriptionKey}
        />
      );
    }
    /* if (channelInfo !== undefined) {
      TopTweetsList = [];
      const { activeChannel, params } = this.props;
      switch (activeChannel.connection.channel) {
        case 'pinterest':
          info = activeChannel.analytics.pins_by_month;
          keys = Object.keys(info);
          last = keys[0];
          if (last != null) {
            info[last].top_pins_by_engagement.forEach((topPin, index) => {
              TopTweetsList.push(
                <TopPinListItem
                  topTweet={topPin}
                  key={`${params.channel_id - index - 1200}bc`}
                  likes={info[last].likes}
                  comments={info[last].comments}
                  repins={info[last].repins}
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
          if (last != null) {
            info[last].top_tweets_by_engagement.forEach((topPin, index) => {
              TopTweetsList.push(
                <TopTweetListItem
                  topTweet={topPin}
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
            info[last].top_posts_by_engagement.forEach((topPin, index) => {
              TopTweetsList.push(
                <TopPostListItem
                  topTweet={topPin}
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
            info[last].top_posts_by_engagement.forEach((topPin, index) => {
              TopTweetsList.push(
                <TopFaceListItem
                  topTweet={topPin}
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
    }*/
    return (
      <Info>
        <Wrapper>
          <div className={['col-md-4', 'col-sm-4', 'col-xs-4'].join(' ')}>
            {this.getTotaldata()}
          </div>
          <div className={['col-md-8', 'col-sm-8', 'col-xs-8'].join(' ')}>
            <BarChart width={600} height={200} data={this.getChartsData()} margin={{ top: 5, right: 30, left: 20, bottom: 1 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey={rule.content} fill="#dfdfdf" />
            </BarChart>
          </div>
        </Wrapper>
        <div>
          <h3 className="top-this-month">Top This Month</h3>
          {TopItemsList}
        </div>
      </Info>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activeChannel: makeSelectCurrentChannel(),
});

export default (connect(mapStateToProps)(MainInfo));
