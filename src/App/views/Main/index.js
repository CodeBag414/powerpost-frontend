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
import { makeSelectUser, makeSelectAllAccounts, makeSelectUserAccount } from '../../state/selectors';
import {checkUser} from '../../state/actions';
import {toggleMenu} from './state/actions';
import { makeSelectMenuCollapsed } from './state/selectors';

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
        this.props.checkUserObject(this.props.user);
    }
    
    handleMenuToggle() {
        this.props.toggleMenuCollapse(!this.props.menuCollapsed);    
    }
    
    render() {
        const styles = require('./styles.scss');
        const viewContentStyle = this.props.menuCollapsed ? styles.viewContentCollapsed : styles.viewContentFull;
        
        return(
        <div>
            <Nav handleMenuToggle={ this.handleMenuToggle } isMenuCollapsed = { this.props.menuCollapsed } />
            <div className={[viewContentStyle, styles.viewContent].join(' ') }>
                <h1>Dash container</h1>
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
        toggleMenuCollapse: (isCollapsed) => dispatch(toggleMenu(isCollapsed))
    };
}
const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    menuCollapsed: makeSelectMenuCollapsed(),
    allAccounts: makeSelectAllAccounts(),
    userAccount: makeSelectUserAccount(),
});

export default UserIsAuthenticated(connect(mapStateToProps, mapDispatchToProps)(Dashboard));