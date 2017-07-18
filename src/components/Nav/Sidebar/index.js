import React, { PropTypes } from 'react';
import cx from 'classnames';

import withReactRouter from 'elements/hoc.withReactRouter';
import PPMenu from 'elements/atm.Menu';
import PPMenuItem from 'elements/atm.MenuItem';

import PPTooltip from 'elements/atm.Tooltip';
import PPButton from 'elements/atm.Button';

import styles from './styles.scss';
import CollapsedWrapper from './CollapsedWrapper';
import MainNavWrapper from './MainNavWrapper';


const ReactRouterMenuItem = withReactRouter(PPMenuItem);
const ReactRouterMenuItemWithTooltip = PPTooltip(ReactRouterMenuItem);
const PPButtonWithTooltip = PPTooltip(PPButton);
class Sidebar extends React.Component {

  renderMenu = (collapsed = false) => {
    const {
      permissionClasses, location, isMenuCollapsed, activeBrand,
      createPostSet, handleMenuToggle,
    } = this.props;
    const menuItems = [
      { caption: 'Dashboard', className: '', icon: 'home', subPath: '' },
      { caption: 'Brands', className: 'brands', icon: 'th-large', subPath: 'brands' },
      { caption: 'Content Hub', className: 'contentHub', icon: 'folder', subPath: 'library' },
      { caption: 'Status Boards', className: 'statusBoards', icon: 'columns', subPath: 'boards' },
      { caption: 'Calendar', className: 'calendar', icon: 'calendar', subPath: 'calendar' },
      { caption: 'Posts', className: 'posts', icon: 'send', subPath: 'posts' },
      { caption: 'Shared Streams', className: 'sharedStreams', icon: 'list-alt', subPath: 'shared_streams/owned' },
      { caption: 'Social Feeds', className: 'socialFeeds', icon: 'list-ul', subPath: 'social_feeds' },
      { caption: 'Analytics', className: 'analytics', icon: 'bar-chart', subPath: 'statistics' },
      { caption: 'Settings', className: 'settings', icon: 'cog', subPath: 'settings' },
    ];
    const NavComponent = collapsed ? CollapsedWrapper : MainNavWrapper;
    return (
      <div>
        { location.pathname.match('/account/') &&
          <NavComponent isCollapsed={isMenuCollapsed} key="mainNavKey" isMultiBrand={activeBrand && (activeBrand.account_type_id === 2 || activeBrand.account_type_id === 3 || activeBrand.account_type_id === 7)}>
            {
              collapsed
              ? (
                <PPButtonWithTooltip
                  tooltip="Create a Post"
                  tooltipPosition="right"
                  label={<i className="fa fa-plus" />}
                  style={{ margin: '0 auto', display: 'block', marginTop: '10px', width: '40px', minWidth: '0px' }}
                  onClick={this.props.createPostSet}
                  className={`new-post-button ${permissionClasses.createPost}`}
                  primary
                />
              ) : (
                <PPButton
                  label={
                    <div>
                      <span className="button-plus">+ </span>
                      <span className="button-title">Create Post</span>
                    </div>
                  }
                  style={{ margin: '0 auto', display: 'block', marginTop: '10px', width: '170px' }}
                  className={`new-post-button ${permissionClasses.createPost}`}
                  onClick={createPostSet}
                  primary
                />
              )
            }
            <PPMenu isSidebar selectable>
              {
                menuItems.map((menuItem) =>
                  collapsed
                  ? <ReactRouterMenuItemWithTooltip key={menuItem.className} className={permissionClasses[menuItem.className]} tooltip={menuItem.caption} tooltipPosition="right" isCollapsed style={{ width: '60px' }} isSidebar icon={<i className={`fa fa-${menuItem.icon}`} />} to={`/account/${this.props.accountId}/${menuItem.subPath}`} />
                  : <ReactRouterMenuItem caption={menuItem.caption} className={permissionClasses[menuItem.className]} activeClassName={styles.active} isSidebar icon={<i className={`fa fa-${menuItem.icon}`} />} to={`/account/${this.props.accountId}/${menuItem.subPath}`} />
                )
              }
              {
                collapsed
                ? <PPMenuItem onClick={handleMenuToggle} isCollapsed isSidebar style={{ width: '60px', position: 'fixed', bottom: '0', marginBottom: '10px' }} icon={<i className="fa fa-expand" />} />
                : <PPMenuItem onClick={handleMenuToggle} caption="Collapse Menu" isSidebar style={{ position: 'fixed', bottom: '0', marginBottom: '10px', width: '185px' }} icon={<i className="fa fa-compress" />} />
              }
            </PPMenu>
          </NavComponent>
        }
      </div>
    );
  }

  render() {
    const isAccountPath = this.props.location.pathname.match('/account/');
    const className = cx(styles.sidebar, {
      [styles.collapsed]: this.props.isMenuCollapsed && isAccountPath,
      [styles.userMenu]: this.props.isMenuCollapsed && !isAccountPath,
    });

    return (
      <div className={className} key="sidebarCollapsed">
        { this.renderMenu(this.props.isMenuCollapsed) }
      </div>
    );
  }
}

Sidebar.propTypes = {
  createPostSet: PropTypes.func,
  location: PropTypes.object,
  isMenuCollapsed: PropTypes.bool,
  accountId: PropTypes.string,
  activeBrand: PropTypes.object,
  handleMenuToggle: PropTypes.func,
  permissionClasses: PropTypes.object,
};

export default Sidebar;
