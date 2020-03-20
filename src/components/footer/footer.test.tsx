import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import Footer from './footer';
import history from '../../history';

it(`Should render Footer component correctly`, () => {
  const node = renderer.create(
      <Router history={history}>
        <Footer />
      </Router>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
