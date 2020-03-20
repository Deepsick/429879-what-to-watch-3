import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from 'react-router-dom';

import {SignIn} from './sign-in';
import {mockFunction, Auth} from '../../mocks/test-data';
import {ReducerName} from '../../const';

const mockStore = configureStore([]);

it(`Should render SignIn component with auth correctly`, () => {
  const store = mockStore({
    [ReducerName.USER]: {
      authorizationStatus: Auth.AUTH,
    },
  });
  const node = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn
            login={mockFunction}
            authStatus={Auth.AUTH}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});

it(`Should render SignIn component without auth correctly`, () => {
  const store = mockStore({
    [ReducerName.USER]: {
      authorizationStatus: Auth.NO_AUTH,
    },
  });

  const node = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn
            login={mockFunction}
            authStatus={Auth.NO_AUTH}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
