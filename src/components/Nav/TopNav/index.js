import React, { PropTypes, Component } from 'react';

import PPButton from 'elements/atm.Button';
import PPMenuItem from 'elements/atm.MenuItem';
import PPIconMenu from 'elements/atm.IconMenu';
import withReactRouter from 'elements/hoc.withReactRouter';
import styled from 'styled-components';
import { Link } from 'react-router';
import DropdownMenu from 'react-dd-menu';

import Wrapper from './Wrapper';
import AccountLogo from './AccountLogo';
import PPLogo from './PPLogo';
import Avatar from './Avatar';
import HeaderNavLogo from './HeaderNavLogo.png';
import HeaderLogo from './HeaderLogo';
import AvatarWrapper from './AvatarWrapper';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);
const ReactRouterButton = withReactRouter(PPButton);
const DropDownMenu = styled(DropdownMenu)`

  .dd-menu-items {
    position: absolute;
    right: 20px;
    background: white;
    box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
    ul {
      padding: 0;
      width: 150px;
      text-align:center;
    }
  }
`;

const DashboardLink = styled(Link)`
  float: right;
  font-size: 20px;
  color: #424647;
  line-height: 60px;
  margin-right: 20px;
`;

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMenuOpen: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouchTap(event) {
    event.preventDefault();

    this.setState({
      userMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  }
  toggle = () => {
    this.setState({ userMenuOpen: !this.state.userMenuOpen });
  }
  handleRequestClose() {
    this.setState({
      userMenuOpen: false,
    });
  }
  handleTouch(event) {
    console.log('in handleTouch', event);
  }
  render() {
    const isAccountPath = this.props.location.pathname.includes('/account/');
    const avatar = this.props.user && this.props.user.properties ? this.props.user.properties.thumb_url : '#E7ECEE';
    const color = this.props.activeBrand && this.props.activeBrand.properties.color ? this.props.activeBrand.properties.color : '#E7ECEE';
    const thumbnail = this.props.activeBrand && this.props.activeBrand.properties.thumb_url ? this.props.activeBrand.properties.thumb_url : '';
    let menuOptions = {
      isOpen: this.state.userMenuOpen,
      close: this.handleRequestClose,
      toggle: <Avatar avatarSrc={avatar} onClick={this.toggle.bind(this)} />,
      align: 'left',
    };
    
    const logo = isAccountPath ? <AccountLogo isCollapsed={this.props.isMenuCollapsed} color={color} title={this.props.activeBrand.title} thumbnail={thumbnail} /> : <PPLogo />;
    const showSidebar = this.props.activeBrand.account_type_id == 2 || this.props.activeBrand.account_type_id == 3 || this.props.activeBrand.account_type_id == 7 ? true : false;
    return (
      <Wrapper isNotFullWidth={this.props.activeBrand && showSidebar && !this.props.isMenuCollapsed} >
          
        <AccountLogo isAccountPath={isAccountPath} isCollapsed={this.props.isMenuCollapsed} color={color} title={this.props.activeBrand.title} thumbnail={thumbnail} />
        <PPLogo isAccountPath={isAccountPath} />
        
        { isAccountPath &&
          <PPButton onClick={this.props.handleMenuToggle} style={{marginTop: '10px', float: 'left'}} icon={this.props.isMenuCollapsed ? 'menu' : 'keyboard_arrow_left'} floating mini />
        }
        { !isAccountPath && <div style={{float: 'left', height: '24px', marginTop: '18px', marginLeft: '10px', fontSize: '16px', fontWeight:'700', color: '#8C9496' }}>Welcome</div> }
        <HeaderLogo src={HeaderNavLogo} />
        <AvatarWrapper>
          <DropDownMenu {...menuOptions}>
            <ReactRouterMenuItem caption="Settings" to={'/user/settings'} />
            <PPMenuItem caption="Logout" onTouchTap={this.props.logout} />
          </DropDownMenu>
        </AvatarWrapper>
        <PPButton
          label={
            <div>
              <span className="button-plus">+</span>
              <span className="button-title">New Power Post</span>
            </div>
          }
          className="new-post-button"
          onClick={() => {}}
          primary
        />
        <DashboardLink to={'/'}><i className="fa fa-home" /></DashboardLink>
      </Wrapper>
    );
  }
}

TopNav.propTypes = {
  isMenuCollapsed: PropTypes.bool,
  location: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  handleMenuToggle: PropTypes.func,
};

export default TopNav;
