/**
 * Create the store with async reducers
 */
 
 import { createStore, applyMiddleware, compose } from 'redux';
 import { fromJS } from 'immutable';
 import { routerMiddleware } from 'react-router-redux';
 import createReducer from './reducers';
 import createSagaMiddleware from 'redux-saga';
 
 const sagaMiddleware = createSagaMiddleware();
 
 export default function configureStore(initialState = {}, history) {
    // Create store with middleware
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history) 
    ];
     
    const enhancers = [
        applyMiddleware(...middlewares)
    ];
    
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */
  
    const store = createStore(
        createReducer(),
        fromJS(initialState),
        composeEnhancers(...enhancers)
    );
    
    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // async reducer registry
    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            require('./reducers').then((reducerModule) => {
                const createReducers = reducerModule.default;
                const nextReducers = createReducers(store.asyncReducers);
                
                store.replaceReducer(nextReducers);
            });
        });
    }

    return store;
}