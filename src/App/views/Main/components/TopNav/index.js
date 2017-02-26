import React, { Component } from 'react';
import {connect} from 'react-redux';

import {logout, clearError} from 'App/state/actions';

import PPIconButton from 'App/shared/atm.IconButton';

class TopNav extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const styles = require('./styles.scss');
        const viewStyle = this.props.isMenuCollapsed ? styles.collapsed : styles.full;
        return(
            <div className={[styles.topNav, viewStyle].join(' ')}>
                <PPIconButton iconClassName='fa fa-bars' onClick={ this.props.handleMenuToggle } />
                <button style={{ float: 'right' }} onClick={this.props.logout}>Logout</button>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(TopNav);