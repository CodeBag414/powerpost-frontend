/*
 * Account Dashboard
 *
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import PPAvatar from 'elements/atm.Avatar';
import withReactRouter from 'elements/hoc.withReactRouter';

import {
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import Wrapper from './Wrapper';
import Capsule from './capsule';
import SimpleCapsule from './SimpleCapsule';

const ReactRouterSimpleCapsule = withReactRouter(SimpleCapsule);
const ReactRouterCapsule = withReactRouter(Capsule);

class AccountDashboard extends Component {

  state = {
    accountId: null,
  };

  render() {
    const initialAccount = {
      title: '',
      user_access_level: '',
      account_type_id: '',
      account_id: 'me',
      properties: {
        description: '',
        thumb_url: '',
        color: '',
      },
    };
    const account = Object.assign({}, initialAccount, this.props.account);
    const title = account.title || '';
    return (
      <Wrapper>
        <div className="leftPane">
          <div className="avatar-block">
            <div className="avatar">
              <PPAvatar
                size={60}
                title={title}
                image={account.properties.thumb_url}
                backgroundColor={account.properties.color}
              />
            </div>
            <div className="avatar-text">
              <div>
                <h5>{account.title}</h5>
              </div>
              <p>{`Your Role: ${account.user_access_level}`}</p>
            </div>
          </div>
          <h6>{account.properties.description}</h6>
          {
            account.account_type_id === '2' || account.account_type_id === '7' ?
              <ReactRouterSimpleCapsule to={`/account/${account.account_id}/brands`}>
                <h5>Manage Brands</h5>
                <p>Go here to create and manage all of your brands for this account.</p>
              </ReactRouterSimpleCapsule>
            : null
          }
          <ReactRouterSimpleCapsule to={`/account/${account.account_id}/settings/team`}>
            <h5>Manage Team</h5>
            <p>Go here to invite new team members and assign roles.</p>
          </ReactRouterSimpleCapsule>
          <ReactRouterSimpleCapsule to={`/account/${account.account_id}/settings/connections`}>
            <h5>Manage Connections</h5>
            <p>Go here to add and manage connections, such as Facebook and Twitter.</p>
          </ReactRouterSimpleCapsule>
          <ReactRouterSimpleCapsule to={`/account/${account.account_id}/settings`}>
            <h5>Manage Settings</h5>
            <p>Go here to manage this account&apos;s settings, such as the team, connections and plan info.</p>
          </ReactRouterSimpleCapsule>
        </div>
        <div className="rightPane">
          <h4>{`Welcome Back ${title.replace(/^(.{1}[^\s]*).*/, '$1')}!`}</h4>
          <p style={{ marginBottom: '30px' }}>Be everywhere in one click. Connect your high-impact content to specific audiences.</p>

          <ReactRouterCapsule to={`/account/${account.account_id}/library`}>
            <i className="fa fa-database" />
            <span>
              <h5>Planet Content</h5>
              <p>Go here to upload, find and modify content to be used in your posts.</p>
            </span>
          </ReactRouterCapsule>
          <ReactRouterCapsule to={`/account/${account.account_id}/publishing/calendar`}>
            <i className="fa fa-paper-plane" />
            <span>
              <h5>Publishing</h5>
              <p>Go here to prepare and publish posts across your channels.</p>
            </span>
          </ReactRouterCapsule>
          <ReactRouterCapsule to={`/account/${account.account_id}/statistics`}>
            <i className="fa fa-line-chart" />
            <span>
              <h5>Power Score</h5>
              <p>Go here to get a snapshot of how well your posts are performing on your channels.</p>
            </span>
          </ReactRouterCapsule>
          {/* <ReactRouterCapsule to={`/account/${account.account_id}/list`}>
            <span>
              <h5>List</h5>
              <p>Go here to easily view the content of both past and upcoming posts.</p>
            </span>
          </ReactRouterCapsule>
          <ReactRouterCapsule to={`/account/${account.account_id}/workflow`}>
            <span>
              <h5>Workflow</h5>
              <p>Go here to easily view and change the status of your posts.</p>
            </span>
          </ReactRouterCapsule>*/}
          {/* <ReactRouterCapsule to={`/account/${account.account_id}/boards`}>
            <span>
              <h5>Board</h5>
              <p>Go here to easily view and edit the posts.</p>
            </span>
          </ReactRouterCapsule>*/}
        </div>
      </Wrapper>
    );
  }
}

AccountDashboard.propTypes = {
  account: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectCurrentAccount(),
});

export default UserCanAccount(connect(mapStateToProps)(AccountDashboard));
