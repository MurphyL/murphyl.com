import { createStore } from 'redux';
import { combineReducers } from 'redux';

import blogAction from './blog_action';

export default createStore(combineReducers({
	blogAction,
}));