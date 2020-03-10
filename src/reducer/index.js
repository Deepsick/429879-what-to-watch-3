import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as state} from './state/state.js';
import {ReducerName} from '../const';

export default combineReducers({
  [ReducerName.DATA]: data,
  [ReducerName.STATE]: state,
});
