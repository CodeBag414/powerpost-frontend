import React, { Component } from 'react';
import {connect} from 'react-redux';

import {logout, clearError} from 'App/state/actions';

class TopNav extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return(
            <button onClick={this.props.logout}>Logout</button>
        );
    }
}

export function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

function mapStateToProps(state) {
    return {
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TopNav);