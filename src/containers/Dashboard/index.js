/*
 * Dashboard
 *
 *
 */
import React from 'react';

import {
  connect,
} from 'react-redux';
import {
  createStructuredSelector,
} from 'reselect';

import PPButton from 'elements/atm.Button';
import PPAvatar from 'elements/atm.Avatar';
import withReactRouter from 'elements/hoc.withReactRouter';
import {
  makeSelectUser,
  makeSelectSharedAccounts,
  makeSelectUserAccount,
} from 'containers/App/selectors';

import Background from './Background';
import BrandItem from './BrandItem';
import Wrapper from './Wrapper';
import Header from './Header';
import Pane from './Pane';

import PPBKImage from '../../assets/images/user_dashboard_bg.png';

const ReactRouterButton = withReactRouter(PPButton);

const Dashboard = (props) => {
  const brands = props.brands || null;
  const userInfo = props.user || null;

  const userOwnAccount = props.userOwnAccount || null;
  const accountType = userOwnAccount && userOwnAccount.account_type_id ? userOwnAccount.account_type_id : 0;

  const avatarUrl = (userInfo && userInfo.properties && userInfo.properties.thumb_url) ? userInfo.properties.thumb_url : null;
  const avatarClr = (userInfo && userInfo.properties && userInfo.properties.color) ? userInfo.properties.color : null;

  return (
    <Wrapper>
      <Background image={PPBKImage} />
      <div className="container">
        <div className="col-md-12">
          <Header>
            { userInfo && userInfo.display_name
              ? `Hello there, ${userInfo.display_name}!`
              : ''
            }
            {/*
              accountType === '5'
              ? <a href="https://www.powerpost.digital/pricing/" target="_blank">Upgrade to a Premium Account!</a>
              : null
              */
            }
          </Header>
        </div>

        <row>
          <div className="col-md-7">
            <Pane>
              <h3 className="paneTitle">My Brands</h3>
              <div className="paneContent">
                <p>Choose a brand to get started.</p>
                <div style={{ padding: '10px 0' }}>
                  {
                    accountType === '2' || accountType === '3' || accountType === '4' || accountType === '6' || accountType === '7'
                    ? <BrandItem brand={userOwnAccount} key={'ownaccount'} />
                    : null
                  }
                  { brands.length > 0 &&
                    brands
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((brand, index) => <BrandItem brand={brand} key={index} />) }
                </div>
              </div>
            </Pane>
          </div>

          <div className="col-md-5">
            <Pane>
              <h3 className="paneTitle">My User Information</h3>
              <div className="paneContent">
                <div className="profileButton">
                  <p>Click here to manage your information.</p>
                  <ReactRouterButton
                    className="setting"
                    icon={<i className="fa fa-cog" />}
                    label="Settings"
                    primary
                    to={'/user/settings'}
                  />
                </div>
                <div className="profile">
                  <div className="avatar">
                    <PPAvatar
                      size={90}
                      radius={10}
                      image={avatarUrl}
                      title={userInfo.display_name}
                      backgroundColor={avatarClr}
                      isClickable={false}
                    />
                  </div>

                  <div className="userInfo">
                    <div>
                      <h6>Name</h6>
                      <p> {userInfo.display_name || ''} </p>
                    </div>

                    <div>
                      <h6>Email</h6>
                      <p> {userInfo.email || ''} </p>
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
};

Dashboard.propTypes = {
  brands: React.PropTypes.any,
  user: React.PropTypes.object,
  userOwnAccount: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userOwnAccount: makeSelectUserAccount(),
  brands: makeSelectSharedAccounts(),
});

export default connect(mapStateToProps)(Dashboard);
