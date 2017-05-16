import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import { Map } from 'immutable';

import Popup from 'components/Popup';
import Avatar from 'elements/atm.Avatar';

import AssignBox from './AssignBox';
import Wrapper from './Wrapper';

class UserAssignment extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    postSet: PropTypes.object,
    assignee: PropTypes.object,
    users: PropTypes.array,
    updatePostSet: PropTypes.func,
  }

  static defaultProps = {
    assignee: new Map(),
  }

  state = {
    userListVisible: false,
  }

  handleClickOutside = () => {
    this.toggleUserList(false);
  }

  handleAssignUser = (userId) => {
    const { postSet } = this.props;
    this.props.updatePostSet({
      ...postSet,
      id: postSet.post_set_id,
      user_assignments: [userId],
    });
    this.toggleUserList(false);
  }

  toggleUserList = (visible) => {
    this.setState({
      userListVisible: typeof visible === 'boolean' ? visible : !this.state.userListVisible,
    });
  }

  render() {
    const { userListVisible } = this.state;
    const { assignee, users } = this.props;

    return (
      <Wrapper>
        <div className="assignee-wrapper" onClick={this.toggleUserList}>
          { assignee.get('user_id') ?
            <Avatar image={''} title={'Bruno'} backgroundColor="green" size={40} isClickable={false} /> :
            <i className="fa fa-user" />
          }
          <div className="right-box">
            <div className="assigned-to">Assigned To</div>
            <div className="name">{assignee.getIn(['user', 'display_name']) || 'Unassigned'}</div>
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
