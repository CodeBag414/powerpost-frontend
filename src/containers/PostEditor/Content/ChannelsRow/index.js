import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Wrapper from './Wrapper';

import { CHANNELS } from '../constants';

function ChannelsRow({ channelIndex, handleChannelClick }) {
  return (
    <Wrapper currentChannel={channelIndex}>
      <i
        className={classnames('fa fa-home', { enabled: channelIndex < 0 })}
        onClick={() => handleChannelClick(-1)}
      />
      <div className="channels">
        <span className="channel-heading">Customize</span>
        { CHANNELS.map((channel, index) => {
          const color = (channelIndex === index) ? CHANNELS[channelIndex].color : undefined;
          return (
            <i
              key={index}
              className={channel.icon}
              style={{ color }}
              onClick={() => handleChannelClick(index)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
}

ChannelsRow.propTypes = {
  channelIndex: PropTypes.number,
  handleChannelClick: PropTypes.func,
};

export default ChannelsRow;
