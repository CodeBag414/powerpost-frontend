import React, { Component } from 'react';
import PPButton from 'elements/atm.Button';
import NoContent from './NoContent';
import ChannelSlots from './ChannelSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';

class Channels extends Component {
  state = { isDialogShown: false };

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  render() {
    const hasContent = false;
    const { isDialogShown } = this.state;
    return (
      <Wrapper>
        <div className="title">Where to Post?</div>
        <PPButton
          label={
            <div>
              <span className="button-plus">+</span>
              <span className="button-title">Add Channel Slot</span>
            </div>
          }
          className="add-button"
          onClick={this.handleDialogToggle}
          primary
        />
        <div className="content">
          {
            hasContent
              ? <ChannelSlots />
              : <NoContent />
          }
        </div>
        <AddChannelSlotDialog
          handleDialogToggle={this.handleDialogToggle}
          active={isDialogShown}
        />
      </Wrapper>
    );
  }
}

export default Channels;
