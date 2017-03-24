import React from 'react';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { browserHistory } from 'react-router';

export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.get('auth'),
    redirectAction: routerActions.push,
    predicate: auth => auth.get('loggedIn'),
    failureRedirectPath: '/start',
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: false
  });

