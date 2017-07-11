/**
 *
 * App
 *
 * This component is the skeleton around the actual app and should only contain
 * code that is visible on all app routes
 */

import React from 'react';

import styles from './styles.scss';

const App = ({ children }) => (
  <div className={styles.app}>
    {React.Children.toArray(children)}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
