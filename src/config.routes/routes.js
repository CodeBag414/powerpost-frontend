// These are the pages you can go to.
// 

import { getAsyncInjectors } from '../utils/asyncInjectors';
import globalSagas from '../App/state/sagas';
import globalReducer from '../App/state/reducer';
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
          System.import('../App/views/Main/state/reducer'),
          System.import('../App/views/Main'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('dashboard', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('../App/views/Main/views/Posts/state/reducer'),
              System.import('../App/views/Main/views/Posts/state/sagas'),
              System.import('../App/views/Main/views/Posts'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
            //  injectReducer('posts', reducer.default);
            //  injectSagas(sagas.default);
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
              System.import('../App/views/Main/views/MediaItemLibrary'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([component]) => {
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        },
        {
          path: 'calendar',
          name: 'calendar',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('../App/views/Main/views/Calendar'),
            ]);
            
            const renderRoute = loadModule(cb);
            
            importModules.then(([component]) => {
              renderRoute(component);
            });
          
            importModules.catch(errorLoading);
          },
        }
      ],
    }, 
    {
      path: '/start',
      name: 'start',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('../App/views/Start'),
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
             System.import('../App/views/Start/views/Login/state/reducer'),
            System.import('../App/views/Start/views/Login/state/sagas'),
            System.import('../App/views/Start/views/Login'),
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
              System.import('../App/views/Start/views/Signup/state/reducer'),
             System.import('../App/views/Start/views/Signup/state/sagas'),
              System.import('../App/views/Start/views/Signup'),
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


