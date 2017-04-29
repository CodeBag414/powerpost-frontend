import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import { toastr } from 'lib/react-redux-toastr';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

import {
} from 'containers/App/actions';
import {
} from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import Dropdown from 'elements/atm.Dropdown';
import PPTextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';
import Dialog from 'react-toolbox/lib/dialog';
import TextArea from 'elements/atm.TextArea';

import Wrapper from './Wrapper';

import {
} from '../actions';
import {
} from '../selectors';

const accessLevelOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'edit', label: 'Edit' },
  { value: 'author', label: 'Author' },
  { value: 'review', label: 'Review' },
];

export class Team extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        error: '',
      },
      message: '',
      accessLevel: null,
      inviteModalVisible: false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  onEmailChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      email: {
        value,
      },
    });
  }

  onAccessLevelChange = (option) => {
    this.setState({ accessLevel: option });
  }

  onMessageChange = (ev) => {
    this.setState({
      message: ev.target.value,
    });
  }

  sendInvite = () => {

  }

  toggleModal = () => {
    const { inviteModalVisible } = this.state;
    this.setState({
      inviteModalVisible: !inviteModalVisible,
    });
  }

  render() {
    const { inviteModalVisible } = this.state;

    return (
      <Wrapper>
        <div className="top-row">
          <Button label="Invite New Member" primary onClick={this.toggleModal} />
          <span>19 of 20 remaining</span>
        </div>
        <Dialog
          active={inviteModalVisible}
          title="Invite a new member to Eight Eight"
        >
          <div style={{ position: 'absolute', top: '30px', right: '25px', cursor: 'pointer' }} onClick={this.toggleModal}>&#10005;</div>
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <PPTextField
                type="email"
                name="email"
                hintText="name@domain.com"
                floatingLabelText="Email"
                value={this.state.email.value}
                errorText={this.state.email.error}
                onChange={this.onEmailChange}
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <Dropdown
                label="Access Level"
                value={this.state.accessLevel}
                options={accessLevelOptions}
                placeholder="Select Option"
                onChange={this.onAccessLevelChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <TextArea
                floatingLabelText="I would like you to collaborate with me on PowerPost"
                hintText="Personalize Message"
                rows={3}
                value={this.state.message}
                onChange={this.onMessageChange}
              />
            </div>
          </div>
          <div>
            <span style={{ display: 'inline-block', marginTop: '7px' }}>19 of 20 users are remaining for this plan</span>
            <div style={{ float: 'right' }}>
              <span style={{ cursor: 'pointer', marginRight: '35px' }} onClick={this.toggleModal}>
                Close
              </span>
              <Button label="Send Invite" primary onClick={this.sendInvite} />
            </div>
          </div>
        </Dialog>
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
});

export const mapDispatchToProps = (dispatch) => ({
});

export default UserCanTeam(connect(mapStateToProps, mapDispatchToProps)(Team));
