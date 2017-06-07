import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';
import DropdownMenu from 'react-dd-menu';

import PPButton from 'elements/atm.Button';
import PPMenuItem from 'elements/atm.MenuItem';
import PPAvatar from 'elements/atm.Avatar';
import withReactRouter from 'elements/hoc.withReactRouter';


import PPLogo from './PPLogo';
import Avatar from './Avatar';
import AvatarWrapper from './AvatarWrapper';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);

const DropDownMenu = styled(DropdownMenu)`
  .dd-menu-items {
    position: absolute;
    right: 20px;
    background: white;
    box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
    ul {
      padding: 0;
      width: 130px;
      text-align:center;
    }
  }
`;

const Wrapper = styled.div`
  position:fixed;
  top: 0;
  z-index: 10000;
  height: 60px;
  right: 0;
  transition: transform .3s ease-in-out, width .3s ease-in-out;
  background-image: linear-gradient(-180deg, #E81C64 1%, #B6134D 100%);
  box-shadow: 0 1px 6px 0 rgba(60,92,129,0.20);
  width: ${(props) => props.isNotFullWidth ? 'calc(100% - 60px)' : '100%'};

  .new-post-button {
    margin-top: 13px;
    margin-right: 10px;
    float: right;
    color: #ffffff;
    padding: 0 20px;
    .button-plus {
      font-size: 19px;
      margin-right: 6px;
      vertical-align: middle;
    }
    .button-title {
      font-size: 12px;
      vertical-align: middle;
    }
  }
`;

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMenuOpen: false,
      brandMenuOpen: false,
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

  toggleBrands = () => {
    this.setState({ brandMenuOpen: !this.state.brandMenuOpen });
  }

  toggle = () => {
    this.setState({ userMenuOpen: !this.state.userMenuOpen });
  }

  handleRequestClose() {
    this.setState({
      userMenuOpen: false,
    });
  }

  render() {
    const isAccountPath = this.props.location.pathname.includes('/account/');
    const avatar = this.props.user && this.props.user.properties ? this.props.user.properties.thumb_url : '';
    const accountColor = this.props.user && this.props.user.properties ? this.props.user.properties.color : '#E7ECEE';
    const color = this.props.activeBrand && this.props.activeBrand.properties.color ? this.props.activeBrand.properties.color : '#E7ECEE';
    const thumbnail = this.props.activeBrand && this.props.activeBrand.properties.thumb_url ? this.props.activeBrand.properties.thumb_url : '';
    const menuOptions = {
      isOpen: this.state.userMenuOpen,
      close: this.handleRequestClose,
      toggle: <Avatar onClick={this.toggle}>
        <PPAvatar
          size={40}
          radius={10}
          image={avatar}
          title={this.props.user.display_name}
          backgroundColor={accountColor}
          isClickable={false}
        />
      </Avatar>,
      align: 'left',
    };

    return (
      <Wrapper>
        <PPLogo />
        <AvatarWrapper>
          <DropDownMenu {...menuOptions}>
            <ReactRouterMenuItem caption="Dashboard" to={`/`} />
            <ReactRouterMenuItem caption="Settings" to={'/user/settings'} />
            <PPMenuItem caption="Logout" onTouchTap={this.props.logout} />
          </DropDownMenu>
        </AvatarWrapper>
      </Wrapper>
    );
  }
}


TopNav.propTypes = {
  isMenuCollapsed: PropTypes.bool,
  location: PropTypes.shape(),
  user: PropTypes.shape(),
  activeBrand: PropTypes.shape(),
  logout: PropTypes.func,
  handleMenuToggle: PropTypes.func,
  createPostSet: PropTypes.func,
};

export default TopNav;
