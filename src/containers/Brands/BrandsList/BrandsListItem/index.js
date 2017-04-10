import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import withReactRouter from 'elements/hoc.withReactRouter';

const ReactRouterMenuItem = withReactRouter(MenuItem);

import { deleteBrandRequest } from '../../actions';

const BrandItemContainer = styled.div`
    margin: 30px 0px 0px 20px;
    padding: 8px;
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 18px;
    text-align: left;
    box-shadow: 2px 2px 9px 3px rgba(0,0,0,0.1);

    &:hover {
        box-shadow: 2px 2px 9px 6px rgba(0,0,0,0.1);
    }

    div {
        display: inline-block;
        vertical-align: top;
    }
`;

const BrandImage = styled.div`
    width: 115px;
    height: 115px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }
`;

const BrandItemTitle = styled.div`
    width: 175px;
    height: 115px;
    margin-left: 16px;
    padding-top: 27px;
    border: 0px solid #ddd;
    line-height: 24px;

    span {
        font-size: 14px;
        color: #666;
    }
`;

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
            accountpath: location.origin + '/account/' + this.props.brand.account_id
        }
    }

    getLastUpdatedTime (creation_time) {
        let d = new Date();
        let t = d.getTime() / 1000;
        let dif_minutes = Math.floor((t - creation_time) / 60);
        if ( dif_minutes < 60 )
            return dif_minutes + ' minutes';
        else {
            let dif_hours = Math.floor(dif_minutes / 60);
            if ( dif_hours < 24 )
                return dif_hours + ' hours';
            else
                return Math.floor(dif_hours / 24) + ' days';
        }
        return dif_minutes + ' minutes';
    }

    deleteBrand(event) {
        event.preventDefault();

        const data = {
            account_id: this.props.brand.account_id,
        };
        
        this.props.delete(data);
    }

    render() {
        const brand = this.props.brand;
        console.log('item brand', brand)
        // const thumbURL = (brand && brand.properties!=null) ? brand.properties.thumb_url : '';
        const thumbnail_image_key = (brand && brand.properties!=null) ? brand.properties.thumbnail_image_key : '';
        const thumbURL = "https://s3.amazonaws.com/powerpost/" + thumbnail_image_key;
        const groupTitle = brand && brand.group_title ? brand.group_title : '';
        const title = brand && brand.title ? brand.title : '';
        const accountID = brand && brand.account_id ? brand.account_id : null;
        const brandURL = '/account/' + accountID;
        
        const BrandNavMenu = () => (
            <IconMenu
              position="bottomRight" icon='more_horiz' menuRipple
            >
              <BrandRouterMenuItem to={brandURL + '/settings/connections'}>
                <i className="fa fa-paper-plane"></i><BrandMenuItemCaption>Posts</BrandMenuItemCaption>
              </BrandRouterMenuItem>
              <BrandRouterMenuItem to={brandURL + '/settings/connections'} >
                <i className="fa fa-exchange"></i><BrandMenuItemCaption>Connections</BrandMenuItemCaption>
              </BrandRouterMenuItem>
              <BrandRouterMenuItem to={brandURL + '/settings/team'} >
                <i className="fa fa-group"></i><BrandMenuItemCaption>Team</BrandMenuItemCaption>
              </BrandRouterMenuItem>
              <BrandRouterMenuItem to={brandURL + '/settings'} >
                <i className="fa fa-gear"></i><BrandMenuItemCaption>Settings</BrandMenuItemCaption>
              </BrandRouterMenuItem>
              <MenuDivider />
              <BrandMenuItem onClick={this.deleteBrand} >
                <i className="fa fa-trash"></i><BrandMenuItemCaption>Delete</BrandMenuItemCaption>
              </BrandMenuItem>
            </IconMenu>
        );

        return (
            <BrandItemContainer>
                <BrandImage>
                    <img src={thumbURL} />
                </BrandImage>
                <clearfix />
                <BrandItemTitle>
                    { title }
                    <br/>
                    <span>
                        Last updated {this.getLastUpdatedTime(this.props.brand.creation_time)} ago
                    </span>
                </BrandItemTitle>
                <BrandNavMenu />
            </BrandItemContainer>
            
        );
    }
}

BrandsListItem.propTypes = {children: React.PropTypes.node};

export function mapDispatchToProps(dispatch) {
  return {
    delete: (data) => dispatch(deleteBrandRequest(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  
});

export default (connect(mapStateToProps, mapDispatchToProps)(BrandsListItem));
