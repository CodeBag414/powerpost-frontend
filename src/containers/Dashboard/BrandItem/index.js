import React from 'react';

import PPButton from 'elements/atm.Button';
import withReactRouter from 'elements/hoc.withReactRouter';

import styles from './styles.scss';

const ReactRouterButton = withReactRouter(PPButton);

class BrandItem extends React.Component {
  render() {
    const brand = this.props.brand;

    const thumbURL = (brand && brand.properties.thumb_url) ? brand.properties.thumb_url : '';
    const groupTitle = brand && brand.group_title ? brand.group_title : '';
    const title = brand && brand.title ? brand.title : '';
    const accountID = brand && brand.account_id ? brand.account_id : null;
    const brandURL = '/account/' + accountID;

    const themes = {
      link: {
        width: '40px',
        height: '40px',
        background: 'transparent',
        display: 'inline-block',
        marginLeft: '15px',
        marginTop: '5px',
      },
    };

    return (
      <div className={styles.brandItem}>
        <ReactRouterButton
          style={ {width: '100%', height: '100%', background: 'transparent'} }
          to={brandURL}
        >
          <div className={styles.brand}>
            <img src={thumbURL} alt="Brand" />
            <div className="role">
              <p><b>{title}</b></p>
              <p>{groupTitle}</p>
            </div>
          </div>
        </ReactRouterButton>

        <div className={styles.brandLinks}>
          <ReactRouterButton
            style={themes.link}
            to={brandURL + '/list'}
            floating mini
          >
            <i className="fa fa-paper-plane"></i>
          </ReactRouterButton>

          <ReactRouterButton
            style={themes.link}
            to={brandURL + '/settings/connections'}
            floating mini
          >
            <i className="fa fa-exchange"></i>
          </ReactRouterButton>

          <ReactRouterButton
            style={themes.link}
            to={brandURL + '/settings/team'}
            floating mini
          >
            <i className="fa fa-users"></i>
          </ReactRouterButton>

          <ReactRouterButton
            style={themes.link}
            to={brandURL + '/settings'}
            floating mini
          >
            <i className="fa fa-cog"></i>
          </ReactRouterButton>
        </div>
      </div>
    );
  }
}

BrandItem.propTypes = {
  brand: React.PropTypes.object,
};

export default BrandItem;
