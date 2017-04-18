import React, { PropTypes } from 'react';

import Wrapper from './Wrapper';

class ChannelsListItem extends React.Component {
  static propTypes = {
    connection: PropTypes.shape({
      type: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
  }
  getType() {
    return this.props.connection.type.split('_')[1];
  }

  getStatusLabel() {
    switch (this.props.connection.status) {
      case '3':
        return <div className="disconnectedLabel"><i className="fa fa-warning"></i> Reconnect</div>;
      default:
        return null;
    }
  }

  render() {
    const { connection } = this.props;
    return (
      <Wrapper>
        <div className="connectionIcon">
          <i className={`${connection.channel_icon} ${connection.channel}`}></i>
        </div>
        <div style={{ float: 'left' }}>
          <div className="connectionName">
            {connection.display_name}
          </div>
          <div className={connection.channel}>
            {this.getType()[0].toUpperCase() + this.getType().slice(1)}
          </div>
        </div>
        <div>
          <div className="controlBlock">
            {this.getStatusLabel()}
          </div>
          <div className="clearBoth"></div>
        </div>
      </Wrapper>
    );
  }
}

export default ChannelsListItem;
