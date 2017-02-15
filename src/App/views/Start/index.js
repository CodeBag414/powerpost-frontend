/**
 * 
 * Start
 * 
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all Start routes
 */
 
import React from 'react';
import {connect} from 'react-redux';

class Start extends React.Component {
    constructor(props) {
        super(props);
       console.log('render');
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                auth: this.props.auth
            }));
        console.log('rerender of app');
        return(
            <div>
                <h1>Start container</h1>
                 { this.props.children }
            </div>
        );
    }
}

Start.propTypes = {
    children: React.PropTypes.node,
};

function mapStateToProps(state) {
  return {
    auth: state.global
  };     
}

export default connect(mapStateToProps)(Start);