import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import {
  makeSelectAccountConnections,
} from 'containers/Main/selectors';

import {
  makeSelectCurrentChannel,
  makeLodingChannel,
} from './selectors';
import {
  fetchCurrentChannel,
  fetchCurrentChannelSuccess,
} from './actions';
import MainInfo from './MainInfo';
import ChannelLoading from '../Loading';
import SubWrapper from './SubWrapper';
import Wrapper from './MainWrapper';

const engagementTabsList = {
  twitter: ['tweets', 'retweets', 'favorites'],
  facebook: ['posts', 'fans', 'impressions', 'likes', 'comments'],
  pinterest: ['pins', 're-pins', 'likes', 'comments'],
  linkedin: ['posts', 'likes', 'comments'],
};

class ChannelsInfo extends React.Component {
  static propTypes = {
    activeChannel: PropTypes.any,
    connections: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    fetchChannel: PropTypes.func,
    fetchChannelInfo: PropTypes.func,
    params: PropTypes.shape({
      account_id: PropTypes.string,
      channel_id: PropTypes.string,
    }),
    isLoading: PropTypes.bool,
  }

  state = { subChannel: '', isMonth: false };

  componentWillReceiveProps(nextProps) {
    const { activeChannel, fetchChannelInfo, params } = this.props;
    if (nextProps.params.channel_id !== params.channel_id || nextProps.params.account_id !== params.account_id) {
      document.getElementById('main-panel').scrollTop = 0;
    }
    if (nextProps.activeChannel !== activeChannel) {
      fetchChannelInfo(nextProps.activeChannel);
      this.setState({ subChannel: engagementTabsList[nextProps.activeChannel.getIn(['connection', 'channel'])][0] });
    }
    /* if (nextProps.isLoading) {
      if (document.getElementById('main-panel').scrollTop === 0) {
        clearInterval(this.timer);
        return;
      }
      this.timer = setInterval(() => {
        document.getElementById('main-panel').scrollTop -= 50;
        if (document.getElementById('main-panel').scrollTop < 0) {
          document.getElementById('main-panel').scrollTop = 0;
          clearInterval(this.timer);
        }
      }, 50);
    } */
  }

  getType(channel) {
    return channel.type.split('_')[1];
  }

  setInfo(channel, field = 'likes') {
    let keys;
    let last;
    let info;
    const { activeChannel } = this.props;
    const rule = {
      likes: {
        pinterest: { info: 'analytics.pins_by_month', key: 'likes', label: 'Likes' },
        twitter: { info: 'analytics.user_stats.listed_count', direct: true, label: 'Tweets' },
        linkedin: { info: 'analytics.posts_by_month', key: 'likes', label: 'Likes' },
        facebook: { info: 'analytics.pins_by_month', key: 'likes', label: 'Likes' },
      },
      followers: {
        pinterest: { info: 'analytics.pins_by_month', key: 'comments', label: 'Followers' },
        twitter: { info: 'analytics.user_stats.followers_count', direct: true, label: 'Followers' },
        linkedin: { info: 'analytics.total_followers_by_month', label: 'Followers' },
        facebook: { info: 'analytics.extended.page_fans_by_month', label: 'Fans' },
      },
      following: {
        pinterest: { info: 'analytics.pins_by_month', key: 'repins', label: 'Repins' },
        twitter: { info: 'analytics.user_stats.friends_count', direct: true, label: 'Following' },
        linkedin: { info: 'analytics.posts_by_month', key: 'comments', label: 'Following' },
        facebook: { info: 'analytics.extended.posts_by_month', key: 'comments', label: 'Following' },
      },
      favorites: {
        pinterest: { info: 'analytics.pins_by_month', key: 'pin_count', label: 'Pins' },
        twitter: { info: 'analytics.user_stats.favourites_count', direct: true, label: 'Favorites' },
        linkedin: { info: 'analytics.total_followers_by_month', key: 'post_count', label: 'Posts' },
        facebook: { info: 'analytics.extended.total_followers_by_month', key: 'post_count', label: 'Posts' },
      },
    }[field][channel];
    if (rule) {
      if (rule.direct) {
        return (
          <div>
            <h3 className="topItemValue">{activeChannel.getIn(rule.info.split('.'))}</h3>
            <h6 className="topItemLabel">{rule.label}</h6>
          </div>
        );
      }
      info = activeChannel.getIn(rule.info.split('.'));
      if (info) {
        keys = Object.keys(info.toJS());
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h3 className="topItemValue">{(rule.key ? info.getIn([last, rule.key]) : info.get(last)) || 0}</h3>
              <h6 className="topItemLabel">{rule.label}</h6>
            </div>
          );
        }
      }
      return (
        <div>
          <h3 className="topItemValue">0</h3>
          <h6 className="topItemLabel">{rule.label}</h6>
        </div>
      );
    }
    return null;
  }

  renderLoading(channel) {
    return (
      <div>
        <ChannelLoading channel={channel} />
      </div>
    );
  }

  renderMain(channel) {
    const engagementTabs = engagementTabsList[channel.channel];
    if (!engagementTabs) return 'Error Fetching Data';
    return (
      <div>
        <div className="basicInfo">
          <table className="tablewidth">
            <tbody>
              <th className={['borderright', 'activeWidth'].join(' ')}>
                <div className="connectionBlock">
                  <div className="connectionIcon">
                    <i className={`${channel.channel_icon} ${channel.channel}`}></i>
                  </div>
                  <div style={{ float: 'left', textAlign: 'left' }}>
                    <div className="connectionName">
                      {channel.display_name}
                    </div>
                    <div className={channel.channel}>
                      {this.getType(channel)[0].toUpperCase() + this.getType(channel).slice(1)}
                    </div>
                  </div>
                </div>
              </th>
              <th className={['borderright', 'infoWidth'].join(' ')}>{this.setInfo(channel.channel, 'likes')}</th>
              <th className={['borderright', 'infoWidth'].join(' ')}>{this.setInfo(channel.channel, 'followers')}</th>
              <th className={['borderright', 'infoWidth'].join(' ')}>{this.setInfo(channel.channel, 'following')}</th>
              <th className="infoWidth">{this.setInfo(channel.channel, 'favorites')}</th>
            </tbody>
          </table>
        </div>
        <div className="channelsinfo">
          <h3 className="paddingleft">Engagement</h3>
          <div className="infoTab">
            {
              engagementTabs.map((tab) =>
                <Link key={tab} className={`infoTabItem ${this.state.subChannel === tab ? 'activeBorderline' : ''}`} onClick={() => this.setState({ subChannel: tab })}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Link>,
              )
            }
            <SubWrapper>
              <Link className={`infoTabItem ${this.state.isMonth ? '' : 'darken'}`} onClick={() => this.setState({ isMonth: false })}>Weekly</Link>
              <Link className={`infoTabItem ${this.state.isMonth ? 'darken' : ''}`} onClick={() => this.setState({ isMonth: true })}>Monthly</Link>
            </SubWrapper>
          </div>
          <div styles="mainInfo" >
            <MainInfo activeChannel={this.props.activeChannel} subChannel={this.state.subChannel} isMonth={this.state.isMonth} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { params, fetchChannel, connections, isLoading } = this.props;
    const channelId = params.channel_id;
    let channel = {};
    fetchChannel(channelId);
    channel = connections.filter((connection) =>
      connection.connection_id === channelId
    )[0] || {};
    if (isLoading === true) {
      return (
        <Wrapper>
          {this.renderLoading(channel)}
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        {this.renderMain(channel)}
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChannel: (channelId) => dispatch(fetchCurrentChannel(channelId)),
    fetchChannelInfo: (channel) => dispatch(fetchCurrentChannelSuccess(channel)),
  };
}

const mapStateToProps = createStructuredSelector({
  activeChannel: makeSelectCurrentChannel(),
  isLoading: makeLodingChannel(),
  connections: makeSelectAccountConnections(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(ChannelsInfo));
