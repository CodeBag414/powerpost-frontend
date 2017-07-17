/**
 *
 * App
 *
 * This component is the skeleton around the actual app and should only contain
 * code that is visible on all app routes
 */

import React from 'react';

import Wrapper from './Wrapper';

const App = ({ children }) => (
  <Wrapper>
    {React.Children.toArray(children)}
  </Wrapper>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
