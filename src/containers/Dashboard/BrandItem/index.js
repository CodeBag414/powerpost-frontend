import React from 'react';

import PPButton from 'elements/atm.Button';
import PPAvatar from 'elements/atm.Avatar';
import PPTooltip from 'elements/atm.Tooltip';
import withReactRouter from 'elements/hoc.withReactRouter';

import Wrapper from './Wrapper';

const ReactRouterButton = withReactRouter(PPButton);
const PPTooltipRouter = PPTooltip(ReactRouterButton);

const BrandItem = (props) => {
  const brand = props.brand;

  const thumbURL = (brand && brand.properties.thumb_url) ? brand.properties.thumb_url : '';
  const groupTitle = brand && brand.group_title ? brand.group_title : '';
  const title = brand && brand.title ? brand.title : '';
  const accountID = brand && brand.account_id ? brand.account_id : null;
  const brandURL = `/account/${accountID}`;

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
              backgroundColor={''}
            />
          </div>
          <span>
            <p className="itemTitle">{title}</p>
            <p>{groupTitle}</p>
          </span>
        </div>
      </ReactRouterButton>

      <div className="itemLink">
        <PPTooltipRouter
          className="link"
          to={`${brandURL}/list`}
          floating mini
          tooltip="List"
          tooltipPosition="top"
        >
          <i className="fa fa-paper-plane"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/settings/connections`}
          floating mini
          tooltip="Connections"
          tooltipPosition="top"
        >
          <i className="fa fa-exchange"></i>
        </PPTooltipRouter>

        <PPTooltipRouter
          className="link"
          to={`${brandURL}/settings/team`}
          floating mini
          tooltip="Team"
          tooltipPosition="top"
        >
          <i className="fa fa-users"></i>
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
    </Wrapper>
  );
};

BrandItem.propTypes = {
  brand: React.PropTypes.object,
};

export default BrandItem;
