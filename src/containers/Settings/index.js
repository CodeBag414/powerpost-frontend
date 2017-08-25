/*
 * Settings View
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TabLink from 'elements/atm.TabLink';
import { UserCanSettings } from 'config.routes/UserRoutePermissions';

import styles from './styles.scss';

const Settings = ({ params, children }) => (
  <div>
    <div className={styles.settingsBar}>
      <TabLink to={`/account/${params.account_id}/settings/profile`} label="Profile" />
      <TabLink to={`/account/${params.account_id}/settings/team`} label="Team" />
      <TabLink to={`/account/${params.account_id}/settings/plans`} label="Plans" />
      <TabLink to={`/account/${params.account_id}/settings/connections`} label="Connections" />
    </div>
    <div className={styles.settingsContent}>
      {children}
    </div>
  </div>
);

Settings.propTypes = {
  params: PropTypes.object,
  children: PropTypes.node,
};

export default UserCanSettings(Settings);
