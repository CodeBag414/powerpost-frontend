/**
 * 
 * App
 * 
 * This component is the skeleton around the actual app and should only contain
 * code that is visible on all app routes
 */
 
import React from 'react';

class App extends React.Component{
    
    /*shouldComponentUpdate(nextProps) {
        // performance workaround until react-router-redux fixes https://github.com/reactjs/react-router-redux/issues/481
       // return nextProps.location.action === 'POP';
    }*/
  
    render() {
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