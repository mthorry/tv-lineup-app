import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import showReducer from './reducers/showReducer'
import episodeReducer from './reducers/episodeReducer'
import searchReducer from './reducers/searchReducer'
import extrasReducer from './reducers/extrasReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';

const rootReducer = combineReducers({ search: searchReducer, show: showReducer, extras: extrasReducer, episode: episodeReducer })
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
