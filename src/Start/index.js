/**
 * 
 * Start
 * 
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';

export function Start(props) {
    return(
        <div>
            <h1>Start container</h1>
            {React.Children.toArray(props.children)}
        </div>
    );
}

Start.propTypes = {
    children: React.PropTypes.node,
};

export default Start;