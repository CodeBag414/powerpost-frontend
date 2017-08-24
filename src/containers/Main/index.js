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
import { browserHistory } from 'react-router';
import { toastr } from 'lib/react-redux-toastr';
import Nav from 'components/Nav';
import PostEditor from 'containers/PostEditor';
import ProcessingIndicator from 'components/ProcessingIndicator';
import { getClassesByPage } from 'utils/permissionClass';
import cookie from 'react-cookie';

import { UserIsAuthenticated } from 'config.routes/UserIsAuthenticated';
import { makeSelectUser,
         makeSelectUserAccount,
         makeSelectSharedAccounts,
         makeSelectUserAvatar,
         makeSelectPostSet,
         makeSelectPostSetEdit,
} from 'containers/App/selectors';

import { checkUser,
         logout,
         createPostSetRequest,
} from 'containers/App/actions';

import { toggleMenu,
         fetchCurrentAccount,
         fetchConnections,
} from './actions';

import {
  makeSelectAccountBrands,
  makeSelectMenuCollapsed,
  makeSelectCurrentAccount,
  makeSelectAccountPermissions,
  makeSelectUserPermissions,
  makeSelectIsProcessing,
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
    createPostSet: PropTypes.func,
    postSet: PropTypes.object,
    toggleMenuCollapse: PropTypes.func,
    logout: PropTypes.func,
    fetchConnections: PropTypes.func,
    isProcessing: PropTypes.bool,
    routes: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  componentDidMount() {
    let isCollapsed = cookie.load('is_menu_open');
    if (isCollapsed === 'false') {
      isCollapsed = false;
    } else if (isCollapsed === 'true') {
      isCollapsed = true;
    } else {
      isCollapsed = false;
    }

    this.props.toggleMenuCollapse(isCollapsed);
    this.props.fetchAccount(this.props.params.account_id);
    if (this.props.params.account_id) {
      this.props.fetchConnections(this.props.params.account_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.account_id && nextProps.params.account_id !== this.props.params.account_id) {
      this.props.fetchAccount(nextProps.params.account_id);
      this.props.fetchConnections(nextProps.params.account_id);
    }
    const { postSet } = nextProps;
    if (postSet && postSet.createSuccess && (!this.props.postSet || this.props.postSet.post_set_id !== postSet.post_set_id)) {
      if (nextProps.postSetEdit) {
        browserHistory.push(`${this.props.location.pathname}#postset-${postSet.post_set_id}`);
      } else {
        toastr.success('Success', 'The Post is created successfully!');
      }
    }

    if (this.props.location.pathname === '/user/settings') {
      this.props.toggleMenuCollapse(true);
    }
  }

  handleMenuToggle() {
    this.props.toggleMenuCollapse(!this.props.menuCollapsed);
  }

  createPostSet = () => {
    const { createPostSet, activeBrand } = this.props;
    const postSet = {
      account_id: activeBrand.account_id,
      message: '',
      type: 'text',
      status: '6',
      title: '',
    };
    createPostSet(postSet);
  }

  render() {
    const {
      location,
      params,
      accountPermissions,
      activeBrand,
      menuCollapsed,
      logout: logoutOnNav,
      sharedAccounts,
      subAccounts,
      user,
      userAccount,
      userPermissions,
      routes,
      location: { hash },
    } = this.props;
    let viewContentStyle = this.props.menuCollapsed ? styles.viewContentCollapsed : styles.viewContentFull;
    if (location.pathname === '/') {
      viewContentStyle = styles.viewContentDashboard;
    }
    if (!this.props.activeBrand.account_id) return null;
    const permissionClasses = getClassesByPage(activeBrand.user_access.permissions, 'mainNav');

    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : 0;

    return (
      <div className={postsetId ? styles.modalOpen : ''}>
        <ProcessingIndicator isProcessing={this.props.isProcessing} />
        <Nav
          accountId={params.account_id}
          accountPermissions={accountPermissions}
          activeBrand={activeBrand}
          createPostSet={this.createPostSet}
          handleMenuToggle={this.handleMenuToggle}
          isMenuCollapsed={menuCollapsed}
          location={location}
          logout={logoutOnNav}
          sharedAccounts={sharedAccounts}
          subAccounts={subAccounts}
          user={user}
          userAccount={userAccount}
          userPermissions={userPermissions}
          permissionClasses={permissionClasses}
          routes={routes}
        />
        <div id="main-panel" className={[viewContentStyle, styles.viewContent].join(' ')}>
          {this.props.children}
        </div>
        <div className={styles.postEditor}>
          { postsetId ?
            <PostEditor
              id={postsetId}
              accountId={params.account_id}
            />
           :
           null}
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
    checkUserObject: (user) => dispatch(checkUser(user)),
    toggleMenuCollapse: (isCollapsed) => dispatch(toggleMenu(isCollapsed)),
    logout: () => dispatch(logout()),
    fetchAccount: (accountId) => dispatch(fetchCurrentAccount(accountId)),
    createPostSet: (postSet) => dispatch(createPostSetRequest(postSet)),
    fetchConnections: (accountId) => dispatch(fetchConnections(accountId)),
  };
}

const mapStateToProps = () => {
  const selectUser = makeSelectUser();
  const selectMenuCollapsed = makeSelectMenuCollapsed();
  const selectSharedAccounts = makeSelectSharedAccounts();
  const selectActiveBrand = makeSelectCurrentAccount();
  const selectSubAccounts = makeSelectAccountBrands();
  const selectUserAccount = makeSelectUserAccount();
  const selectUserAvatar = makeSelectUserAvatar();
  const selectAccountPermissions = makeSelectAccountPermissions();
  const selectUserPermissions = makeSelectUserPermissions();
  const selectPostSet = makeSelectPostSet();
  const selectPostSetEdit = makeSelectPostSetEdit();
  const selectIsProcessing = makeSelectIsProcessing();
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
    isProcessing: selectIsProcessing(state),
    postSet: selectPostSet(state),
    postSetEdit: selectPostSetEdit(state),
    location: ownProps.location,
  });
};

export default UserIsAuthenticated(connect(mapStateToProps, mapDispatchToProps)(Main));
