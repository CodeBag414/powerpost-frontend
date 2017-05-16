import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Search from 'elements/atm.Search';

import Wrapper from './Wrapper';
import UserItem from '../UserItem';

class AssignBox extends Component {
  static propTypes = {
    assignee: PropTypes.object, // Immutable Map
    users: PropTypes.array, // Array of JS pure objects
    handleAssignUser: PropTypes.func,
  }

  handleSelectUser = (id) => {
    const { assignee, handleAssignUser } = this.props;

    if (assignee.get('user_id') === id) {
      return;
    }

    handleAssignUser(id);
  }

  render() {
    const { assignee, users } = this.props;

    return (
      <Wrapper>
        <Search placeholder="hey" />
        { users.map((u) => (
          <UserItem
            key={u.user_id}
            avatarUrl={get(u, 'user.properties.thumb_url')}
            name={u.display_name}
            selected={u.user_id === assignee.get('user_id')}
            onClick={() => this.handleSelectUser(u.user_id)}
          />
          ))
        }
      </Wrapper>
    );
  }
}

export default AssignBox;
