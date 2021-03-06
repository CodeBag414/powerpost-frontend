import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'react-toolbox/lib/checkbox';
import _ from 'lodash';
import classNames from 'classnames';

import Wrapper from './Wrapper';

class ChannelsBlock extends Component {

  static propTypes = {
    channels: PropTypes.array,
    hasImage: PropTypes.bool,
    onChangeChannelsState: PropTypes.func,
  };

  state = { selectAll: false };

  handleSelectAllChange = (selectAll) => {
    const { channels, onChangeChannelsState } = this.props;
    const newChannels = channels.map((channel) => ({
      ...channel,
      checked: selectAll,
    }));
    onChangeChannelsState(newChannels);
    this.setState({ selectAll });
  }

  handleSelectChange = (index, checked) => {
    const { channels, onChangeChannelsState } = this.props;
    const newChannels = channels.slice();
    newChannels[index].checked = checked;
    onChangeChannelsState(newChannels);
  }

  normalizeType = (type) => type.split('_').map((str) => _.upperFirst(str)).join(' ')

  render() {
    const { channels, hasImage } = this.props;
    const { selectAll } = this.state;
    return (
      <Wrapper>
        <div className="channels-heading">
          <div className="instruction">Channels</div>
          <Checkbox
            checked={selectAll}
            label="Schedule All"
            className={selectAll ? 'checked' : ''}
            onChange={this.handleSelectAllChange}
          />
        </div>
        {
          channels.map((channel, index) =>
            <div className={_.compact(['channel-wrapper', index || 'top']).join(' ')} key={index}>
              <Checkbox
                checked={channel.checked}
                className={classNames({
                  disabled: channel.connection.get('channel') === 'pinterest' && !hasImage,
                  checked: channel.checked,
                })}
                disabled={channel.connection.get('channel') === 'pinterest' && !hasImage}
                onChange={(checked) => this.handleSelectChange(index, checked)}
              />
              <div className="content">
                <div className={`${channel.connection.get('channel')} connection-icon`}>
                  <i className={channel.connection.get('channel_icon')}></i>
                </div>
                <div className="connection-description">
                  <div className="display-name">{ channel.connection.get('display_name') || channel.connection.get('blogName') }</div>
                  {/* <div className="type">{ this.normalizeType(channel.connection.get('type')) }</div> */}
                </div>
              </div>
            </div>
          )
        }
      </Wrapper>
    );
  }
}

export default ChannelsBlock;
