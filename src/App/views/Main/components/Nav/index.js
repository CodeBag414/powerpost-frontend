import React from 'react';
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';

class Nav extends React.Component {
    
    render() {
        return (
            <div>
                <Sidebar isMenuCollapsed= { this.props.isMenuCollapsed }/>
                <TopNav handleMenuToggle = { this.props.handleMenuToggle } isMenuCollapsed= { this.props.isMenuCollapsed }/>
            </div>
        );
    }
}

export default Nav;