import React from 'react';
import cx from 'classnames';

import {Link} from 'react-router';
import PPMenu from 'App/shared/atm.Menu';
import PPMenuItem from 'App/shared/atm.MenuItem';
import PPMenuDivider from 'App/shared/atm.MenuDivider';
import PPLogo from './PP_Icon.png';
import PPIconButton from 'App/shared/atm.IconButton';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Replace with own Icons eventually
import IconButton from 'material-ui/IconButton';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import ActionViewColumn from 'material-ui/svg-icons/action/view-column';
import ActionList from 'material-ui/svg-icons/action/list';
import ImagePhotoLibrary from 'material-ui/svg-icons/image/photo-library';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ActionOpenInBrowser from 'material-ui/svg-icons/action/open-in-browser';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class Sidebar extends React.Component {
    constructor(props) {
      super(props);
      
        this.renderFull = this.renderFull.bind(this);
        this.renderCollapsed = this.renderCollapsed.bind(this);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        const isPrevPathAccount = this.props.location.pathname.match('/account/');
        const isNextPathAccount = nextProps.location.pathname.match('/account/');
        if(!nextProps.isMenuCollapsed && !isNextPathAccount) {
            this.props.handleMenuToggle({true});
        } else if(nextProps.isMenuCollapsed && isNextPathAccount && !isPrevPathAccount) {
            this.props.handleMenuToggle({false});
        }
        return true;
    }
    
    renderFull() {
        const styles = require('./styles.scss');

        return (
            <div>
                <div className={ styles.brandNav }>
                    <Link to='/'><img src={ PPLogo } alt='Powerpost Logo' style={{ marginTop: "15px" }} /></Link>
                    <div>
                    { this.props.userAccount && 
                        <Link to={'/account/' + this.props.userAccount.account_id } key={ this.props.userAccount.account_id }>
                        <div className={ this.props.accountId == this.props.userAccount.account_id ? styles.activeBrand : styles.brandContainer }>
                       
                            <span>{ this.props.userAccount.title ? this.props.userAccount.title.slice(0,2).toUpperCase() : '' } </span>
                        </div>
                        </Link>
                    }
                    
                    { this.props.subAccounts && this.props.subAccounts.map((account) => 
                        <Link to={'/account/' + account.account_id } key={ account.account_id }>
                        <div className={ this.props.accountId == account.account_id ? styles.activeBrand : styles.brandContainer }>
                          <span> { account.title ? account.title.slice(0,2).toUpperCase() : ''} </span>
                        </div>
                        </Link>
                        )
                    }
                    { this.props.sharedAccounts && this.props.sharedAccounts.map((account) => 
                        <Link to={'/account/' + account.account_id } key={ account.account_id }>
                        <div className={ this.props.accountId == account.account_id ? styles.activeBrand : styles.brandContainer }> 
                              <span> {account.title ? account.title.slice(0,2).toUpperCase() : ''} </span>
                        </div>
                        </Link>
                        )
                    }
                    </div>
                </div>
                <ReactCSSTransitionGroup transitionName={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        leave: styles.leave,
                        leaveActive: styles.leaveActive,
                      }}
                      transitionEnterTimeout={300}
                      transitionLeaveTimeout={300}>
                    { this.props.location.pathname.match('/account/') && 
                        <div className={ styles.mainNav } key='mainNavKey'>
                            <div>
                                <h2 className={ styles.brandTitle }>{ this.props.activeBrand.title } </h2>
                                <PPIconButton style={{ float: 'right', position: 'absolute', top: '14px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/settings' } /> }>
                                    <ActionSettings color="#C9C6CF" />
                                </PPIconButton>
                            </div>
                            <PPMenu width={200} autoWidth={false}>
                                <PPMenuItem primaryText="Library" style={{ width: '200px' }} leftIcon={ <ImagePhotoLibrary color='#C9C6CF' /> } innerDivStyle={{ color: '#C9C6CF', padding: '0px 16px 0px 60px' }} containerElement={ <Link to={ '/account/' + this.props.accountId }/> } />
                                <PPMenuDivider />
                                <PPMenuItem primaryText="Calendar" style={{ width: '200px' }} leftIcon={ <ActionDateRange color='#C9C6CF' />} innerDivStyle={{ color: '#C9C6CF', padding: '0px 16px 0px 60px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/calendar'} /> } />
                                <PPMenuItem primaryText="Workflow" style={{ width: '200px' }} leftIcon={ <ActionViewColumn color='#C9C6CF' /> } innerDivStyle={{ color: '#C9C6CF', padding: '0px 16px 0px 60px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/workflow' } /> } />
                                <PPMenuItem primaryText="List" style={{ width: '200px' }} leftIcon={ <ActionList color='#C9C6CF' /> } innerDivStyle={{ color: '#C9C6CF', padding: '0px 16px 0px 60px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/list' } /> } />
                                <PPMenuDivider />
                                <PPMenuItem primaryText="Statistics" style={{ width: '200px' }} leftIcon={ <EditorInsertChart color='#C9C6CF' /> } innerDivStyle={{ color: '#C9C6CF', padding: '0px 16px 0px 60px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/statistics' }/> } />
                                <PPMenuDivider />
                                <PPMenuItem primaryText="Connections" style={{ width: '200px' }} leftIcon={ <ActionOpenInBrowser color='#C9C6CF' /> } innerDivStyle={{ color: '#C9C6CF', padding: '0px 16px 0px 60px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/connections' } /> } />
                                <PPMenuItem primaryText="Team" style={{ width: '200px' }} leftIcon={ <SocialPeople color='#C9C6CF' /> } innerDivStyle={{ color: '#C9C6CF', padding: '0px 16px 0px 60px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/team' } /> } />
                            </PPMenu>
                        </div>
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
    
    renderCollapsed() {
        const styles = require('./styles.scss');
        return (
                <div className={ styles.mainNavCollapsed }>
                        <div className={ styles.activeBrand } >
                            <span>{ this.props.activeBrand.title ? this.props.activeBrand.title.slice(0,2).toUpperCase() : ''}</span>
                        </div>
                        <PPMenu autoWidth={false} width={60}>
                            <PPMenuItem leftIcon={ <ActionDateRange color='#C9C6CF' />} style={{ width: '60px' }} innerDivStyle={{ color: '#C9C6CF'}} containerElement={ <Link to={ '/account/' + this.props.accountId } /> } />
                            <PPMenuItem leftIcon={ <ActionViewColumn color='#C9C6CF' /> } style={{ width: '60px' }} innerDivStyle={{ color: '#C9C6CF' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/workflow' } /> } />
                            <PPMenuItem leftIcon={ <ActionList color='#C9C6CF' /> } style={{ width: '60px' }} innerDivStyle={{ color: '#C9C6CF'}} containerElement={ <Link to={ '/account/' + this.props.accountId + '/list' } /> } />
                            <PPMenuItem leftIcon={ <ImagePhotoLibrary color='#C9C6CF' /> } style={{ width: '60px' }} innerDivStyle={{ color: '#C9C6CF' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/library' }/> } />
                            <PPMenuItem leftIcon={ <EditorInsertChart color='#C9C6CF' /> } style={{ width: '60px' }} innerDivStyle={{ color: '#C9C6CF'}} containerElement={ <Link to={ '/account/' + this.props.accountId + '/statistics' }/> } />
                            <PPMenuItem leftIcon={ <ActionOpenInBrowser color='#C9C6CF' /> } style={{ width: '60px' }} innerDivStyle={{ color: '#C9C6CF' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/connections' } /> } />
                            <PPMenuItem leftIcon={ <SocialPeople color='#C9C6CF' /> } style={{ width: '60px' }} innerDivStyle={{ color: '#C9C6CF'}} containerElement={ <Link to={ '/account/' + this.props.accountId + '/connections' } /> } />
                        </PPMenu>
                </div>
        );
    }
    
    render() {
        const styles = require('./styles.scss');
        const isAccountPath = this.props.location.pathname.match('/account/');
        let className = cx(styles.sidebar, {
            [styles.collapsed]: this.props.isMenuCollapsed && isAccountPath,
            [styles.userMenu]: this.props.isMenuCollapsed && !isAccountPath
        });
        
        return ( 
             <div className={ className } key='sidebarCollapsed'>
                { this.renderFull()  }
                { this.renderCollapsed() }
            </div>
        );
    }
}

export default Sidebar;