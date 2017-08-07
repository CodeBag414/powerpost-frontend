import React from 'react';

import PPButton from 'elements/atm.Button';
import PPAvatar from 'elements/atm.Avatar';
import PPTooltip from 'elements/atm.Tooltip';
import withReactRouter from 'elements/hoc.withReactRouter';
import SubBrandItem from '../SubBrandItem';

import Wrapper from './Wrapper';

const ReactRouterButton = withReactRouter(PPButton);
const PPTooltipRouter = PPTooltip(ReactRouterButton);

const BrandItem = (props) => {
  const brand = props.brand;

  const thumbURL = (brand && brand.properties.thumb_url) ? brand.properties.thumb_url : '';
  const color = (brand && brand.properties.color) ? brand.properties.color : '';
  const title = brand && brand.title ? brand.title : '';
  const accountID = brand && brand.account_id ? brand.account_id : 'me';
  const brandURL = `/account/${accountID}`;
  const accessLevel = brand && brand.user_access_level ? brand.user_access_level : '';
  const role = accessLevel === 'owner' ? accessLevel : `${accessLevel} - Shared`;

  return (
    <Wrapper>
      <ReactRouterButton
        className="brand"
        to={brandURL}
      >
        <div className="item">
          <div className="avatar">
            <PPAvatar
              size={45}
              image={thumbURL}
              title={title}
              backgroundColor={color}
            />
          </div>
          <span>
            <p className="itemTitle">{title}</p>
            <p>{role}</p>
          </span>
        </div>
      </ReactRouterButton>

      <div className="itemLink">
        <PPTooltipRouter
          className="link"
          to={brandURL}
          floating mini
          tooltip="Dashboard"
          tooltipPosition="top"
        >
          <i className="fa fa-home"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/posts`}
          floating mini
          tooltip="Posts"
          tooltipPosition="top"
        >
          <i className="fa fa-paper-plane"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/statistics`}
          floating mini
          tooltip="Analytics"
          tooltipPosition="top"
        >
          <i className="fa fa-bar-chart"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/settings`}
          floating mini
          tooltip="Settings"
          tooltipPosition="top"
        >
          <i className="fa fa-cog"></i>
        </PPTooltipRouter>
      </div>
      { brand.subaccounts && brand.subaccounts.length > 0 && <p style={{ marginLeft: '40px', fontWeight: '700' }}>Sub-Brands</p> }
      { brand.subaccounts && brand.subaccounts.length > 0 &&
        brand.subaccounts
        .sort((a, b) => a.title.toUpperCase() >= b.title.toUpperCase())
        .map((subbrand, i) => <SubBrandItem brand={subbrand} key={i} role={role} />)}
    </Wrapper>
  );
};

BrandItem.propTypes = {
  brand: React.PropTypes.object,
};

export default BrandItem;
