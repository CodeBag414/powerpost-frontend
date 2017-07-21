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
          className={['col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-4', styles.noLeftPadding, styles.verticalAlign].join(' ')}
        >
          <PPButton label="Connect a New Channel" primary onClick={this.props.handleDialogToggle} />
        </div>
        <div className="col-lg-2 col-md-2" />
        <div
          className={['col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-6', styles.noLeftPadding].join(' ')}
        >
          <TextField iconClass="fa fa-search" hintText="Search" style={{ marginLeft: '40px', float: 'right', marginTop: '12px', height: '36px' }} onChange={this.setChannelFilter} />
          <Dropdown label="" styles={{ width: '160px', textTransform: 'capitalize', height: '36px', marginTop: '-13px', float: 'right' }} placeholder="Filter by Channel" options={channelTypes} onChange={this.setChannelType} value={this.props.channelType} />
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
