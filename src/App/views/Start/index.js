/**
 *
 * Start
 *
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all Start routes
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Start extends React.Component {
  constructor(props) {
    super(props);
    console.log('render');
  }

  render() {
    return (
      <div>
        <h1>Start container</h1>
        { this.props.children }
      </div>
    );
  }
}

Start.propTypes = {
  children: PropTypes.node,
};

function mapStateToProps(state) {
  return {
    auth: state.global,
  };
}

export default connect(mapStateToProps, null)(Start);
