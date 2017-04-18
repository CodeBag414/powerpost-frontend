import React, { PropTypes } from 'react';
import Loading from 'react-loading';

import Wrapper from './Wrapper';
import Progress from './Progress';

class ChannelLoading extends React.Component {

  static propTypes = {
    channel: PropTypes.shape({
      type: PropTypes.string,
      channel_icon: PropTypes.string,
      channel: PropTypes.string,
    }).isRequired,
  }

  getType() {
    return this.props.channel.type.split('_')[1];
  }

  render() {
    const { channel } = this.props;
    return (
      <Wrapper>
        <div className="connectionBlock">
          <div className="connectionIcon">
            <i className={`${channel.channel_icon} ${channel.channel}`}></i>
          </div>
          <div style={{ float: 'left' }}>
            <div className="connectionName">
              {channel.display_name}
            </div>
            <div className={channel.channel}>
              {this.getType()[0].toUpperCase() + this.getType().slice(1)}
            </div>
          </div>
        </div>
        <p>We are crunching the numbers!</p>
        <Progress>
          <Loading type="spin" color="#ff0000" />
        </Progress>
      </Wrapper>
    );
  }
}

export default ChannelLoading;
