import * as React from 'react';
import {Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import history from '../../history';
import MoviesList from './movies-list';
import {movies} from '../../mocks/test-data';

it(`Should render MoviesList component correctly`, () => {
  const node = renderer.create(
      <Router history={history} >
        <MoviesList
          movies={movies}
        />
      </Router>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
