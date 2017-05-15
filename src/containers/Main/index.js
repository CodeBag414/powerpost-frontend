/**
 *
 * Dashboard
 *
 * This component is the skeleton around the start pages (login, signup, checkout) and should only contain
 * code that is visible on all app routes
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Nav from 'components/Nav';

import { UserIsAuthenticated } from 'config.routes/UserIsAuthenticated';
import { makeSelectUser,
         makeSelectUserAccount,
         makeSelectSharedAccounts,
         makeSelectSubAccounts,
         makeSelectUserAvatar,
} from 'containers/App/selectors';

import { checkUser,
         logout,
         getPostSets,
} from 'containers/App/actions';

import { toggleMenu,
         fetchCurrentAccount,
} from './actions';

import { makeSelectMenuCollapsed,
         makeSelectCurrentAccount,
         makeSelectAccountPermissions,
         makeSelectUserPermissions,
} from './selectors';
import styles from './styles.scss';

class Main extends React.Component {

  static propTypes = {
    params: PropTypes.shape(),
    user: PropTypes.shape(),
    activeBrand: PropTypes.shape(),
    userPermissions: PropTypes.array,
    accountPermissions: PropTypes.array,
    location: PropTypes.shape(),
    menuCollapsed: PropTypes.bool,
    userAccount: PropTypes.shape(),
    sharedAccounts: PropTypes.shape(),
    subAccounts: PropTypes.shape(),
    children: PropTypes.node,
    fetchAccount: PropTypes.func,
    getPostSetsAction: PropTypes.func,
    toggleMenuCollapse: PropTypes.func,
    logout: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchAccount(this.props.params.account_id);
    this.props.getPostSetsAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.account_id !== this.props.params.account_id) {
      this.props.fetchAccount(nextProps.params.account_id);
    }
  }

  handleMenuToggle() {
    this.props.toggleMenuCollapse(!this.props.menuCollapsed);
  }

  render() {
    const viewContentStyle = this.props.menuCollapsed ? styles.viewContentCollapsed : styles.viewContentFull;
    return (
      <div>
        <Nav
          userPermissions={this.props.userPermissions}
          accountPermissions={this.props.accountPermissions}
          location={this.props.location}
          logout={this.props.logout}
          user={this.props.user}
          handleMenuToggle={this.handleMenuToggle}
          isMenuCollapsed={this.props.menuCollapsed}
          activeBrand={this.props.activeBrand}
          accountId={this.props.params.account_id}
          userAccount={this.props.userAccount}
          sharedAccounts={this.props.sharedAccounts}
          subAccounts={this.props.subAccounts}
        />
        <div id="main-panel" className={[viewContentStyle, styles.viewContent].join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
};

export function mapDispatchToProps(dispatch) {
  return {
    getPostSetsAction: () => dispatch(getPostSets()),
    checkUserObject: (user) => dispatch(checkUser(user)),
    toggleMenuCollapse: (isCollapsed) => dispatch(toggleMenu(isCollapsed)),
    logout: () => dispatch(logout()),
    fetchAccount: (accountId) => dispatch(fetchCurrentAccount(accountId)),
  };
}

const mapStateToProps = () => {
  const selectUser = makeSelectUser();
  const selectMenuCollapsed = makeSelectMenuCollapsed();
  const selectSharedAccounts = makeSelectSharedAccounts();
  const selectActiveBrand = makeSelectCurrentAccount();
  const selectSubAccounts = makeSelectSubAccounts();
  const selectUserAccount = makeSelectUserAccount();
  const selectUserAvatar = makeSelectUserAvatar();
  const selectAccountPermissions = makeSelectAccountPermissions();
  const selectUserPermissions = makeSelectUserPermissions();
  return (state, ownProps) => ({
    user: selectUser(state),
    menuCollapsed: selectMenuCollapsed(state),
    sharedAccounts: selectSharedAccounts(state),
    activeBrand: selectActiveBrand(state),
    subAccounts: selectSubAccounts(state),
    userAccount: selectUserAccount(state),
    userAvatar: selectUserAvatar(state),
    accountPermissions: selectAccountPermissions(state),
    userPermissions: selectUserPermissions(state),
    location: ownProps.location,
  });
};

export default UserIsAuthenticated(connect(mapStateToProps, mapDispatchToProps)(Main));
