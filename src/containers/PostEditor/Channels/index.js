import React, { Component } from 'react';
import PPButton from 'elements/atm.Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectPostSet,
} from 'containers/PostEditor/selectors';

import NoContent from './NoContent';
import ChannelSlots from './ChannelSlots';
import AddChannelSlotDialog from './AddChannelSlotDialog';
import Wrapper from './Wrapper';

class Channels extends Component {

  static propTypes = {
    postSet: ImmutablePropTypes.map,
  };

  state = { isDialogShown: false };

  handleDialogToggle = () => {
    this.setState({ isDialogShown: !this.state.isDialogShown });
  }

  render() {
    const { postSet } = this.props;
    const { isDialogShown } = this.state;
    const posts = postSet.getIn(['details', 'posts']);
    const hasContent = posts && posts.size;
    const isBunchPosting = postSet.get('bunch_post_fetching');
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
              ? <ChannelSlots postSet={postSet} />
              : <NoContent />
          }
        </div>
        <AddChannelSlotDialog
          handleDialogToggle={this.handleDialogToggle}
          active={isDialogShown}
        />
        {isBunchPosting && <div className="overlay" />}
      </Wrapper>
    );
  }
}

function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  postSet: selectPostSet(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
