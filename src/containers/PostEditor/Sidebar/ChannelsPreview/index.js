import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SmoothCollapse from 'react-smooth-collapse';

import SocialIcon from 'elements/atm.SocialIcon';
import Heading from 'components/Heading';

import SectionWrapper from '../SectionWrapper';

function connectionFromId(connections, id) {
  return connections.find((c) => c.connection_id === id);
}

export function buildChannelList(connections, posts) {
  if (!connections || !posts) return null;

  const uniqueChannels = {};
  posts.forEach((post) => {
    if (post.get('status') === '0') return;
    const connection = connectionFromId(connections, post.get('connection_id'));
    if (connection && connection.channel) {
      uniqueChannels[connection.channel] = connection;
    }
  });

  const channels = Object.keys(uniqueChannels);
  if (!channels || channels.length === 0) return <span>No channels chosen.</span>;

  const channelList = channels.map((channel) =>
    <SocialIcon icon={uniqueChannels[channel].channel_icon} />);
  return channelList;
}

class ChannelsPreview extends Component {
  static propTypes = {
    connections: PropTypes.array,
    postSet: ImmutablePropTypes.map,
  };

  state = {
    isExpanded: false,
  };

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  render() {
    const { isExpanded } = this.state;
    const { connections, postSet } = this.props;
    return (
      <SectionWrapper>
        <Heading
          title="Channels"
          icon="send-o"
          iconColor="#ABE66A"
          expand={this.expand}
          isExpanded={isExpanded}
        />
        <SmoothCollapse expanded={isExpanded}>
          <div style={{ paddingBottom: '16px', paddingTop: '10px' }}>
            {buildChannelList(connections, postSet.getIn(['data', 'posts']))}
          </div>
        </SmoothCollapse>
        <div style={{ marginTop: '-16px' }} />
      </SectionWrapper>
    );
  }
}

export default ChannelsPreview;
