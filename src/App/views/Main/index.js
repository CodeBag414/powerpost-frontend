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
import { makeSelectUser, makeSelectUserAccount, makeSelectSharedAccounts, makeSelectSubAccounts, makeSelectUserAvatar } from '../../state/selectors';
import {checkUser, logout} from '../../state/actions';
import {toggleMenu} from './state/actions';
import { makeSelectMenuCollapsed, makeSelectCurrentAccount } from './state/selectors';

class Main extends React.Component{
    constructor(props) {
        super(props);
        
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }
    
    componentWillUpdate() {
        console.log('dashboard will update');
       // console.log('children: props: ' + this.props.children.props );
    }
    componentDidMount() {
        //this.props.checkUserObject(this.props.user);
    }
    
    handleMenuToggle() {
        this.props.toggleMenuCollapse(!this.props.menuCollapsed);    
    }
    
    render() {
        const styles = require('./styles.scss');
        const viewContentStyle = this.props.menuCollapsed ? styles.viewContentCollapsed : styles.viewContentFull;
        console.log('userAvatar: ' + this.props.userAvatar);
        return(
        <div>
            <Nav location={ this.props.location } logout={ this.props.logout } user={ this.props.user } handleMenuToggle={ this.handleMenuToggle } isMenuCollapsed = { this.props.menuCollapsed } activeBrand = { this.props.activeBrand } accountId = { this.props.params.account_id } userAccount = { this.props.userAccount } sharedAccounts = { this.props.sharedAccounts } subAccounts = { this.props.subAccounts } />
            <div className={[viewContentStyle, styles.viewContent].join(' ') }>
                <h1>Dash container</h1>
                { this.props.children }
            </div>
        </div>
    );
    }
}

Main.propTypes = {
    children: React.PropTypes.node,
};

export function mapDispatchToProps(dispatch) {
    return {
        checkUserObject: (user) => dispatch(checkUser(user)),
        toggleMenuCollapse: (isCollapsed) => dispatch(toggleMenu(isCollapsed)),
        logout: () => dispatch(logout())
    };
}

const mapStateToProps = (initialState, initialProps) => {
    const selectUser = makeSelectUser();
    const selectMenuCollapsed = makeSelectMenuCollapsed();
    const selectSharedAccounts = makeSelectSharedAccounts();
    const selectActiveBrand = makeSelectCurrentAccount();
    const selectSubAccounts = makeSelectSubAccounts();
    const selectUserAccount = makeSelectUserAccount();
    const selectUserAvatar = makeSelectUserAvatar();
    return (state, ownProps) => ({
        user: selectUser(state),
        menuCollapsed: selectMenuCollapsed(state),
        sharedAccounts: selectSharedAccounts(state),
        activeBrand: selectActiveBrand(state),
        subAccounts: selectSubAccounts(state),
        userAccount: selectUserAccount(state),
        userAvatar: selectUserAvatar(state),
        location: ownProps.location
    });
};

export default UserIsAuthenticated(connect(mapStateToProps, mapDispatchToProps)(Main));