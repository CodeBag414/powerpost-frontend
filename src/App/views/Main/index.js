/**
 * 
 * Dashboard
 * 
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';
import { createStructuredSelector } from 'reselect';

import TopNav from './components/TopNav';
import { UserIsAuthenticated } from '../../../config.routes/UserIsAuthenticated';
import {connect} from 'react-redux';
import { makeSelectUser } from '../../state/selectors';
import {checkUser} from '../../state/actions';

class Dashboard extends React.Component{
    
    componentDidMount() {
        this.props.checkUserObject(this.props.user);
    }
    
    render() {
        return(
        <div>
            <h1>Dash container</h1>
            <TopNav />
            {React.Children.toArray(this.props.children)}
        </div>
    );
    }
}

Dashboard.propTypes = {
    children: React.PropTypes.node,
};

export function mapDispatchToProps(dispatch) {
    return {
        checkUserObject: (user) => dispatch(checkUser(user))
    }
}
const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});

export default UserIsAuthenticated(connect(mapStateToProps, mapDispatchToProps)(Dashboard));