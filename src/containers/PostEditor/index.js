/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// FIXME: Should be changed to UserCanPostEdit
import { UserCanPostSet } from 'config.routes/UserRoutePermissions';

import TabLink from 'elements/atm.TabLink';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';

class PostEdtior extends Component {

  static propTypes = {
    params: PropTypes.shape({
      account_id: PropTypes.string,
      postset_id: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { params } = this.props;
    return (
      <Wrapper>
        <GeneralInfo />
        <div>
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/content`} label="Content" />
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/channels`} label="Channels & Times" />
        </div>
      </Wrapper>
    );
  }
}

export default UserCanPostSet(PostEdtior);
