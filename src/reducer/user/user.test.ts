import {reducer, ActionCreator, ActionType, initialState} from './user';
import {Auth, user} from '../../mocks/test-data';

describe(`Actions work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should set auth status by given value`, () => {
    expect(reducer({
      authorizationStatus: null,
      authInfo: {},
    }, {
      type: ActionType.SET_AUTH_STATUS,
      payload: Auth.AUTH,
    })).toEqual({
      authorizationStatus: Auth.AUTH,
      authInfo: {},
    });

    expect(reducer({
      authorizationStatus: null,
      authInfo: {},
    }, {
      type: ActionType.SET_AUTH_STATUS,
      payload: Auth.NO_AUTH,
    })).toEqual({
      authorizationStatus: Auth.NO_AUTH,
      authInfo: {},
    });
  });

  it(`Reducer should set auth info`, () => {
    expect(reducer({
      authorizationStatus: null,
      authInfo: {},
    }, {
      type: ActionType.SET_AUTH_INFO,
      payload: user,
    })).toEqual({
      authorizationStatus: null,
      authInfo: user,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting auth status returns correct action`, () => {
    expect(ActionCreator.setAuthStatus(Auth.AUTH)).toEqual({
      type: ActionType.SET_AUTH_STATUS,
      payload: Auth.AUTH,
    });
  });

  it(`Action creator for setting auth info returns correct action`, () => {
    expect(ActionCreator.setAuthInfo(user)).toEqual({
      type: ActionType.SET_AUTH_INFO,
      payload: user,
    });
  });
});
