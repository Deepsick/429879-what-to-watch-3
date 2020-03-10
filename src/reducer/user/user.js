import {extend} from '../../utils.js';
import {Auth, Path} from '../../const';

const initialState = {
  authorizationStatus: Auth.NO_AUTH,
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
};

const ActionCreator = {
  setAuthStatus: (status) => {
    return {
      type: ActionType.SET_AUTH_STATUS,
      payload: status,
    };
  },
};


const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/${Path.LOGIN}`)
      .then(() => {
        dispatch(ActionCreator.checkAuth(Auth.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    const {email, password} = authData;
    return api.post(`/${Path.LOGIN}`, {
      email,
      password,
    })
    .then(() => {
      dispatch(ActionCreator.checkAuth(Auth.AUTH));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
