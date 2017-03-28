import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

const TabLink = (props) => <Link to={props.to} activeClassName={styles.active} className={styles.tabLinkStyle}>{props.label}</Link>;

TabLink.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
};

export default TabLink;
