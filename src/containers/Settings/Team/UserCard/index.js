import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialog from 'react-toolbox/lib/dialog';
import { find } from 'lodash';

import Loading from 'components/Loading';
import Dropdown from 'elements/atm.Dropdown';
import IconMenu, { MenuItem } from 'elements/atm.IconMenu';

import {
  addUserToGroup,
  removeUserFromGroup,
} from 'containers/App/actions';

import Wrapper from './Wrapper';

export class UserCard extends Component {
  static propTypes = {
    processing: PropTypes.bool,
    userId: PropTypes.string,
    groupId: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    accessLevels: PropTypes.array,
    addUserToGroupRequest: PropTypes.func,
    removeUserFromGroupRequest: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.removeUserActions = [
      { label: 'Yes, delete user', onClick: this.handleRemove },
      { label: 'Cancel', onClick: this.toggleRemoveModal },
    ];

    const defaultOption = find(props.accessLevels, { value: props.groupId });
    this.state = {
      accessLevel: defaultOption,
      removeModalVisible: false,
    };
  }

  onAccessLevelChange = (option) => {
    const { userId, addUserToGroupRequest } = this.props;
    this.setState({ accessLevel: option });

    addUserToGroupRequest({
      user_id: userId,
      group_id: option.value,
    });
  }

  handleRemove = () => {
    const { userId, groupId, removeUserFromGroupRequest } = this.props;
    removeUserFromGroupRequest({
      user_id: userId,
      group_id: groupId,
    });
    this.toggleRemoveModal();
  }

  toggleRemoveModal = () => {
    this.setState({
      removeModalVisible: !this.state.removeModalVisible,
    });
  }

  render() {
    const { processing, accessLevels, name, email } = this.props;
    const { accessLevel, removeModalVisible } = this.state;

    return (
      <Wrapper>
        <div className="avatar" />
        <div className="detail-pane">
          <div className="name">{name}</div>
          <div className="email">{email}</div>
          <div className="dropdown-wrapper">
            <Dropdown
              value={accessLevel}
              options={accessLevels}
              placeholder=""
              small
              onChange={this.onAccessLevelChange}
            />
          </div>
          <div className="menu-wrapper">
            <IconMenu icon="more_horizontal" position="topRight" menuRipple>
              <MenuItem className="remove-member" caption="Remove Member" onClick={this.handleRemove} />
            </IconMenu>
          </div>
        </div>
        <Dialog
          active={removeModalVisible}
          actions={this.removeUserActions}
          onEscKeyDown={this.toggleRemoveModal}
          onOverlayClick={this.toggleRemoveModal}
          type="small"
          title="Are you sure that you want to delete this user?"
        />
        { processing && <Loading /> }
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
  addUserToGroupRequest: (payload) => dispatch(addUserToGroup(payload)),
  removeUserFromGroupRequest: (payload) => dispatch(removeUserFromGroup(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
