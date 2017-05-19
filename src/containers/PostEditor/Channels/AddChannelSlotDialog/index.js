import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PPDialog from 'elements/atm.Dialog';
import PPButton from 'elements/atm.Button';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
// import ImmutablePropTypes from 'react-immutableproptypes';
import {
  makeSelectAccountConnections,
} from 'containers/Main/selectors';
import ChannelsBlock from './ChannelsBlock';
import SchedulesBlock from './SchedulesBlock';
import Wrapper from './Wrapper';

class AddChannelSlotDialog extends Component {

  static propTypes = {
    active: PropTypes.bool,
    handleDialogToggle: PropTypes.func,
  };

  state = {
    isPostUponReady: false,
    scheduleTimes: [new Date().getTime() + 3000000],
    channels: [],
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      channels: nextProps.connections.map((connection) => ({
        checked: false,
        connection: fromJS(connection),
      })),
    });
  }

  onChangeScheduleTimes = (scheduleTimes) => {
    this.setState({ scheduleTimes });
  }

  onChangeChannelsState = (channels) => {
    this.setState({ channels });
  }

  submitPosts = () => {
    console.log(this.state.channels);
  }

  render() {
    const { active, handleDialogToggle } = this.props;
    const { isPostUponReady, scheduleTimes, channels } = this.state;

    return (
      <PPDialog
        active={active}
        onOverlayClick={handleDialogToggle}
        onEscKeyDown={handleDialogToggle}
      >
        <Wrapper>
          <div className="heading">
            <div className="title">Schedule Post</div>
            <div className="close-button" onClick={handleDialogToggle}>×</div>
          </div>
          <div className="instruction">
            Set the date, time and channels.
          </div>
          <div className="post-style" onClick={() => this.setState({ isPostUponReady: !isPostUponReady })}>
            { isPostUponReady ? 'Schedule Post' : 'Post Upon Ready' }
          </div>
          <div className="main-content">
            {
              isPostUponReady ||
              <div className="schedules-block">
                <SchedulesBlock
                  onChangeScheduleTimes={this.onChangeScheduleTimes}
                  scheduleTimes={scheduleTimes}
                />
              </div>
            }
            <div className="channels-block">
              <ChannelsBlock
                onChangeChannelsState={this.onChangeChannelsState}
                channels={channels}
              />
            </div>
          </div>
          <PPButton
            label="Schedule Selected Channels"
            className="schedule-selected-channels"
            onClick={this.submitPosts}
            primary
          />
        </Wrapper>
      </PPDialog>
    );
  }
}

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  connections: makeSelectAccountConnections(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChannelSlotDialog);
