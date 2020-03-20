import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import Logo from './logo';
import history from '../../history';

it(`Should render Logo component correctly`, () => {
  const node = renderer.create(
      <Router history={history}>
        <Logo />
      </Router>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
