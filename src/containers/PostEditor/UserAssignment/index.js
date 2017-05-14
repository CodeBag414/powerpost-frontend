import React, { Component, PropTypes } from 'react';
import enhanceWithClickOutside from 'react-click-outside';

import Popup from 'components/Popup';
import Avatar from 'elements/atm.Avatar';

import AssignBox from './AssignBox';
import Wrapper from './Wrapper';

class UserAssignment extends Component {
  static propTypes = {
    assignee: PropTypes.object,
    users: PropTypes.array,
  }

  static defaultProps = {
    assignee: {},
  }

  state = {
    userListVisible: false,
  }

  handleClickOutside = () => {
    this.toggleUserList(false);
  }

  handleAssignUser = () => {
    // api call
    this.toggleUserList(false);
  }

  toggleUserList = (visible) => {
    this.setState({
      userListVisible: typeof visible === 'boolean' ? visible : !this.state.userListVisible,
    });
  }

  render() {
    const { userListVisible } = this.state;
    const { assignee, users = [{id: 3}, {id: 5}]} = this.props;

    return (
      <Wrapper>
        <div className="assignee-wrapper" onClick={this.toggleUserList}>
          { assignee.id ?
            <Avatar image={''} title={'Bruno'} backgroundColor="green" size={40} isClickable={false} /> :
            <i className="fa fa-user" />
          }
          <div className="right-box">
            <div className="assigned-to">Assigned To</div>
            <div className="name">{assignee.name || 'Unassigned'}</div>
          </div>
        </div>
        { userListVisible &&
          <Popup>
            <AssignBox
              users={users}
              assignee={assignee}
              handleAssignUser={this.handleAssignUser}
            />
          </Popup>
        }
      </Wrapper>
    );
  }
}

export default enhanceWithClickOutside(UserAssignment);
