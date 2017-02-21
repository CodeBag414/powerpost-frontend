import React from 'react';
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';

class Nav extends React.Component {
    render() {
        return (
            <div>
                <Sidebar isMenuCollapsed= { this.props.isMenuCollapsed } activeBrand = { this.props.activeBrand } accountId = { this.props.accountId || 'me' } userAccount = { this.props.userAccount } sharedAccounts = { this.props.sharedAccounts } subAccounts = { this.props.subAccounts } />
                <TopNav userAvatar = { this.props.userAvatar} user={ this.props.user } handleMenuToggle = { this.props.handleMenuToggle } logout={ this.props.logout } accountId = { this.props.accountId || 'me' } userAccount = { this.props.userAccount } isMenuCollapsed= { this.props.isMenuCollapsed }/>
            </div>
        );
    }
}

export default Nav;