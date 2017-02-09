/**
 * app.js
 * 
 * this is the entry file for the application, only setup and boilerplate code
 * 
 */
// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Needed for material-ui libarry
injectTapEventPlugin();

// import sanitize css
import 'sanitize.css/sanitize.css';

import configureStore from './config.redux/store';

// import selector for 'syncHistoryWithStore'
import { makeSelectLocationState } from './config.redux/selectors';
// root app
import App from './App';

import { createRoutes} from 'config.routes/routes';

// create redux store with history
const initialState = {};
const store = configureStore(initialState, browserHistory);
// sync history and store, as the react-router-redux reducer
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: makeSelectLocationState(),
});

const rootRoute = createRoutes(store);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router
                history={history}
                routes={rootRoute}
                render={
                    // Scroll to top when going to new page, imitating default browser behavior
                    applyRouterMiddleware(useScroll())
                }
            />
        </MuiThemeProvider>
    </Provider>, document.getElementById('app')
);
