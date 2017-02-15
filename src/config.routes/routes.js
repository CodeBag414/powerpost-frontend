// These are the pages you can go to.
// 

import { getAsyncInjectors } from '../utils/asyncInjectors';
import globalSagas from 'App/state/sagas';
import globalReducer from 'App/state/reducer';
import App from '../App';
import { UserIsAuthenticated } from './UserIsAuthenticated';
import { clearError } from '../App/state/actions';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  
 // injectReducer('global', globalReducer);
  injectSagas(globalSagas);
  
  let routes = [
    {
      path: '/',
      name: 'dashboard',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('App/views/Main'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          console.log(component);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
            const importModules = Promise.all([
              require('App/views/Main/views/Posts/state/reducer'),
              require('App/views/Main/views/Posts/state/sagas'),
              require('App/views/Main/views/Posts'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
            //  injectReducer('posts', reducer.default);
            //  injectSagas(sagas.default);
              console.log(component);
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          }
      },
      childRoutes: [
        {
          path: 'library',
          name: 'library',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              require('App/views/Main/views/MediaItemLibrary'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([component]) => {
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        },
      ],
    }, 
    {
      path: '/start',
      name: 'start',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          require('App/views/Start'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            require('App/views/Start/views/Login/state/reducer'),
            require('App/views/Start/views/Login/state/sagas'),
            require('App/views/Start/views/Login'),
          ]);
  
          const renderRoute = loadModule(cb);
  
          importModules.then(([reducer, sagas, component]) => {
          //  injectReducer('login', reducer.default);
          //  injectSagas(sagas.default);
  
            renderRoute(component);
          });
  
          importModules.catch(errorLoading);
        },
      },
      childRoutes: [
        {
          path: '/signup',
          name: 'signup',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              require('App/views/Start/views/Signup/state/reducer'),
              require('App/views/Start/views/Signup/state/sagas'),
              require('App/views/Start/views/Signup'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
            //  injectReducer('signup', reducer.default);
            //  injectSagas(sagas.default);
    
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        }
      ],      
    }
  ];
  
  return {
    component: App,
    //indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
    childRoutes: routes
  };
}


