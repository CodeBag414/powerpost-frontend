import React from 'react';
import cx from 'classnames';


import {Link} from 'react-router';
import PPMenu from 'App/shared/atm.Menu';
import PPMenuItem from 'App/shared/atm.MenuItem';
import PPMenuDivider from 'App/shared/atm.MenuDivider';
import PPLogo from './PP_Icon.png';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderFull = this.renderFull.bind(this);
        this.renderCollapsed = this.renderCollapsed.bind(this);
    }
    
    renderFull() {
        const styles = require('./styles.scss');
        
        const MainNav = () => {
            return (
                <div className={ styles.mainNav }>
                    <PPMenu>
                        <PPMenuItem primaryText="Calendar" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/calendar' /> } />
                        <PPMenuItem primaryText="Workflow" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/workflow' /> } />
                        <PPMenuItem primaryText="List" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/list' /> } />
                        <PPMenuItem primaryText="Explore" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/explore' /> } />
                        <PPMenuDivider />
                        <PPMenuItem primaryText="Media Item Library" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/library' /> } />
                        <PPMenuItem primaryText="Statistics" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/statistics' /> } />
                        <PPMenuDivider />

                    </PPMenu>
                </div>
            );
        };
        
        const BrandNav = () => {
            return (
                <div className={ styles.brandNav }>
                    <Link to='/'><img src={ PPLogo } alt='Powerpost Logo' style={{ marginTop: "15px" }} /></Link>
                </div>
            );
        };
        
        return (
            <div>
                <div className={ styles.brandNav }>
                    <Link to='/'><img src={ PPLogo } alt='Powerpost Logo' style={{ marginTop: "15px" }} /></Link>
                </div>
                <div className={ styles.mainNav }>
                    <PPMenu>
                        <PPMenuItem primaryText="Calendar" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/calendar' /> } />
                        <PPMenuItem primaryText="Workflow" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/workflow' /> } />
                        <PPMenuItem primaryText="List" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/list' /> } />
                        <PPMenuItem primaryText="Explore" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/explore' /> } />
                        <PPMenuDivider />
                        <PPMenuItem primaryText="Media Item Library" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/library' /> } />
                        <PPMenuItem primaryText="Statistics" innerDivStyle={{ color: 'white' }} containerElement={ <Link to='/statistics' /> } />
                        <PPMenuDivider />

                    </PPMenu>
                </div>
            </div>
        );
    }
    
    renderCollapsed() {
        const styles = require('./styles.scss');
        
        const MainNavCollapsed = () => {
            return (
                <div className={ styles.mainNavCollapsed }>
                    <ul style={{ listStyle: 'none' }}>
                        <li>IC</li>
                        <li>PP</li>
                    </ul>
                </div>
            );
        };
        
        return (
                <div className={ styles.mainNavCollapsed }>
                    <ul style={{ listStyle: 'none' }}>
                        <li>IC</li>
                        <li>PP</li>
                    </ul>
                </div>
        );
    }
    
    render() {
        const styles = require('./styles.scss');
        let className = cx(styles.sidebar, {
            [styles.collapsed]: this.props.isMenuCollapsed
        });
        
        return ( 
             <div className={ className } key='sidebarCollapsed'>
                    { this.props.isMenuCollapsed ? this.renderCollapsed()  : this.renderFull()  }
            </div>
        );
    }
}

export default Sidebar;