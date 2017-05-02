import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import Dialog from 'react-toolbox/lib/dialog';

import styled from 'styled-components';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import withReactRouter from 'elements/hoc.withReactRouter';

import Wrapper from './Wrapper';
import BrandImage from './BrandImage';
import BrandTitle from './BrandTitle';

import { deleteBrandRequest } from '../../actions';
const ReactRouterMenuItem = withReactRouter(MenuItem);

const BrandRouterMenuItem = styled(ReactRouterMenuItem)`
  span {
    flex-grow: 0;
  }
`;
const BrandMenuItem = styled(MenuItem)`
  span {
    flex-grow: 0;
  }
`;

const BrandMenuItemCaption = styled.div`
  margin-left: 10px;
`;

class BrandsListItem extends React.Component {
  constructor(props) {
    super(props);

    this.deleteBrand = this.deleteBrand.bind(this);

    this.state = {
      accountpath: `${location.origin}/account/${this.props.brand.account_id}`,
      active: false,
      deleteFlag: false,
    };
  }

  getLastUpdatedTime(creation_time) {
    const d = new Date();
    const t = d.getTime() / 1000;
    const dif_minutes = Math.floor((t - creation_time) / 60);
    if (dif_minutes < 60) {
      return `${dif_minutes} minutes`;
    } else {
      const dif_hours = Math.floor(dif_minutes / 60);
      if (dif_hours < 24) {
        return `${dif_hours} hours`;
      } else {
        return `${Math.floor(dif_hours / 24)} days`;
      }
    }
    return `${dif_minutes} minutes`;
  }

  deleteBrand(event) {
    event.preventDefault();
    this.setState({ active: !this.state.active });
        // const data = {
        //     account_id: this.props.brand.account_id,
        // };

        // if ( this.state.deleteFlag === true ) {
        //     this.props.delete(data);
        //     this.setState({deleteFlag: false});
        // }
  }

  handleToggleYes = () => {
    this.setState({ deleteFlag: true });

    const data = {
      account_id: this.props.brand.account_id,
    };

    if (this.state.deleteFlag == true) {
      console.log('yes');
      this.props.delete(data);
            // this.setState({deleteFlag: false});
    }

    this.setState({ active: !this.state.active });
  }

  handleToggleCancel = () => {
    this.setState({ deleteFlag: false });
    this.setState({ active: !this.state.active });
  }

  actions = [
        { label: 'Cancel', onClick: this.handleToggleCancel },
        { label: 'Yes, Delete It!', onClick: this.handleToggleYes },
  ];

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

    const DeleteDialog = () => (
      <Dialog
        actions={this.actions}
        active={this.state.active}
        onEscKeyDown={this.handleToggleCancel}
        onOverlayClick={this.handleToggleCancel}
        title="Delete a brand"
      >
        <p>Are you sure? You will not be able to recover this Brand and all of its posts.</p>
      </Dialog>
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
        <DeleteDialog />
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    delete: (data) => dispatch(deleteBrandRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({

});

export default (connect(mapStateToProps, mapDispatchToProps)(BrandsListItem));
