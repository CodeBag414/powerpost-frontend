import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {toastr} from '../../../../../lib/react-redux-toastr';

import PPIconButton from 'App/shared/atm.IconButton';
import PPMenu from 'App/shared/atm.Menu';
import PPMenuItem from 'App/shared/atm.MenuItem';
import PPPopover from 'App/shared/atm.Popover';
import PPAvatar from 'App/shared/atm.Avatar';

class TopNav extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userMenuOpen: false
        };
        
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleTouchTap(event) {
        event.preventDefault();
        
        this.setState({
            userMenuOpen: true,
            anchorEl: event.currentTarget,
        });
    }
    
    handleRequestClose() {
        this.setState({
            userMenuOpen: false
        });
    }
    
    render() {
        const styles = require('./styles.scss');
        const viewStyle = this.props.isMenuCollapsed ? styles.collapsed : styles.full;
        return(
            <div className={[styles.topNav, viewStyle].join(' ')}>
                <PPIconButton iconClassName='fa fa-bars' onClick={ this.props.handleMenuToggle } />
            
                <div className={ styles.userContainer } >
                    <PPAvatar src={ this.props.userAvatar } onClick={ this.handleTouchTap } />
                    <PPPopover
                        open={ this.state.userMenuOpen }
                        anchorEl={ this.state.anchorEl }
                        anchorOrigin={{ horizontal: 'right', vertical:'bottom' }}
                        targetOrigin={{horizontal: 'right', vertical: 'top' }}
                        onRequestClose={this.handleRequestClose }
                    >
                        <PPMenu>
                            <PPMenuItem primaryText="Settings" containerElement={  <Link to={ '/account/' + this.props.accountId + '/user/' + this.props.userAccount.user_id } /> } />
                            <PPMenuItem primaryText="Logout" onClick={ this.props.logout } />
                        </PPMenu>
                        
                    </PPPopover>
                </div>
            </div>
        );
    }
}


export default TopNav;