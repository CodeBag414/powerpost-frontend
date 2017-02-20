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

        return (
            <div>
                <div className={ styles.brandNav }>
                    <Link to='/'><img src={ PPLogo } alt='Powerpost Logo' style={{ marginTop: "15px" }} /></Link>
                    <div>
                    { this.props.userAccount && 
                        
                        <div className={ (this.props.accountId == this.props.userAccount.account_id) || this.props.accountId == 'me' ? styles.activeBrand : styles.brandContainer }>
                        <Link to={'/account/' + this.props.userAccount.account_id }>
                            <span>{ this.props.userAccount.account_id } </span>
                        </Link>
                        </div>
                    }
                    
                    { this.props.subAccounts && this.props.subAccounts.map((account) => 
                        <div className={ this.props.accountId == account.account_id ? styles.activeBrand : styles.brandContainer } key={ account.account_id }>
                        <Link to={'/account/' + account.account_id }>
                          <span> { account.account_id } </span>
                        </Link>
                        </div>
                        )
                    }
                    { this.props.sharedAccounts && this.props.sharedAccounts.map((account) => 
                        <div className={ this.props.accountId == account.account_id ? styles.activeBrand : styles.brandContainer } key={ account.account_id }> 
                            <Link to={'/account/' + account.account_id }>
                              <span> { account.account_id } </span>
                            </Link>
                        </div>
                        )
                    }
                    </div>
                </div>
                <div className={ styles.mainNav }>
                    <PPMenu>
                        <PPMenuItem primaryText="Calendar" innerDivStyle={{ color: 'white' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/calendar' } /> } />
                        <PPMenuItem primaryText="Workflow" innerDivStyle={{ color: 'white' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/workflow' } /> } />
                        <PPMenuItem primaryText="List" innerDivStyle={{ color: 'white' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/list' } /> } />
                        <PPMenuItem primaryText="Explore" innerDivStyle={{ color: 'white' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/explore' } /> } />
                        <PPMenuDivider />
                        <PPMenuItem primaryText="Media Item Library" innerDivStyle={{ color: 'white' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/library' }/> } />
                        <PPMenuItem primaryText="Statistics" innerDivStyle={{ color: 'white' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/statistics' }/> } />
                        <PPMenuDivider />

                    </PPMenu>
                </div>
            </div>
        );
    }
    
    renderCollapsed() {
        const styles = require('./styles.scss');
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