import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {movies} from '../../mocks/test-data';
import MoreLikeThis from './more-like-this';
import history from '../../history';

it(`Should render MoreLikeThis component correctly`, () => {
  const node = renderer.create(
      <Router history={history}>
        <MoreLikeThis
          movies={movies.slice(4)}
        />
      </Router>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
