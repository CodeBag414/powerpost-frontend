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
import { applyRouterMiddleware, Router, Route,IndexRoute, browserHistory, createBrowserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, combineReducers } from 'redux';

//Needed for material-ui libarry
injectTapEventPlugin();

// import sanitize css
//import 'sanitize.css/sanitize.css';

import configureStore from './config.redux/store';

// import selector for 'syncHistoryWithStore'
import { makeSelectLocationState } from './config.redux/selectors';
// root app
import App from './App';
import Start from './App/views/Start';
import Login from './App/views/Start/views/Login';
import Signup from './App/views/Start/views/Signup';

import { createRoutes} from './config.routes/routes';

export const historyObj = browserHistory;

// create redux store with history
const initialState = {};
const store = configureStore(initialState, historyObj);
// sync history and store, as the react-router-redux reducer
const history = syncHistoryWithStore(historyObj, store, {
    selectLocationState: makeSelectLocationState(),
});


const rootRoute = createRoutes(store);

ReactDOM.render(
        <MuiThemeProvider>
            <Provider store={store}>
                <Router
                        history={history}
                        routes={rootRoute}
                        //render={
                            // Scroll to top when going to new page, imitating default browser behavior
                            //applyRouterMiddleware(useScroll())
                       // }
                    />
            </Provider>
    </MuiThemeProvider>, document.getElementById('app')
);
