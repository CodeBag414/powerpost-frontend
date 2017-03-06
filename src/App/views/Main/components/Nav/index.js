import React from 'react';
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';

class Nav extends React.Component {
    render() {
        return (
            <div>
                <Sidebar  {...this.props } />
                <TopNav {...this.props } />
            </div>
        );
    }
}

export default Nav;