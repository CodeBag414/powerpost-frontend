/**
 * 
 * App
 * 
 * This component is the skeleton around the actual app and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';

export function App(props) {
    return(
        <div>
            <h1>App container</h1>
            {React.Children.toArray(props.children)}
        </div>
    );
}

App.propTypes = {
    children: React.PropTypes.node,
};

export default App;