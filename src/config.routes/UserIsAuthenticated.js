import React from 'react';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { browserHistory } from 'react-router';

export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => { console.log(state.get('auth')); return state.get('auth') },
    redirectAction: routerActions.push,
    predicate: auth => { console.log('auth: ' + auth); return auth.get('loggedIn') },
    failureRedirectPath: '/start',
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: false
  });

