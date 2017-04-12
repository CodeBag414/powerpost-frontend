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

import Background from './Background';
import BrandItem from './BrandItem';
import Wrapper from './Wrapper';
import Header from './Header';
import Pane from './Pane';

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
      <Wrapper>
        <Background image="../../assets/images/user_dashboard_bg.png" />
        <div className="container">
          <div className="col-md-12">
            <Header>
              { userInfo && userInfo.display_name
                ? 'Hello there ' + userInfo.display_name + '!'
                : ''
              }
            </Header>
          </div>

          <row>
            <div className="col-md-7">
              <Pane>
                <h3 className="paneTitle"><i className="fa fa-bolt"></i>My Brands</h3>
                <div className="paneContent">
                  <p>Easily jump into a brand to manage its posts.</p>
                  <div style={{padding: '10px 0'}}>
                    {
                      brands
                      ? brands.map((brand, index) => <BrandItem brand={brand} key={index} />)
                      : null
                    }
                  </div>
                </div>
              </Pane>
            </div>

            <div className="col-md-5">
              <Pane>
                <h3 className="paneTitle"><i className="fa fa-bolt"></i>My User Settings</h3>
                <div className="paneContent">
                  <div className="profileButton">
                    <p>Go here to manage all of your user info.</p>
                    <ReactRouterButton
                      className="setting"
                      label="Go to Settings"
                      primary
                      to={'/user/settings'}
                    />
                  </div>
                  <div className="profile">
                    <img
                      src={avatarUrl}
                      className="avatar"
                      alt="Profile"
                    />

                    <div className="userInfo">
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
                </div>
              </Pane>
            </div>
          </row>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  brands: makeSelectSharedAccounts(),
});

export default UserCanAccount(connect(mapStateToProps)(Dashboard));
