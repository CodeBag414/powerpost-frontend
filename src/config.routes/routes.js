// These are the pages you can go to.
// 

import { getAsyncInjectors } from '../utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export function createAppRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/posts',
      name: 'posts',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('App/views/Posts/state/reducer'),
          require('App/views/Posts/state/sagas'),
          require('App/views/Posts'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
         // injectReducer('home', reducer.default);
         // injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/library',
      name: 'library',
      getComponent(nextState, cb) {
        require('App/views/MediaItemLibrary')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}

export function createStartRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('Start/views/Login/state/reducer'),
          require('Start/views/Login/state/sagas'),
          require('Start/views/Login'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          //injectReducer('login', reducer.default);
          //injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'signup',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('Start/views/Signup/state/reducer'),
          require('Start/views/Signup/state/sagas'),
          require('Start/views/Signup'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
         // injectReducer('oauth', reducer.default);
         // injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
  ];
}

