import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find } from 'lodash';

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
import UserCard from './UserCard';

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
      accessLevels: [],
      inviteModalVisible: false,
    };
  }

  componentDidMount() {
    const { userAccount } = this.props;

    const payload = { accountId: userAccount.account_id };

    this.props.fetchGroupUsers(payload);
  }

  componentWillReceiveProps(nextProps) {
    const { groupUsers } = nextProps;
    if (this.props.groupUsers !== groupUsers) {
      if (!groupUsers.isFecthing && groupUsers.details) {
        const newAccessLevels = accessLevelOptions.map((l) => {
          const group = find(groupUsers.details.groups || [], { title: l.value });
          return {
            value: group.group_id,
            label: l.label,
          };
        });

        this.setState({
          accessLevels: newAccessLevels,
        });
      }
    }
  }

  onEmailChange = (event) => {
    const { value } = event.target;
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
    const { inviteEmailToGroupRequest } = this.props;
    const { email, accessLevel, message } = this.state;

    const payload = {
      email: email.value,
      group_id: accessLevel.value,
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
    const { inviteModalVisible, email, accessLevel, accessLevels } = this.state;

    if (groupUsers.isFetching || !groupUsers.details) {
      return <Loading />;
    }

    return (
      <Wrapper>
        <div className="top-row">
          <Button label="Invite New Member" primary onClick={this.toggleModal} />
          <span>{userAccount.num_users - groupUsers.details.groups_users.length} of {userAccount.num_users} Users Remaining for this Plan</span>
        </div>
        { groupUsers.details.groups_users.map((u) =>
          <UserCard
            key={u.user_id}
            groupId={u.group_id}
            userId={u.user_id}
            email={u.email}
            name={u.display_name}
            processing={u.processing}
            accessLevels={accessLevels}
          />
        )}

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
                options={groupUsers.isFetching || groupUsers.error ? [] : accessLevelOptions}
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
