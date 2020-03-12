import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as state} from './state/state.js';
import {reducer as user} from './user/user.js';
import {ReducerName} from '../const.js';

export default combineReducers({
  [ReducerName.DATA]: data,
  [ReducerName.STATE]: state,
  [ReducerName.USER]: user,
});

