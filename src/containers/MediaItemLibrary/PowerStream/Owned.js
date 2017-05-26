import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';


import Wrapper from './Wrapper';
import {
  TabBar,
  PostSetBox,
} from './components';

class Owned extends Component {
  render() {
    const tabs = [
      { label: 'Owned Stream', id: '' },
    ];

    return (
      <Wrapper>
        <TabBar tabs={tabs} />
        <PostSetBox />
      </Wrapper>
    );
  }
}

export default UserCanAccount(Owned);
