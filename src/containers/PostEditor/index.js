/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UserCanPostEdit } from 'config.routes/UserRoutePermissions';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';
import TabLink from './TabLink';

class PostEdtior extends Component {

  static propTypes = {
    params: PropTypes.shape({
      account_id: PropTypes.string,
      postset_id: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
  };

  render() {
    const { params, children } = this.props;
    return (
      <Wrapper>
        <GeneralInfo />
        <div>
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/content`} label="Content" />
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/channels`} label="Channels & Times" count={0} />
          <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/streams`} label="Shared Streams" />
        </div>
        {children}
      </Wrapper>
    );
  }
}

export default UserCanPostEdit(PostEdtior);
