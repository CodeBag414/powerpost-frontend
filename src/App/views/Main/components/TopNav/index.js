import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {logout, clearError} from 'App/state/actions';
import {toastr} from '../../../../../lib/react-redux-toastr';

import PPIconButton from 'App/shared/atm.IconButton';

class TopNav extends Component {
    constructor(props) {
        super(props);
       this.showToastr = this.showToastr.bind(this); 
    }
    
    showToastr() {
        console.log('in show toastr');
        toastr.success('the title', 'the message');
    }
    
    render() {
        const styles = require('./styles.scss');
        const viewStyle = this.props.isMenuCollapsed ? styles.collapsed : styles.full;
        return(
            <div className={[styles.topNav, viewStyle].join(' ')}>
                <PPIconButton iconClassName='fa fa-bars' onClick={ this.props.handleMenuToggle } />
                <Link to={ '/account/' + this.props.accountId + '/user/' + this.props.userAccount.user_id }>User settings</Link>
                <button style={{ float: 'right' }} onClick={this.props.logout}>Logout</button>
                <button onClick={ this.showToastr } type="button">Toastr Test</button>
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