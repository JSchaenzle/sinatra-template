/* ;import '../lib/app/public/styles.css';*/
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { PhotoshootsList } from './containers/photoshootsList.js';
import { PhotoshootCreator } from './containers/photoshootCreator.js';
import shootsApp from './reducers.js';

import {addPhotoshoot} from "./actions/photoshootActions.js";

const loggerMiddleware = createLogger();

let store = createStore(
  shootsApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware));

console.log("initial state:", store.getState());

let unsubscribe = store.subscribe(() => {
  console.log("updated redux state:", store.getState());
});

store.dispatch(addPhotoshoot("Bob", "some date"));
store.dispatch(addPhotoshoot("Joe", "some date"));
store.dispatch(addPhotoshoot("Steve", "steves date"));

//unsubscribe();

console.log("PhotoshootCreator: ", PhotoshootCreator );

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={PhotoshootsList}/>
      <Route path="/new-shoot" component={PhotoshootCreator}/>
    </Router>
  </Provider>
), document.getElementById('root'))


