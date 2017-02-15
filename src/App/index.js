/**
 * 
 * App
 * 
 * This component is the skeleton around the actual app and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(this.props.children);
        return(
            <div>
                <h1>App container</h1>
                {React.Children.toArray(this.props.children)}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
};


export default App;