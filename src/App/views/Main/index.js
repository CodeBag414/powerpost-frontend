/**
 * 
 * Dashboard
 * 
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';
import { createStructuredSelector } from 'reselect';

import Nav from './components/Nav';

import { UserIsAuthenticated } from '../../../config.routes/UserIsAuthenticated';
import {connect} from 'react-redux';
import { makeSelectUser, makeSelectUserAccount, makeSelectSharedAccounts, makeSelectSubAccounts } from '../../state/selectors';
import {checkUser} from '../../state/actions';
import {toggleMenu} from './state/actions';
import { makeSelectMenuCollapsed, makeSelectCurrentAccount } from './state/selectors';
import {logout} from 'App/state/actions';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }
    
    componentWillUpdate() {
        console.log('dashboard will update');
        console.log('children: ' + React.Children.toArray(this.props.children));
    }
    componentDidMount() {
        //this.props.checkUserObject(this.props.user);
    }
    
    handleMenuToggle() {
        this.props.toggleMenuCollapse(!this.props.menuCollapsed);    
    }
    
    render() {
        const styles = require('./views.scss');
        const viewContentStyle = this.props.menuCollapsed ? styles.viewContentCollapsed : styles.viewContentFull;
        
        return(
        <div>
            <Nav userAvatar={ this.props.userAvatar } user={ this.props.user } logout={ this.props.logout } handleMenuToggle={ this.handleMenuToggle } isMenuCollapsed = { this.props.menuCollapsed } activeBrand = { this.props.activeBrand } accountId = { this.props.params.account_id } userAccount = { this.props.userAccount } sharedAccounts = { this.props.sharedAccounts } subAccounts = { this.props.subAccounts } />
            <div className={[viewContentStyle, styles.viewContent].join(' ') } style={{marginTop:'6px'}}>
       
                {React.Children.toArray(this.props.children)}
            </div>
        </div>
    );
    }
}

Dashboard.propTypes = {
    children: React.PropTypes.node,
};

export function mapDispatchToProps(dispatch) {
    return {
        checkUserObject: (user) => dispatch(checkUser(user)),
        toggleMenuCollapse: (isCollapsed) => dispatch(toggleMenu(isCollapsed)),
        logout: () => dispatch(logout())
    };
}
const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    menuCollapsed: makeSelectMenuCollapsed(),
    sharedAccounts: makeSelectSharedAccounts(),
    activeBrand: makeSelectCurrentAccount(),
    subAccounts: makeSelectSubAccounts(),
    userAccount: makeSelectUserAccount(),

});

export default UserIsAuthenticated(connect(mapStateToProps, mapDispatchToProps)(Dashboard));