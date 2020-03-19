import {extend} from '../../utils.js';
import {Auth, Path} from '../../const';

const initialState = {
  authorizationStatus: null,
  authInfo: {},
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_AUTH_INFO: `SET_AUTH_INFO`,
};

const ActionCreator = {
  setAuthStatus: (status) => {
    return {
      type: ActionType.SET_AUTH_STATUS,
      payload: status,
    };
  },
  setAuthInfo: (user) => {
    return {
      type: ActionType.SET_AUTH_INFO,
      payload: user,
    };
  },
};


const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/${Path.LOGIN}`)
      .then((response) => {
        dispatch(ActionCreator.setAuthStatus(Auth.AUTH));
        dispatch(ActionCreator.setAuthInfo(response.data));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    const {email, password} = authData;
    return api.post(`/${Path.LOGIN}`, {
      email,
      password,
    })
    .then((response) => {
      dispatch(ActionCreator.setAuthStatus(Auth.AUTH));
      dispatch(ActionCreator.setAuthInfo(response.data));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_AUTH_INFO:
      return extend(state, {
        authInfo: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
