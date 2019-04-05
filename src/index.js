import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import * as reducers from './ducks/movies';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';

const rootReducer = combineReducers({movies: reducers.default});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(reducers.watchRequest);

ReactDOM.render(<Provider store={store}><App store={store}/></Provider>, document.getElementById('root'));
