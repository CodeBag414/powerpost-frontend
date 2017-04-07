/*
 * Dashboard
 *
 *
 */
import React, { PropTypes, Component } from 'react';

import {
  connect,
} from 'react-redux';
import {
  createStructuredSelector,
} from 'reselect';

import PPButton from 'elements/atm.Button';
import withReactRouter from 'elements/hoc.withReactRouter';
import {
  UserCanAccount,
} from 'config.routes/UserRoutePermissions';
import {
  makeSelectUser,
  makeSelectSharedAccounts,
} from 'containers/App/selectors';

import BrandItem from './BrandItem';
import styles from './styles.scss';

const ReactRouterButton = withReactRouter(PPButton);

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    brands: PropTypes.any,
  }

  render() {
    const brands = this.props.brands || null;
    const userInfo = this.props.user || null;
    const avatarUrl = (userInfo && userInfo.properties && userInfo.properties.thumb_url) ? userInfo.properties.thumb_url : null;

    return (
      <div className="container">
        <row>
          <div className="col-md-12">
            <h4>
              {
                userInfo && userInfo.display_name
                ?  'Hello there ' + userInfo.display_name + ' !'
                : ''
              }
            </h4>
          </div>
        </row>

        <row>
          <div className="col-md-7">
            <div className={['col-md-12', styles.userDashboardContain].join(' ')}>
              <row>
                <h3><i className="fa fa-bolt" style={{marginRight: '15px'}}></i>My Brands</h3>
              </row>

              <hr />

              <row>
                <p>Easily jump into a brand to manage its posts.</p>
                <div style={ {padding: '10px 0 50px'} }>
                  {
                    brands
                    ? brands.map((brand, index) => <BrandItem brand={brand} key={index} />)
                    : null
                  }
                </div>
              </row>
            </div>
          </div>

          <div className="col-md-5">
            <div className={['col-md-12', styles.userDashboardContain].join(' ')}>
              <row>
                <h3><i className="fa fa-bolt" style={{marginRight: '15px'}}></i>My User Settings</h3>
              </row>

              <hr />

              <row>
                <div style={ {margin: '20px 0'} }>
                  <p style={ {display: 'inline-block', marginRight: '10px'} }>Go here to manage all of your user info.</p>
                  <ReactRouterButton
                    style={ {fontSize: '10px'} }
                    label="Go to Settings"
                    primary
                    to={'/user/settings'}
                  />
                </div>
              </row>

              <row>
                <div className={styles.profile}>
                  <img
                    src={avatarUrl}
                    className={styles.avatar}
                    alt="Profile"
                  />

                  <div className={styles.userInfo}>
                    <div>
                      <p>Name</p>
                      <span> {userInfo.display_name || ''} </span>
                    </div>

                    <div>
                      <p>Email</p>
                      <span> {userInfo.email || ''} </span>
                    </div>
                  </div>
                </div>
              </row>
            </div>
          </div>
        </row>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  brands: makeSelectSharedAccounts(),
});

export default UserCanAccount(connect(mapStateToProps)(Dashboard));
