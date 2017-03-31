/**
 *
 * App
 *
 * This component is the skeleton around the actual app and should only contain
 * code that is visible on all app routes
 */

import React from 'react';

class App extends React.Component {
  componentWillUpdate() {

  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};


export default App;
