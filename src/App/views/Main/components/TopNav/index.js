import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {toastr} from '../../../../../lib/react-redux-toastr';

import PPIconButton from 'App/shared/atm.IconButton';
import PPMenu from 'App/shared/atm.Menu';
import PPMenuItem from 'App/shared/atm.MenuItem';
import PPPopover from 'App/shared/atm.Popover';
import PPAvatar from 'App/shared/atm.Avatar';
import PPList from 'App/shared/atm.List';
import PPListItem from 'App/shared/atm.ListItem';
import withReactRouter from 'App/shared/hoc.withReactRouter';

// Replace with own Icons eventually
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);

class TopNav extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userMenuOpen: false
        };
        
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
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
    handleTouch(event) {
        console.log('in handleTouch');
    }
    render() {
        const styles = require('./styles.scss');
        let isAccountPath = this.props.location.pathname.match('/account/');
        
        const viewStyle = this.props.isMenuCollapsed ? styles.collapsed : styles.full;
        const accountStyle = isAccountPath ? styles.accountTopNav : styles.userTopNav;
        
        const avatar = this.props.user && this.props.user.properties ? this.props.user.properties.thumb_url : '';
        return(
            <div className={[styles.topNav, viewStyle, accountStyle ].join(' ')}>
                { isAccountPath &&
                    <PPIconButton inBar={true} onClick={ this.props.handleMenuToggle } >
                    { this.props.isMenuCollapsed ? (
                        <NavigationMenu />
                    ) : (
                        <HardwareKeyboardArrowLeft />
                    )}
                    </PPIconButton>
                }
                <div className={ styles.userContainer } >
                    <PPAvatar src={ avatar } onClick={ this.handleTouchTap } />
                    <PPPopover
                        open={ this.state.userMenuOpen }
                        anchorEl={ this.state.anchorEl }
                        anchorOrigin={{ horizontal: 'left', vertical:'bottom' }}
                        targetOrigin={{horizontal: 'right', vertical: 'top' }}
                        onRequestClose={this.handleRequestClose }
                    >
                        <PPMenu onChange={ this.handleTouch }>
                            <ReactRouterMenuItem caption="Settings" to={ "/user/settings" } />
                            <PPMenuItem caption="Logout" onTouchTap={ this.props.logout } />
                        </PPMenu>
                        
                    </PPPopover>
                </div>
            </div>
        );
    }
}


export default TopNav;