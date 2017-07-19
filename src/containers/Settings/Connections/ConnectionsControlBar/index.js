import React from 'react';
import { connect } from 'react-redux';

import PPButton from 'elements/atm.Button';
import Dropdown from 'elements/atm.Dropdown';
import TextField from 'elements/atm.TextField';

const styles = require('./styles.scss');

class ConnectionsControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.setChannelFilter = this.setChannelFilter.bind(this);
    this.setChannelType = this.setChannelType.bind(this);
  }

  setChannelFilter(e) {
    this.props.setChannelFilter(e);
  }

  setChannelType(object) {
    this.props.setChannelType(object.value);
  }

  render() {
    const channelTypes = [{ value: '', label: 'All Channels' }];
    this.props.channels.forEach((channel) => {
      channelTypes.push({ value: channel, label: channel });
    });

    return (
      <div className={['row', styles.mainBlock].join(' ')}>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', styles.noLeftPadding].join(' ')}
        >
          <h3 className={[styles.noMargin, styles.verticalAlign].join(' ')}>Connected Accounts</h3>
        </div>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', styles.noLeftPadding, styles.verticalAlign].join(' ')}
        >
          <PPButton label="Connect a New Channel" primary onClick={this.props.handleDialogToggle} />
        </div>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', 'col-lg-3', styles.noLeftPadding].join(' ')}
        >
          <Dropdown label="" styles={{ textTransform: 'capitalize', height: '36px', marginTop: '-13px' }} placeholder="Filter by Channel" options={channelTypes} onChange={this.setChannelType} value={this.props.channelType} />
        </div>
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-3', 'col-lg-3', styles.noLeftPadding].join(' ')}
        >
          <TextField iconClass="fa fa-search" hintText="Search" style={{ float: 'right', marginTop: '12px', height: '36px' }} onChange={this.setChannelFilter} />
        </div>
      </div>
    );
  }
}

ConnectionsControlBar.propTypes = {
  setChannelFilter: React.PropTypes.func,
  setChannelType: React.PropTypes.func,
  channels: React.PropTypes.array,
  handleDialogToggle: React.PropTypes.func,
  channelType: React.PropTypes.string,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, null)(ConnectionsControlBar);
