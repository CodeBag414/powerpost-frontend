/**
 * app.js
 * 
 * this is the entry file for the application, only setup and boilerplate code
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';

// import sanitize css
import 'sanitize.css/sanitize.css';

import configureStore from './config.redux/store';

// import selector for 'syncHistoryWithStore'
import { makeSelectLocationState } from './config.redux/selectors';
// root app
import App from './App';
import Start from './Start';

import { createAppRoutes, createStartRoutes } from 'config.routes/routes';

// create redux store with history
const initialState = {};
const store = configureStore(initialState, browserHistory);
console.log(store);
// sync history and store, as the react-router-redux reducer
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: makeSelectLocationState(),
});

const rootRoute = [
    {
        path: '/',
        component: App,
        indexRoute: { onEnter: (nextState, replace) => replace('/posts') },
        childRoutes: createAppRoutes(store),
    },
    {
        path: '/start',
        component: Start,
        indexRoute: { onEnter: (nextState, replace) => replace('/login') },
        childRoutes: createStartRoutes(store),
    }
];

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={history}
            routes={rootRoute}
            render={
                // Scroll to top when going to new page, imitating default browser behavior
                applyRouterMiddleware(useScroll())
            }
        />
    </Provider>, document.getElementById('app')
);
