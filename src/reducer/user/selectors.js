import {ReducerName} from '../../const';

export const getAuthStatus = (state) => {
  return state[ReducerName.USER].authorizationStatus;
};
