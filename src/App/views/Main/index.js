/**
 * 
 * Dashboard
 * 
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';
import TopNav from './components/TopNav';

export function Dashboard(props) {
    return(
        <div>
            <h1>Dash container</h1>
            <TopNav />
            {React.Children.toArray(props.children)}
        </div>
    );
}

Dashboard.propTypes = {
    children: React.PropTypes.node,
};

export default Dashboard;