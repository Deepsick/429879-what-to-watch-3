import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import Avatar from './avatar';
import {Auth, mockString} from '../../mocks/test-data';
import history from '../../history';

it(`Should render Avatar component for authenticated user correctly`, () => {
  const node = renderer.create(
      <Router history={history}>
        <Avatar
          isAuth={Auth.AUTH}
          avatar={mockString}
        />
      </Router>
  ).toJSON();

  expect(node).toMatchSnapshot();
});

it(`Should render Avatar component for non-authenticated user correctly`, () => {
  const node = renderer.create(
      <Router history={history}>
        <Avatar
          isAuth={Auth.NO_AUTH}
          avatar={mockString}
        />
      </Router>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
