import React, { PropTypes, Component } from 'react';

import PPButton from 'elements/atm.Button';
import PPMenuItem from 'elements/atm.MenuItem';
import PPIconMenu from 'elements/atm.IconMenu';
import withReactRouter from 'elements/hoc.withReactRouter';
import styled from 'styled-components';
import { Link } from 'react-router';

//import Wrapper from './Wrapper';
import AccountLogo from './AccountLogo';
import PPLogo from './PPLogo';
import Avatar from './Avatar';
import HeaderNavLogo from './HeaderNavLogo.png';
import HeaderLogo from './HeaderLogo';
import AvatarWrapper from './AvatarWrapper';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);
const ReactRouterButton = withReactRouter(PPButton);
const Wrapper = styled.div`
  position:fixed;
  top: 0;
  height: 60px;
  right: 0;
  transition: transform .3s ease-in-out, width .3s ease-in-out;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.20);
  background-color: #fff;
  width: ${(props) => props.isNotFullWidth ? 'calc(100% - 60px)' : '100%'};
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

  handleRequestClose() {
    this.setState({
      userMenuOpen: false,
    });
  }
  handleTouch(event) {
    console.log('in handleTouch', event);
  }
  render() {
    const isAccountPath = this.props.location.pathname.match('/account/');

    const avatar = this.props.user && this.props.user.properties ? this.props.user.properties.thumb_url : '#E7ECEE';
    const color = this.props.activeBrand && this.props.activeBrand.properties.color ? this.props.activeBrand.properties.color : '#E7ECEE';
    console.log(this.props.activeBrand);
    const thumbnail = this.props.activeBrand && this.props.activeBrand.properties.thumb_url ? this.props.activeBrand.properties.thumb_url : '';
    
    const logo = isAccountPath ? <AccountLogo isCollapsed={this.props.isMenuCollapsed} color={color} title={this.props.activeBrand.title} thumbnail={thumbnail} /> : <PPLogo />;
    const showSidebar = this.props.activeBrand.account_type_id == 2 || this.props.activeBrand.account_type_id == 3 || this.props.activeBrand.account_type_id == 7 ? true : false;
    return (
      <Wrapper isNotFullWidth={this.props.activeBrand && showSidebar && !this.props.isMenuCollapsed} >
        {logo}
        { isAccountPath &&
          <PPButton onClick={this.props.handleMenuToggle} style={{marginTop: '10px', float: 'left'}} icon={this.props.isMenuCollapsed ? 'menu' : 'keyboard_arrow_left'} floating mini />
        }
        { !isAccountPath && <div style={{float: 'left', height: '24px', marginTop: '18px', marginLeft: '10px', fontSize: '16px', fontWeight:'700', color: '#8C9496' }}>Welcome</div> }
        <HeaderLogo src={HeaderNavLogo} />
        <AvatarWrapper>
          <PPIconMenu
            open={this.state.userMenuOpen}
            position="topRight"
            icon={<Avatar avatarSrc={avatar} />}
          >
            <ReactRouterMenuItem caption="Dashboard" to={'/'} />
            <ReactRouterMenuItem caption="Settings" to={'/user/settings'} />
            <PPMenuItem caption="Logout" onTouchTap={this.props.logout} />
          </PPIconMenu>
        </AvatarWrapper>
        <DashboardLink to={'/'}><i className="fa fa-send-o" /></DashboardLink>
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
