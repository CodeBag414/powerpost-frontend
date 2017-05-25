import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Collapse from 'rc-collapse';
import styled from 'styled-components';

import withReactRouter from 'elements/hoc.withReactRouter';
import FontIcon from 'elements/atm.FontIcon';
import PPMenu from 'elements/atm.Menu';
import PPMenuItem from 'elements/atm.MenuItem';

import PPTooltip from 'elements/atm.Tooltip';

import styles from './styles.scss';
import CollapsedWrapper from './CollapsedWrapper';
import BrandNavWrapper from './BrandNavWrapper';
import MainNavWrapper from './MainNavWrapper';
import BrandIcon from './BrandIcon';
require('rc-collapse/assets/index.css');

const Panel = styled(Collapse.Panel)`
   i {
      font-size: 20px;
      &:before {
          border: none !important;
          font-family: 'FontAwesome';
          content: '\f067' !important;
      }
      &.pinterest-icon-color {
        color: ${(props) => props.theme.pinterestColor} !important;
      }
      &.twitter-icon-color {
        color: ${(props) => props.theme.twitterColor} !important;
      }
      &.facebook-icon-color {
        color: ${(props) => props.theme.facebookColor} !important;
      }
      &.linkedin-icon-color {
        color: ${(props) => props.theme.linkedinColor} !important;
      }
   }
  & > div:first-of-type {
    color: #616668;
    font-weight: 700;
    text-transform: uppercase;
  }
  div {
    background-color: transparent !important;
  }
`;

const Collapser = styled(Collapse)`
  background-color: transparent !important;
  border: none !important;
`;

const ReactRouterMenuItem = withReactRouter(PPMenuItem);
const ReactRouterMenuItemWithTooltip = PPTooltip(ReactRouterMenuItem);

const CustomLink = ({ theme, isAccountPath, ...rest }) => (
  <Link {...rest} >
    {rest.children}
  </Link>
);

const LinkWithTooltip = PPTooltip(CustomLink);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.renderFull = this.renderFull.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const isPrevPathAccount = this.props.location.pathname.match('/account/');
    const isNextPathAccount = nextProps.location.pathname.match('/account/');
    if (!nextProps.isMenuCollapsed && !isNextPathAccount) {
      this.props.handleMenuToggle(false);
    } else if (nextProps.isMenuCollapsed && isNextPathAccount && !isPrevPathAccount) {
      // this.props.handleMenuToggle(true);
    }
    return true;
  }

  renderFull() {
    return (
      <div>
        { this.props.activeBrand && (this.props.activeBrand.account_type_id == 2 || this.props.activeBrand.account_type_id == 3 || this.props.activeBrand.account_type_id == 7) && !this.props.isMenuCollapsed &&
        <BrandNavWrapper>
            { this.props.activeBrand && this.props.activeBrand.subAccounts.length > 0 &&
            <LinkWithTooltip tooltip={this.props.activeBrand.title} tooltipPosition="right" to={`/account/${this.props.activeBrand.account_id}`} key={this.props.activeBrand.account_id}>
              <BrandIcon isActive={this.props.accountId === this.props.activeBrand.account_id} thumbnail={this.props.activeBrand.properties && this.props.activeBrand.properties.thumb_url ? this.props.activeBrand.properties.thumb_url : null} color={this.props.activeBrand.properties && this.props.activeBrand.properties.color ? this.props.activeBrand.properties.color : '#E52466'}>
                {this.props.activeBrand.title && ((this.props.activeBrand.properties && !this.props.activeBrand.properties.thumb_url) || (!this.props.activeBrand.properties)) ? this.props.activeBrand.title.slice(0, 2).toUpperCase() : ''}
              </BrandIcon>
            </LinkWithTooltip>
            }
            { this.props.activeBrand && this.props.activeBrand.parentAccount &&
            <LinkWithTooltip tooltip={this.props.activeBrand.parentAccount.title} tooltipPosition="right" to={`/account/${this.props.activeBrand.parentAccount.account_id}`} key={this.props.activeBrand.parentAccount.account_id}>
              <BrandIcon isActive={this.props.accountId === this.props.activeBrand.parentAccount.account_id} thumbnail={this.props.activeBrand.parentAccount.properties && this.props.activeBrand.parentAccount.properties.thumb_url ? this.props.activeBrand.parentAccount.properties.thumb_url : null} color={this.props.activeBrand.parentAccount.properties && this.props.activeBrand.parentAccount.properties.color ? this.props.activeBrand.parentAccount.properties.color : '#E52466'}>
                {this.props.activeBrand.parentAccount.title && ((this.props.activeBrand.parentAccount.properties && !this.props.activeBrand.parentAccount.properties.thumb_url) || (!this.props.activeBrand.parentAccount.properties)) ? this.props.activeBrand.parentAccount.title.slice(0, 2).toUpperCase() : ''}
              </BrandIcon>
            </LinkWithTooltip>
            }
            { this.props.activeBrand && this.props.activeBrand.subAccounts.map((account) =>
              <LinkWithTooltip tooltip={account.title} tooltipPosition="right" to={`/account/${account.account_id}`} key={account.account_id}>
                <BrandIcon isActive={this.props.accountId === account.account_id} thumbnail={account.properties && account.properties.thumb_url ? account.properties.thumb_url : null} color={account.properties && account.properties.color ? account.properties.color : '#E52466'}>
                  {account.title && ((account.properties && !account.properties.thumb_url) || (!account.properties)) ? account.title.slice(0, 2).toUpperCase() : ''}
                </BrandIcon>
              </LinkWithTooltip>)
            }
            { this.props.activeBrand && this.props.activeBrand.parentAccount && this.props.activeBrand.parentAccount.subaccounts.map((account) =>
              <LinkWithTooltip tooltip={account.title} tooltipPosition="right" to={`/account/${account.account_id}`} key={account.account_id}>
                <BrandIcon isActive={this.props.accountId === account.account_id} thumbnail={account.properties && account.properties.thumb_url ? account.properties.thumb_url : null} color={account.properties && account.properties.color ? account.properties.color : '#E52466'}>
                  {account.title && ((account.properties && !account.properties.thumb_url) || (!account.properties)) ? account.title.slice(0, 2).toUpperCase() : ''}
                </BrandIcon>
              </LinkWithTooltip>)
            }
        </BrandNavWrapper>
        }
        <ReactCSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive,
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { this.props.location.pathname.match('/account/') &&
            <MainNavWrapper isCollapsed={this.props.isMenuCollapsed} key="mainNavKey" isMultiBrand={this.props.activeBrand && (this.props.activeBrand.account_type_id == 2 || this.props.activeBrand.account_type_id == 3 || this.props.activeBrand.account_type_id == 7)}>
              <PPMenu isSidebar selectable>
                <ReactRouterMenuItem caption="Dashboard" activeClassName={styles.active} isSidebar icon={<i className="fa fa-home" />} to={`/account/${this.props.accountId}`} />
                { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('brands') > -1 &&
                <ReactRouterMenuItem caption="Brands" activeClassName={styles.active} isSidebar icon={<FontIcon>library_add</FontIcon>} to={`/account/${this.props.accountId}/brands`} />
                }
                {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('content_library') > -1 &&
                  <ReactRouterMenuItem caption="Library" activeClassName={styles.active} isSidebar icon={<i className="fa fa-database" />} to={`/account/${this.props.accountId}/library`} />
                }
                {this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
                  <ReactRouterMenuItem caption="Publishing" activeClassName={styles.active} isSidebar icon={<i className="fa fa-paper-plane" />} to={`/account/${this.props.accountId}/publishing/calendar`} />
                }
                { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('statistics') > -1 &&
                  <ReactRouterMenuItem caption="Statistics" activeClassName={styles.active} isSidebar icon={<i className="fa fa-line-chart" />} to={`/account/${this.props.accountId}/statistics`} />
                }
                { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('connections') > -1 &&
                  <ReactRouterMenuItem caption="Connections" activeClassName={styles.active} isSidebar icon={<i className="fa fa-exchange" />} to={`/account/${this.props.accountId}/settings/connections`} />
                }
                { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('team') > -1 &&
                  <ReactRouterMenuItem caption="Team" activeClassName={styles.active} isSidebar icon={<i className="fa fa-group" />} to={`/account/${this.props.accountId}/settings/team`} />
                }
                { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('settings') > -1 &&
                  <ReactRouterMenuItem caption="Settings" activeClassName={styles.active} isSidebar icon={<i className="fa fa-cog" />} to={`/account/${this.props.accountId}/settings`} />
                }
                
              </PPMenu>
            </MainNavWrapper>
                    }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  renderCollapsed() {
    return (
      <div>
        { this.props.location.pathname.match('/account/') &&
        <CollapsedWrapper isCollapsed={this.props.isMenuCollapsed}>
          <PPMenu isSidebar selectable >
            <ReactRouterMenuItemWithTooltip tooltip="Dashboard" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-home" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}`} />
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('brands') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Brands" tooltipPosition="right" isCollapsed style={{ width: '60px' }} isSidebar icon={<FontIcon>library_add</FontIcon>} to={`/account/${this.props.accountId}/brands`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('content_library') > -1 &&
            <ReactRouterMenuItemWithTooltip tooltip="Media Library" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-database" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/library`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('posts') > -1 &&
            <div>
              <ReactRouterMenuItemWithTooltip tooltip="Publishing" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-paper-plane" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/publishing/calendar`} />
            </div>
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('statistics') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Statistics" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-line-chart" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/statistics`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('connections') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Connections" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-exchange" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/settings/connections`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('team') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Team" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-group" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/settings/team`} />
            }
            { this.props.userPermissions && Object.values(this.props.userPermissions).indexOf('settings') > -1 &&
              <ReactRouterMenuItemWithTooltip tooltip="Settings" tooltipPosition="right" isCollapsed isSidebar icon={<i className="fa fa-cog" />} style={{ width: '60px' }} to={`/account/${this.props.accountId}/settings`} />
            }
          </PPMenu>
        </CollapsedWrapper>
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
        { this.renderFull() }
        { this.renderCollapsed() }
      </div>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.object,
  isMenuCollapsed: PropTypes.bool,
  accountPermissions: PropTypes.any,
  accountId: PropTypes.string,
  activeBrand: PropTypes.object,
  sharedAccounts: PropTypes.any,
  userAccount: PropTypes.object,
  handleMenuToggle: PropTypes.func,
};

export default Sidebar;
