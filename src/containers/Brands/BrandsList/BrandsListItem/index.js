import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import styled from 'styled-components';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import withReactRouter from 'elements/hoc.withReactRouter';

import Wrapper from './Wrapper';
import BrandImage from './BrandImage';
import BrandTitle from './BrandTitle';

import DeleteBrandDialog from '../../DeleteBrandDialog';

import { deleteBrandRequest } from '../../actions';

const ReactRouterMenuItem = withReactRouter(MenuItem);

const BrandRouterMenuItem = styled(ReactRouterMenuItem)`
  height: 34px;
  width: 180px;
  
  i {
    color: #8C9496;
  }

  span {
    flex-grow: 0;
  }

  &:hover {
    color: black;
    background-color: #E81C64;
  }
`;

const BrandMenuItem = styled(MenuItem)`
  i {
    color: #8C9496;
  }
  span {
    flex-grow: 0;
  }
`;

const BrandMenuItemCaption = styled.div`
  color: #8C9496;
  margin-left: 10px;
`;

class BrandsListItem extends Component {

  static propTypes = {
    brand: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      accountpath: `${location.origin}/account/${props.brand.account_id}`,
      isDialogShown: false,
    };
  }

  deleteBrand = () => {
    this.setState({ isDialogShown: true });
  }

  handleDialogToggle = () => {
    this.setState({ isDialogShown: false });
  }

  render() {
    const brand = this.props.brand;

    const thumbnailImageKey = (brand && brand.properties && brand.properties.thumbnail_image_key) ? brand.properties.thumbnail_image_key : '';
    const thumbURL = `https://s3.amazonaws.com/powerpost/${thumbnailImageKey}`;
    const title = brand && brand.title ? brand.title : '';
    const accountID = brand && brand.account_id ? brand.account_id : null;
    const brandColor = brand && brand.properties.color;
    const brandURL = `/account/${accountID}`;

    const BrandNavMenu = () => (
      <IconMenu
        position="topLeft" icon="more_horiz" menuRipple
      >
        <BrandRouterMenuItem to={`${brandURL}/settings/connections`}>
          <i className="fa fa-paper-plane"></i><BrandMenuItemCaption>Posts</BrandMenuItemCaption>
        </BrandRouterMenuItem>
        <BrandRouterMenuItem to={`${brandURL}/settings/connections`} >
          <i className="fa fa-exchange"></i><BrandMenuItemCaption>Connections</BrandMenuItemCaption>
        </BrandRouterMenuItem>
        <BrandRouterMenuItem to={`${brandURL}/settings/team`} >
          <i className="fa fa-group"></i><BrandMenuItemCaption>Team</BrandMenuItemCaption>
        </BrandRouterMenuItem>
        <BrandRouterMenuItem to={`${brandURL}/settings`} >
          <i className="fa fa-gear"></i><BrandMenuItemCaption>Settings</BrandMenuItemCaption>
        </BrandRouterMenuItem>
        <MenuDivider />
        <BrandMenuItem onClick={this.deleteBrand} >
          <i className="fa fa-trash"></i><BrandMenuItemCaption>Delete</BrandMenuItemCaption>
        </BrandMenuItem>
      </IconMenu>
        );

    return (
      <Wrapper>
        <BrandImage color={brandColor}>
          {thumbnailImageKey !== '' ? <img src={thumbURL} /> : <p>{title.substr(0, 2)}</p>}
        </BrandImage>
        <Link to={`${brandURL}`}><BrandTitle>
          { title }
        </BrandTitle>
        </Link>
        <BrandNavMenu />
        <DeleteBrandDialog
          active={this.state.isDialogShown}
          handleDialogToggle={this.handleDialogToggle}
          accountId={accountID}
        />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    deleteBrand: (brandObject) => dispatch(deleteBrandRequest(brandObject)),
  };
}

const mapStateToProps = createStructuredSelector({

});

export default (connect(mapStateToProps, mapDispatchToProps)(BrandsListItem));
