"use strict";

import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';
let middleWares = [promise(), thunk];
const middleware = applyMiddleware(...middleWares)


const store = createStore(reducers, middleware)
export default store;