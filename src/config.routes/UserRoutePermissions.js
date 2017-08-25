import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import Loading from 'components/Loading';

export const UserCanAccount = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanAccount',
  allowRedirectBack: false,
});

export const UserCanTeam = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('team') > -1,
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanTeam',
  allowRedirectBack: false,
});

export const UserCanPosts = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('posts') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('posts') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanPosts',
  allowRedirectBack: false,
});

export const UserCanSocialFeeds = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('social_feeds') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('social_feeds') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanSocialFeeds',
  allowRedirectBack: false,
});

export const UserCanSharedStreams = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('shared_streams') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('shared_streams') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanSharedStreams',
  allowRedirectBack: false,
});

export const UserCanSettings = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('settings') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('settings') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanSettings',
  allowRedirectBack: false,
});

export const UserCanStatistics = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('statistics') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('statistics') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanStatistics',
  allowRedirectBack: false,
});

export const UserCanBoard = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('board') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('board') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanBoard',
  allowRedirectBack: false,
});

export const UserCanLibrary = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('content_library') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('content_library') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanLibrary',
  allowRedirectBack: false,
});

export const UserCanConnections = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('connections') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('connections') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanConnections',
  allowRedirectBack: false,
});

export const UserCanBrands = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('brands') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('brands') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanBrands',
  allowRedirectBack: false,
});

export const UserCanPostSet = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('post_set') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('post_set') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanPostSet',
  allowRedirectBack: false,
});

export const UserCanCalendar = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('calendar') > -1 && auth.getIn(['activeBrand', 'account_access', 'permissions']).indexOf('calendar') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanCalendar',
  allowRedirectBack: false,
});
export const UserCanPostEdit = UserAuthWrapper({
  authSelector: (state) => state.get('main'),
  redirectAction: routerActions.push,
  authenticatingSelector: (state) => { const main = state.get('main'); return main.get('isFetchingAccount'); },
  LoadingComponent: Loading,
  predicate: (auth) => auth.getIn(['activeBrand', 'user_access', 'permissions']).indexOf('post_edit') > -1 && !auth.get('fetchingError'),
  failureRedirectPath: '/forbidden',
  wrapperDisplayName: 'UserCanPostEdit',
  allowRedirectBack: false,
});
