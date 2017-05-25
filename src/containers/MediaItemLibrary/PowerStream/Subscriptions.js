import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import Wrapper from './Wrapper';
import {
  TabBar,
} from './components';

class Subscriptions extends Component {
  render() {
    const tabs = [
      { label: '1', id: '1' },
      { label: '2', id: '2' },
    ]
    return (
      <Wrapper>
        <TabBar tabs={tabs} />
      </Wrapper>
    );
  }
}

export default UserCanAccount(Subscriptions);
