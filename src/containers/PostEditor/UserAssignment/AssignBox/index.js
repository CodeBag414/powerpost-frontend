import React, { Component, PropTypes } from 'react';

import Search from 'elements/atm.Search';

import Wrapper from './Wrapper';
import UserItem from '../UserItem';

class AssignBox extends Component {
  static propTypes = {
    assignee: PropTypes.object,
    users: PropTypes.array,
    handleAssignUser: PropTypes.func,
  }

  handleSelectUser = (id) => {
    const { assignee, handleAssignUser } = this.props;

    if (assignee.id === id) {
      return;
    }

    handleAssignUser(id);
  }

  render() {
    const { assignee, users } = this.props;

    return (
      <Wrapper>
        <Search placeholder="hey" />
        { users.map((u, index) => (
          <UserItem
            key={index}
            avatarUrl={''}
            name='Bruno'
            selected={u.id === assignee.id}
            onClick={() => this.handleSelectUser(u.id)}
          />
          ))
        }
      </Wrapper>
    );
  }
}

export default AssignBox;
