import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PPDialog from 'elements/atm.Dialog';

import Wrapper from './Wrapper';

class AddChannelSlotDialog extends Component {

  static propTypes = {
    active: PropTypes.bool,
    handleDialogToggle: PropTypes.func,
  }

  createChannelSlot = (content) => {
    console.log(content);
  }

  render() {
    const { active, handleDialogToggle } = this.props;

    return (
      <PPDialog
        active={active}
        onOverlayClick={handleDialogToggle}
        onEscKeyDown={handleDialogToggle}
      >
        <Wrapper>
          <div className="heading">
            <div className="title">Schedule Post</div>
            <div className="close-button">×</div>
          </div>
          <div className="instruction">
            Set the date, time and channels.
          </div>
          <div className="post-on-ready">
            Post Upon Ready
          </div>
        </Wrapper>
      </PPDialog>
    );
  }
}

export default AddChannelSlotDialog;
