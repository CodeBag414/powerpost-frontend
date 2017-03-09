import React from 'react';
import cx from 'classnames';

import {Link} from 'react-router';
import PPMenu from 'App/shared/atm.Menu';
import PPMenuItem from 'App/shared/atm.MenuItem';
import PPMenuDivider from 'App/shared/atm.MenuDivider';
import PPLogo from './PP_Icon.png';
import PPIconButton from 'App/shared/atm.IconButton';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import withReactRouter from 'App/shared/hoc.withReactRouter';

// Replace with own Icons eventually
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import ActionViewColumn from 'material-ui/svg-icons/action/view-column';
import ActionList from 'material-ui/svg-icons/action/list';
import ImagePhotoLibrary from 'material-ui/svg-icons/image/photo-library';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ActionOpenInBrowser from 'material-ui/svg-icons/action/open-in-browser';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionSettings from 'material-ui/svg-icons/action/settings';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);

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
                    <div className={ styles.powerpostLogoContainer } >
                        <Link to='/'><img src={ PPLogo } alt='Powerpost Logo' style={{ marginTop: "15px" }} /></Link>
                    </div>
                    <div>
                    { this.props.userAccount && this.props.userAccount.account_type_id != 5 &&
                        <Link to={'/account/' + this.props.userAccount.account_id } key={ this.props.userAccount.account_id }>
                        <div className={ this.props.accountId == this.props.userAccount.account_id ? styles.activeBrand : styles.brandContainer }>
                       
                            <span>{ this.props.userAccount.title ? this.props.userAccount.title.slice(0,2).toUpperCase() : '' } </span>
                            { this.props.userAccount.account_type_id == 2 &&
                                    <IconMenu
                                        iconButtonElement={<IconButton iconStyle={{ width: '20px', height: '20px' }} style={{ width: '20px', height: '20px', position: 'absolute', top: '0', left: '0', padding: '0' }}><ContentAdd color="white" /></IconButton> }
                                        style={{ width: '20px', height: '20px', backgroundColor: '#00d2AF', position: 'absolute', right: '-5px', borderRadius: '5px', bottom: '-10px' }}
                                    >
                                        <Subheader>Main Brand</Subheader>
                                        <ReactRouterMenuItem isSidebar caption={ this.props.userAccount.title }  to={ '/account/' + this.props.userAccount.account_id } />
                                        <Subheader>Sub Accounts</Subheader>
                                        { this.props.userAccount.subaccounts && this.props.userAccount.subaccounts.map((subAccount) => 
                                            <ReactRouterMenuItem key={subAccount.account_id} caption={ subAccount.title } to={ '/account/' + subAccount.account_id } />
                                        )}
                                    </IconMenu>
                            }
                        </div>
                        </Link>
                    }

                    { this.props.sharedAccounts && this.props.sharedAccounts.map((account) => 
                        <Link to={'/account/' + account.account_id } key={ account.account_id }>
                        <div className={ this.props.accountId == account.account_id ? styles.activeBrand : styles.brandContainer }> 
                              <span> {account.title ? account.title.slice(0,2).toUpperCase() : ''} </span>
                                { account.account_type_id == 2 &&
                                    <IconMenu
                                        iconButtonElement={<IconButton iconStyle={{ width: '20px', height: '20px' }} style={{ width: '20px', height: '20px', position: 'absolute', top: '0', left: '0', padding: '0' }}><ContentAdd color="white" /></IconButton> }
                                        style={{ width: '20px', height: '20px', backgroundColor: '#00d2AF', position: 'absolute', right: '-5px', borderRadius: '5px', bottom: '-10px' }}
                                    >
                                        <Subheader>Main Brand</Subheader>
                                        <ReactRouterMenuItem isSidebar caption={ account.title } to={ '/account/' + account.account_id } />
                                        <Subheader>Sub Accounts</Subheader>
                                        { account.subaccounts && account.subaccounts.map((subAccount) => 
                                            <ReactRouterMenuItem key={subAccount.account_id} caption={ subAccount.title } to={ '/account/' + subAccount.account_id } />
                                        )}
                                    </IconMenu>
                                }
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
                                { this.props.accountPermissions && this.props.accountPermissions.indexOf('settings') > -1 &&
                                <PPIconButton style={{ float: 'right', position: 'absolute', top: '14px' }} containerElement={ <Link to={ '/account/' + this.props.accountId + '/settings' } /> }>
                                    <ActionSettings color="#C9C6CF" />
                                </PPIconButton>
                                }
                            </div>
                            <PPMenu isSidebar selectable={true}>
                                <ReactRouterMenuItem caption="Library" isSidebar icon={ <ImagePhotoLibrary color='#C9C6CF' /> }  to={ '/account/' + this.props.accountId } />
                                <PPMenuDivider />
                                <ReactRouterMenuItem caption="Calendar" isSidebar icon={ <ActionDateRange color='#C9C6CF' />} to={ '/account/' + this.props.accountId + '/calendar'} />
                                <ReactRouterMenuItem caption="Workflow"  isSidebar icon={ <ActionViewColumn color='#C9C6CF' /> } to={ '/account/' + this.props.accountId + '/workflow' } />
                                <ReactRouterMenuItem caption="List" isSidebar icon={ <ActionList color='#C9C6CF' /> } to={ '/account/' + this.props.accountId + '/list' } />
                                { this.props.accountPermissions && this.props.accountPermissions.indexOf('statistics') > -1 &&
                                    <div>
                                        <PPMenuDivider />
                                        <ReactRouterMenuItem caption="Statistics" isSidebar icon={ <EditorInsertChart color='#C9C6CF' /> } to={ '/account/' + this.props.accountId + '/statistics' } />
                                    </div>
                                }
                                { this.props.accountPermissions && this.props.accountPermissions.indexOf('connections') > -1 &&
                                    <div>
                                        <PPMenuDivider />
                                        <ReactRouterMenuItem caption="Connections" isSidebar icon={ <ActionOpenInBrowser color='#C9C6CF' />}  to={ '/account/' + this.props.accountId + '/connections' } />
                                    </div>
                                }
                                { this.props.accountPermissions && this.props.accountPermissions.indexOf('team') > -1 &&
                                    <ReactRouterMenuItem caption="Team" isSidebar icon={ <SocialPeople color='#C9C6CF' /> }  to={ '/account/' + this.props.accountId + '/team' } />
                                }
                                
                                { this.props.activeBrand.account_type_id == 2 && 
                                    <Subheader style={{ color: '#C9C6CF' }}>Sub Accounts</Subheader>
                                }
                                { this.props.activeBrand.subAccounts && this.props.activeBrand.subAccounts.map((account) => 
                                    <Link to={'/account/' + account.account_id } key={ account.account_id }>
                                        <div className={ styles.subBrandContainer }> 
                                              <span> {account.title ? account.title.slice(0,2).toUpperCase() : ''} </span>
                                        </div>
                                    </Link>      
                                    )
                                }
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
                        <PPMenu isSidebar>
                            <ReactRouterMenuItem isSidebar icon={ <ImagePhotoLibrary style={{ marginLeft: '14px' }} color='#C9C6CF' /> } style={{ width: '60px' }} to={ '/account/' + this.props.accountId }/>
                            <ReactRouterMenuItem isSidebar icon={ <ActionDateRange style={{ marginLeft: '14px' }} color='#C9C6CF' />} style={{ width: '60px' }} to={ '/account/' + this.props.accountId + '/calendar' } />
                            <ReactRouterMenuItem isSidebar icon={ <ActionViewColumn style={{ marginLeft: '14px' }} color='#C9C6CF' /> } style={{ width: '60px' }} to={ '/account/' + this.props.accountId + '/workflow' } />
                            <ReactRouterMenuItem isSidebar icon={ <ActionList style={{ marginLeft: '14px' }} color='#C9C6CF' /> } style={{ width: '60px' }}  to={ '/account/' + this.props.accountId + '/list' } />
                            { this.props.accountPermissions && this.props.accountPermissions.indexOf('statistics') > -1 &&
                                <ReactRouterMenuItem isSidebar icon={ <EditorInsertChart style={{ marginLeft: '14px' }} color='#C9C6CF' /> } style={{ width: '60px' }} to={ '/account/' + this.props.accountId + '/statistics' } />
                            }
                            { this.props.accountPermissions && this.props.accountPermissions.indexOf('connections') > -1 &&
                                <ReactRouterMenuItem isSidebar icon={ <ActionOpenInBrowser style={{ marginLeft: '14px' }} color='#C9C6CF' /> } style={{ width: '60px' }} to={ '/account/' + this.props.accountId + '/connections' } />
                            }
                            { this.props.accountPermissions && this.props.accountPermissions.indexOf('team') > -1 &&
                            <ReactRouterMenuItem isSidebar icon={ <SocialPeople style={{ marginLeft: '14px' }} color='#C9C6CF' /> } style={{ width: '60px' }} to={ '/account/' + this.props.accountId + '/connections' } />
                            }
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