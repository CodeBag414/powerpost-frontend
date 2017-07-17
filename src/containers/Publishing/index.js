/*
 * Publishing View
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TabLink from 'elements/atm.TabLink';
import styles from './styles.scss';

const Publishing = ({ params, children }) => (
  <div>
    <div className={styles.settingsBar}>
      <TabLink to={`/account/${params.account_id}/calendar`} label="Calendar" />
      <TabLink to={`/account/${params.account_id}/boards`} label="Boards" />
      <TabLink to={`/account/${params.account_id}/social_feeds`} label="Social Feeds" />
    </div>
    <div className={styles.settingsContent}>
      {children}
    </div>
  </div>
);

Publishing.propTypes = {
  children: PropTypes.node,
  params: PropTypes.object,
};

export default Publishing;
