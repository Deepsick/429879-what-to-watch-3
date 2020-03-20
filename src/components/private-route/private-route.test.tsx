import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Router} from 'react-router-dom';
import configureStore from "redux-mock-store";

import {PrivateRoute} from './private-route';
import history from '../../history';
import {mockString, mockBool, Auth} from '../../mocks/test-data';
import {ReducerName} from '../../const';

const component = () => <div></div>;
const mockStore = configureStore([]);

it(`Should render PrivateRoute component with auth correctly`, () => {
  const store = mockStore({
    [ReducerName.USER]: {
      authorizationStatus: Auth.AUTH,
    },
  });

  const node = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRoute
            Component={component}
            path={mockString}
            exact={mockBool}
            authStatus={Auth.AUTH}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});

it(`Should render PrivateRoute component without auth correctly`, () => {
  const store = mockStore({
    [ReducerName.USER]: {
      authorizationStatus: Auth.NO_AUTH,
    },
  });

  const node = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRoute
            Component={component}
            path={mockString}
            exact={mockBool}
            authStatus={Auth.NO_AUTH}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
