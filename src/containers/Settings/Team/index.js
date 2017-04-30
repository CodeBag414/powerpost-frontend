import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find } from 'lodash';
import { browserHistory } from 'react-router';

import { toastr } from 'lib/react-redux-toastr';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

import {
  fetchGroupUsers,
  inviteEmailToGroup,
} from 'containers/App/actions';
import {
  selectGroupUsers,
  selectInviteEmailToGroup,
} from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import Loading from 'components/Loading';

import Dropdown from 'elements/atm.Dropdown';
import PPTextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';
import Dialog from 'react-toolbox/lib/dialog';
import TextArea from 'elements/atm.TextArea';

import Wrapper from './Wrapper';

const accessLevelOptions = [
  { value: 'admins', label: 'Admin' },
  { value: 'editors', label: 'Editor' },
  { value: 'viewers', label: 'Viewer' },
  { value: 'reviewers', label: 'Reviewer' },
];

export class Team extends Component {
  static propTypes = {
    userAccount: PropTypes.object,
    groupUsers: PropTypes.object,
    inviteEmailToGroup: PropTypes.object,
    fetchGroupUsers: PropTypes.func,
    inviteEmailToGroupRequest: PropTypes.func,
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
    const { userAccount } = this.props;

    const payload = { accountId: userAccount.account_id };

    this.props.fetchGroupUsers(payload);
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
    const { groupUsers, inviteEmailToGroupRequest } = this.props;
    const { email, accessLevel, message } = this.state;
    const group = find(groupUsers.details, { title: accessLevel.value });

    if (!group) {
      throw Error('Something is wrong with group');
    }

    const payload = {
      email: email.value,
      group_id: group.group_id,
      message,
    };

    inviteEmailToGroupRequest(payload);
  }

  toggleModal = () => {
    const { inviteModalVisible } = this.state;
    this.setState({
      inviteModalVisible: !inviteModalVisible,
    });
  }

  render() {
    const { userAccount, groupUsers, inviteEmailToGroup } = this.props;
    const { inviteModalVisible, email, accessLevel } = this.state;

    return (
      <Wrapper>
        <div className="top-row">
          <Button label="Invite New Member" primary onClick={this.toggleModal} />
          <span>19 of 20 remaining</span>
        </div>
        <Dialog
          active={inviteModalVisible}
          title={`Invite a new member to ${userAccount.title}`}
        >
          <div style={{ position: 'absolute', top: '30px', right: '25px', cursor: 'pointer' }} onClick={this.toggleModal}>&#10005;</div>
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <PPTextField
                type="email"
                name="email"
                hintText="name@domain.com"
                floatingLabelText="Email"
                value={email.value}
                errorText={email.error}
                onChange={this.onEmailChange}
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <Dropdown
                label="Access Level"
                value={accessLevel}
                options={groupUsers.isFetching ? [] : accessLevelOptions}
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
              <Button label="Send Invite" primary onClick={this.sendInvite} disabled={email.error || !accessLevel} />
            </div>
          </div>
          { inviteEmailToGroup.isFetching && <Loading /> }
        </Dialog>
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectCurrentAccount(),
  groupUsers: selectGroupUsers(),
  inviteEmailToGroup: selectInviteEmailToGroup(),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchGroupUsers: (payload) => dispatch(fetchGroupUsers(payload)),
  inviteEmailToGroupRequest: (payload) => dispatch(inviteEmailToGroup(payload)),
});

export default UserCanTeam(connect(mapStateToProps, mapDispatchToProps)(Team));
