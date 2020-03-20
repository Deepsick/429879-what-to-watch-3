import {combineReducers} from 'redux';

import {reducer as data} from './data/data';
import {reducer as state} from './state/state';
import {reducer as user} from './user/user';
import {ReducerName} from '../const';

export default combineReducers({
  [ReducerName.DATA]: data,
  [ReducerName.STATE]: state,
  [ReducerName.USER]: user,
});

