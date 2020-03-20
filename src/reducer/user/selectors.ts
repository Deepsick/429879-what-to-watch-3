import {ReducerName} from '../../const';

export const getAuthStatus = (state) => {
  return state[ReducerName.USER].authorizationStatus;
};

export const getAvatar = (state) => {
  return state[ReducerName.USER].authInfo[`avatar_url`];
};
