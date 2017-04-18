import React, { PropTypes } from 'react';
import TabLink from 'elements/atm.TabLink';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import ChannelLoading from '../Loading';
import SubWrapper from './SubWrapper';
import Wrapper from './MainWrapper';
import TabButton from './Wrapper/TabButton';

class ChannelsInfo extends React.Component {
  static propTypes = {
    activeChannel: PropTypes.any,
    connections: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    children: PropTypes.node,
    fetchChannel: PropTypes.func,
    fetchChannelInfo: PropTypes.func,
    params: PropTypes.shape({
      account_id: PropTypes.string,
      channel_id: PropTypes.string,
    }),
    isLoading: PropTypes.bool,
  }
  componentWillReceiveProps(nextProps) {
    const { activeChannel, fetchChannelInfo } = this.props;
    if (nextProps.activeChannel !== activeChannel) {
      fetchChannelInfo(nextProps.activeChannel);
    }
  }

  getType(channel) {
    return channel.type.split('_')[1];
  }

  setTweetsInfo() {
    let keys;
    let last;
    let channelInfo;
    let linkedInfo;
    let facebookInfo;
    const { activeChannel } = this.props;
    switch (activeChannel.connection.channel) {
      case 'pinterest':
        channelInfo = activeChannel.analytics.pins_by_month;
        keys = Object.keys(channelInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{channelInfo[last].likes}</h4>
              <h5>Likes</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Likes</h5>
          </div>
        );
      case 'twitter':
        return (
          <div>
            <h4>{activeChannel.analytics.user_stats.listed_count}</h4>
            <h5>Tweets</h5>
          </div>
        );
      case 'linkedin':
        linkedInfo = activeChannel.analytics.posts_by_month;
        keys = Object.keys(linkedInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{ linkedInfo[last].likes }</h4>
              <h5>Likes</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Likes</h5>
          </div>
        );
      case 'facebook':
        facebookInfo = activeChannel.analytics.posts_by_month;
        keys = Object.keys(facebookInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{ facebookInfo[last].likes }</h4>
              <h5>Likes</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Likes</h5>
          </div>
        );
      default:
        return null;
    }
  }

  setFollowersInfo() {
    let keys;
    let last;
    const { activeChannel } = this.props;
    let channelInfo;
    let facebookInfo;
    let linkedInfo;
    switch (activeChannel.connection.channel) {
      case 'pinterest':
        channelInfo = activeChannel.analytics.pins_by_month;
        keys = Object.keys(channelInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{channelInfo[last].comments}</h4>
              <h5>Followers</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Followers</h5>
          </div>
        );
      case 'twitter':
        return (
          <div>
            <h4>{ activeChannel.analytics.user_stats.followers_count }</h4>
            <h5>Followers</h5>
          </div>
        );
      case 'linkedin':
        linkedInfo = activeChannel.analytics.total_followers_by_month;
        keys = Object.keys(linkedInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{linkedInfo[last]}</h4>
              <h5>Followers</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Followers</h5>
          </div>
        );
      case 'facebook':
        facebookInfo = activeChannel.analytics.extended.page_fans_by_month;
        keys = Object.keys(facebookInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{facebookInfo[last]}</h4>
              <h5>Fans</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Fans</h5>
          </div>
        );
      default:
        return null;
    }
  }

  setFollowingInfo() {
    let keys;
    let last;
    const { activeChannel } = this.props;
    const channelInfo = activeChannel.analytics.pins_by_month;
    const linkedInfo = activeChannel.analytics.posts_by_month;
    const facebookInfo = activeChannel.analytics.posts_by_month;
    switch (activeChannel.connection.channel) {
      case 'pinterest':
        keys = Object.keys(channelInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{channelInfo[last].repins}</h4>
              <h5>Repins</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Repins</h5>
          </div>);
      case 'twitter':
        return (
          <div>
            <h4>{activeChannel.analytics.user_stats.friends_count}</h4>
            <h5>Following</h5>
          </div>
        );
      case 'linkedin':
        keys = Object.keys(linkedInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{linkedInfo[last].comments}</h4>
              <h5>Following</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Following</h5>
          </div>
        );
      case 'facebook':
        keys = Object.keys(facebookInfo);
        last = keys[0];
        if (last != null) {
          return (
            <div>
              <h4>{facebookInfo[last].comments}</h4>
              <h5>Following</h5>
            </div>
          );
        }
        return (
          <div>
            <h4>0</h4>
            <h5>Following</h5>
          </div>
        );
      default:
        return null;
    }
  }

  setFavoritesInfo() {
    let keys;
    let last;
    const { activeChannel } = this.props;
    const channelInfo = activeChannel.analytics.pins_by_month;
    const linkedInfo = activeChannel.analytics.total_followers_by_month;
    const facebookInfo = activeChannel.analytics.posts_by_month;
    switch (activeChannel.connection.channel) {
      case 'pinterest':
        keys = Object.keys(channelInfo);
        last = keys[0];
        if (last != null) {
          return (
            <th className="infoWidth" >
              <h4>{channelInfo[last].pin_count}</h4>
              <h5>Pins</h5>
            </th>
          );
        }
        return (
          <th className="infoWidth" >
            <h4>0</h4>
            <h5>Pins</h5>
          </th>
        );
      case 'twitter':
        return (
          <th className="infoWidth" >
            <h4>{activeChannel.analytics.user_stats.favourites_count}</h4>
            <h5>Favorites</h5>
          </th>
        );
      case 'linkedin':
        keys = Object.keys(linkedInfo);
        last = keys[0];
        if (last != null) {
          return (
            <th className="infoWidth" >
              <h4>{linkedInfo[last].post_count}</h4>
              <h5>Posts</h5>
            </th>
          );
        }
        return (
          <th className="infoWidth" >
            <h4>0</h4>
            <h5>Posts</h5>
          </th>
        );
      case 'facebook':
        keys = Object.keys(facebookInfo);
        last = keys[0];
        if (last != null) {
          return (
            <th className="infoWidth" >
              <h4>{facebookInfo[last].post_count}</h4>
              <h5>Posts</h5>
            </th>
          );
        }
        return (
          <th className="infoWidth" >
            <h4>0</h4>
            <h5>Posts</h5>
          </th>
        );
      default:
        return null;
    }
  }

  renderLoading(channel) {
    return (
      <div>
        <ChannelLoading channel={channel} />
      </div>
    );
  }

  renderMain(channel) {
    const { params, children } = this.props;
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
                  <div style={{ float: 'left' }}>
                    <div className="connectionName">
                      {channel.display_name}
                    </div>
                    <div className={channel}>
                      {this.getType(channel)[0].toUpperCase() + this.getType(channel).slice(1)}
                    </div>
                  </div>
                </div>
              </th>
              <th className={['borderright', 'infoWidth'].join(' ')}>{this.setTweetsInfo()}</th>
              <th className={['borderright', 'infoWidth'].join(' ')}>{this.setFollowersInfo()}</th>
              <th className={['borderright', 'infoWidth'].join(' ')}>{this.setFollowingInfo()}</th>
              { this.setFavoritesInfo() }
            </tbody>
          </table>
        </div>
        <div className="channelsinfo">
          <h3 className="paddingleft">Engagement</h3>
          <div className="infoTab">
            <TabLink to={`/account/${params.account_id}/statistics/${params.channel_id}/tweets`} label="Tweets" />
            <TabLink to={`/account/${params.account_id}/statistics/${params.channel_id}/retweets`} label="Retweets" />
            <TabLink to={`/account/${params.account_id}/statistics/${params.channel_id}/favorites`} label="Favorites" />
            <SubWrapper>
              <TabButton>Weekly</TabButton>
              <TabButton>Monthly</TabButton>
            </SubWrapper>
          </div>
          <div styles="mainInfo" >
            {children}
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
